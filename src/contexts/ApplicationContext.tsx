import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Types for applications
export interface JobApplication {
  id: string;
  job_id: string;
  job_title: string;
  company_name: string;
  company_logo?: string;
  applied_at: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'accepted';
}

export interface CampusDriveApplication {
  id: string;
  drive_id: string;
  drive_title: string;
  company_name: string;
  company_logo?: string;
  applied_at: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'accepted';
}

interface ApplicationContextType {
  jobApplications: JobApplication[];
  campusDriveApplications: CampusDriveApplication[];
  addJobApplication: (application: Omit<JobApplication, 'id' | 'applied_at' | 'status'>) => void;
  addCampusDriveApplication: (application: Omit<CampusDriveApplication, 'id' | 'applied_at' | 'status'>) => void;
  isLoading: boolean;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [campusDriveApplications, setCampusDriveApplications] = useState<CampusDriveApplication[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load applications when user changes
  useEffect(() => {
    const fetchApplications = async () => {
      if (!currentUser) {
        setJobApplications([]);
        setCampusDriveApplications([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // In a real app, fetch from Supabase
        // For now, we'll retrieve from localStorage
        const storedJobApps = localStorage.getItem(`job_applications_${currentUser.id}`);
        const storedCampusApps = localStorage.getItem(`campus_applications_${currentUser.id}`);

        if (storedJobApps) {
          setJobApplications(JSON.parse(storedJobApps));
        }

        if (storedCampusApps) {
          setCampusDriveApplications(JSON.parse(storedCampusApps));
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [currentUser]);

  // Save applications to localStorage when they change
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`job_applications_${currentUser.id}`, JSON.stringify(jobApplications));
    }
  }, [jobApplications, currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`campus_applications_${currentUser.id}`, JSON.stringify(campusDriveApplications));
    }
  }, [campusDriveApplications, currentUser]);

  // Add a new job application
  const addJobApplication = (application: Omit<JobApplication, 'id' | 'applied_at' | 'status'>) => {
    if (!currentUser) return;

    const newApplication: JobApplication = {
      ...application,
      id: `job-app-${Date.now()}`,
      applied_at: new Date().toISOString(),
      status: 'pending'
    };

    setJobApplications(prev => [newApplication, ...prev]);
  };

  // Add a new campus drive application
  const addCampusDriveApplication = (application: Omit<CampusDriveApplication, 'id' | 'applied_at' | 'status'>) => {
    if (!currentUser) return;

    const newApplication: CampusDriveApplication = {
      ...application,
      id: `campus-app-${Date.now()}`,
      applied_at: new Date().toISOString(),
      status: 'pending'
    };

    setCampusDriveApplications(prev => [newApplication, ...prev]);
  };

  return (
    <ApplicationContext.Provider
      value={{
        jobApplications,
        campusDriveApplications,
        addJobApplication,
        addCampusDriveApplication,
        isLoading
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
};
