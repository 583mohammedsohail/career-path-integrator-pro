
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Calendar, Users, Building, Globe } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';
import JobApplicationModal from '@/components/jobs/JobApplicationModal';
import { toast } from 'sonner';

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  // Fetch job details
  const { data: job, isLoading, error } = useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          company:company_id (
            id,
            company_name,
            website,
            location,
            industry,
            description,
            profiles (avatar_url)
          )
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  // Check if user has already applied
  const { data: existingApplication, isLoading: checkingApplication } = useQuery({
    queryKey: ['application', id, currentUser?.id],
    queryFn: async () => {
      if (!currentUser) return null;
      
      const { data } = await supabase
        .from('job_applications')
        .select('*')
        .eq('job_id', id)
        .eq('student_id', currentUser.id)
        .maybeSingle();
      
      return data;
    },
    enabled: !!currentUser && !!id,
  });

  if (error) {
    toast.error("Error loading job details");
    navigate('/jobs');
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : job ? (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{job.title}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span className="text-lg text-gray-700">{job.company.company_name}</span>
                </div>
                <div className="flex flex-wrap gap-3 mt-3">
                  <Badge variant={job.status === 'open' ? 'default' : 'outline'} className={
                    job.status === 'open' 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200 border-green-200'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200'
                  }>
                    {job.status === 'open' ? 'Open' : 'Closed'}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{job.positions} positions</span>
                  </div>
                </div>
              </div>
              <div>
                {currentUser ? (
                  existingApplication ? (
                    <Button disabled className="w-full md:w-auto">
                      Already Applied
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => setShowApplicationModal(true)}
                      className="w-full md:w-auto"
                      disabled={job.status !== 'open' || checkingApplication}
                    >
                      Apply Now
                    </Button>
                  )
                ) : (
                  <Button 
                    onClick={() => navigate('/login')}
                    className="w-full md:w-auto"
                  >
                    Login to Apply
                  </Button>
                )}
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">About the Company</h2>
                    <p className="text-gray-700">{job.company.description}</p>
                    {job.company.website && (
                      <div className="flex items-center gap-2 mt-2">
                        <Globe className="h-4 w-4 text-gray-500" />
                        <a 
                          href={job.company.website.startsWith('http') ? job.company.website : `https://${job.company.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {job.company.website}
                        </a>
                      </div>
                    )}
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2">Job Description</h2>
                    <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
                  </div>

                  {job.requirements && job.requirements.length > 0 && (
                    <div>
                      <h2 className="text-xl font-semibold mb-2">Requirements</h2>
                      <ul className="list-disc pl-5 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="text-gray-700">{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h2 className="text-xl font-semibold mb-2">Compensation</h2>
                    <p className="text-gray-700 font-medium">{job.salary || 'Not specified'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Job not found.</p>
            <Button className="mt-4" onClick={() => navigate('/jobs')}>
              Back to Jobs
            </Button>
          </div>
        )}

        {job && (
          <JobApplicationModal 
            isOpen={showApplicationModal} 
            onClose={() => setShowApplicationModal(false)}
            jobId={job.id}
            jobTitle={job.title}
            companyName={job.company.company_name}
            onSuccess={() => {
              toast.success("Application submitted successfully!");
              navigate('/jobs');
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default JobDetails;
