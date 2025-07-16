import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface SimpleApplication {
  id: string;
  student_id: string;
  job_id?: string;
  campus_drive_id?: string;
  status: string;
  applied_at: string;
  resume_url?: string;
  cover_letter?: string;
}

interface RealtimeApplicationContextType {
  jobApplications: SimpleApplication[];
  campusDriveApplications: SimpleApplication[];
  addJobApplication: (jobId: string, resumeUrl?: string, coverLetter?: string) => Promise<void>;
  addCampusDriveApplication: (campusDriveId: string, resumeUrl?: string, coverLetter?: string) => Promise<void>;
  isLoading: boolean;
  refreshApplications: () => Promise<void>;
}

const RealtimeApplicationContext = createContext<RealtimeApplicationContextType | undefined>(undefined);

export const RealtimeApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [jobApplications, setJobApplications] = useState<SimpleApplication[]>([]);
  const [campusDriveApplications, setCampusDriveApplications] = useState<SimpleApplication[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch applications for current user
  const fetchApplications = async () => {
    if (!currentUser) return;

    setIsLoading(true);
    try {
      // Fetch job applications
      const { data: jobApps, error: jobError } = await supabase
        .from('job_applications')
        .select('*')
        .eq('student_id', currentUser.id);

      if (jobError) throw jobError;

      // Try to fetch campus drive applications
      try {
        const { data: campusApps, error: campusError } = await supabase
          .from('campus_drive_applications')
          .select('*')
          .eq('student_id', currentUser.id);

        if (!campusError && campusApps) {
          setCampusDriveApplications(campusApps as SimpleApplication[]);
        }
      } catch (err) {
        console.log('Campus drive applications table not available yet');
        setCampusDriveApplications([]);
      }

      setJobApplications((jobApps || []) as SimpleApplication[]);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setIsLoading(false);
    }
  };

  // Add job application
  const addJobApplication = async (jobId: string, resumeUrl?: string, coverLetter?: string) => {
    if (!currentUser) {
      toast.error('Please login to apply');
      return;
    }

    try {
      const { error } = await supabase
        .from('job_applications')
        .insert([{
          job_id: jobId,
          student_id: currentUser.id,
          status: 'pending',
          resume_url: resumeUrl,
          cover_letter: coverLetter
        }]);

      if (error) throw error;

      toast.success('Job application submitted successfully!');
      await fetchApplications(); // Refresh the list
    } catch (error) {
      console.error('Error submitting job application:', error);
      toast.error('Failed to submit application');
    }
  };

  // Add campus drive application
  const addCampusDriveApplication = async (campusDriveId: string, resumeUrl?: string, coverLetter?: string) => {
    if (!currentUser) {
      toast.error('Please login to apply');
      return;
    }

    try {
      // Use direct SQL if the table doesn't exist in types
      const { error } = await supabase.rpc('apply_campus_drive', {
        p_campus_drive_id: campusDriveId,
        p_student_id: currentUser.id,
        p_resume_url: resumeUrl,
        p_cover_letter: coverLetter
      });

      if (error) {
        // Fallback to direct insert if RPC doesn't exist
        const { error: insertError } = await supabase
          .from('campus_drive_applications')
          .insert([{
            campus_drive_id: campusDriveId,
            student_id: currentUser.id,
            status: 'pending',
            resume_url: resumeUrl,
            cover_letter: coverLetter
          }]);
        
        if (insertError) throw insertError;
      }

      toast.success('Campus drive application submitted successfully!');
      await fetchApplications(); // Refresh the list
    } catch (error) {
      console.error('Error submitting campus drive application:', error);
      toast.error('Failed to submit application');
    }
  };

  // Set up real-time subscriptions
  useEffect(() => {
    if (!currentUser) return;

    fetchApplications();

    // Subscribe to job application changes
    const jobAppsChannel = supabase
      .channel('job_applications_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'job_applications',
          filter: `student_id=eq.${currentUser.id}`
        },
        () => {
          fetchApplications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(jobAppsChannel);
    };
  }, [currentUser]);

  const value = {
    jobApplications,
    campusDriveApplications,
    addJobApplication,
    addCampusDriveApplication,
    isLoading,
    refreshApplications: fetchApplications
  };

  return (
    <RealtimeApplicationContext.Provider value={value}>
      {children}
    </RealtimeApplicationContext.Provider>
  );
};

export const useRealtimeApplications = () => {
  const context = useContext(RealtimeApplicationContext);
  if (context === undefined) {
    throw new Error('useRealtimeApplications must be used within a RealtimeApplicationProvider');
  }
  return context;
};