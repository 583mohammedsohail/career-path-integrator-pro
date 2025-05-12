
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApplicationTracker from '@/components/student/ApplicationTracker';
import CareerGoals from '@/components/career/CareerGoals';
import CareerAssistant from '@/components/career/CareerAssistant';
import { mockJobs } from '@/data/mockData';
import JobCard from '@/components/jobs/JobCard';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const StudentDashboard = () => {
  const { currentUser, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('applications');
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);

  // Fetch application data when the dashboard loads
  useEffect(() => {
    const fetchApplications = async () => {
      if (!currentUser) return;
      
      try {
        const { data, error } = await supabase
          .from('job_applications')
          .select(`
            *,
            job:job_id (
              id,
              title,
              company_id,
              deadline,
              status,
              company:company_id (
                id,
                company_name
              )
            )
          `)
          .eq('student_id', currentUser.id)
          .order('applied_at', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        setApplications(data || []);
      } catch (error) {
        console.error('Error loading applications:', error);
        toast.error('Failed to load your applications');
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplications();
  }, [currentUser]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-md w-3/4 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded-md mb-6"></div>
            <div className="h-64 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!currentUser || currentUser.role !== 'student') {
    return <Navigate to="/login" replace />;
  }

  // Mock career goals
  const careerGoals = [
    {
      id: '1',
      name: 'Learn React Native',
      description: 'Complete a comprehensive course on React Native development',
      progress: 65,
      status: 'in-progress' as const
    },
    {
      id: '2',
      name: 'Contribute to Open Source',
      description: 'Make at least 5 pull requests to open source projects',
      progress: 20,
      status: 'in-progress' as const
    },
    {
      id: '3',
      name: 'Get AWS Certification',
      description: 'Study and pass the AWS Solutions Architect Associate exam',
      progress: 0,
      status: 'not-started' as const
    }
  ];

  // Filter recommended jobs based on student's skills
  const recommendedJobs = mockJobs.filter(job => job.status === 'open').slice(0, 3);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your career progress and applications</p>
          </div>
        </div>

        <Tabs defaultValue={activeTab} className="space-y-4" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="recommended">Recommended Jobs</TabsTrigger>
            <TabsTrigger value="goals">Career Goals</TabsTrigger>
            <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
          </TabsList>
          
          <TabsContent value="applications" className="space-y-4">
            <ApplicationTracker applications={applications} loading={loading} />
          </TabsContent>
          
          <TabsContent value="recommended" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
              {recommendedJobs.length === 0 && (
                <div className="col-span-3 text-center py-12">
                  <p className="text-lg text-gray-600">
                    No recommended jobs available at the moment.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="goals" className="space-y-4">
            <CareerGoals goals={careerGoals} />
          </TabsContent>
          
          <TabsContent value="assistant" className="space-y-4">
            <CareerAssistant />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
