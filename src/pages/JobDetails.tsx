
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Users, Building } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import JobApplicationModal from '@/components/jobs/JobApplicationModal';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Define types for job and application data
interface Profile {
  name: string | null;
  email: string | null;
  avatar_url?: string | null;
}

interface Student {
  id: string;
  profiles: Profile;
}

interface Application {
  id: string;
  applied_at: string | null;
  status: string | null;
  resume_url?: string | null;
  student: Student;
}

interface Company {
  id: string;
  company_name: string;
  description?: string | null;
  website?: string | null;
  location?: string | null;
  industry?: string | null;
}

interface Job {
  id: string;
  title: string;
  description: string;
  company_id: string;
  location?: string | null;
  salary?: string | null;
  status?: string | null;
  deadline: string;
  positions?: number | null;
  requirements?: string[] | null;
  created_at?: string | null;
  eligibility?: string | null;
  min_qualification?: string | null;
  min_experience?: number | null;
  company?: Company | null;
  applications: Application[];
}

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) {
        toast.error('No job ID provided');
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        // Fetch job with company and applications data
        const { data, error } = await supabase
          .from('jobs')
          .select(`
            *,
            company:company_id (
              id,
              company_name,
              description,
              website,
              location,
              industry
            ),
            applications:job_applications(
              id,
              applied_at,
              status,
              resume_url,
              student:student_id(
                id,
                profiles:id(
                  name,
                  email,
                  avatar_url
                )
              )
            )
          `)
          .eq('id', id)
          .single();

        if (error) throw error;
        
        if (!data) {
          throw new Error('Job not found');
        }
        
        console.log('Job data loaded:', data);
        setJob(data);
      } catch (error) {
        console.error('Error loading job details:', error);
        toast.error('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-2"></div>
                <div className="flex flex-wrap gap-3 mt-3">
                  <div className="h-6 bg-gray-200 rounded-md w-20"></div>
                  <div className="h-6 bg-gray-200 rounded-md w-32"></div>
                  <div className="h-6 bg-gray-200 rounded-md w-36"></div>
                </div>
              </div>
              <div className="h-10 bg-gray-200 rounded-md w-32"></div>
            </div>
            <div className="h-96 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!job) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">Job not found.</p>
          <Button className="mt-4" onClick={() => navigate('/jobs')}>
            Back to Jobs
          </Button>
        </div>
      </Layout>
    );
  }

  // Check if job.applications exists before access
  const applications = job.applications || [];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{job.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Building className="h-4 w-4 text-gray-500" />
                <span className="text-lg text-gray-700">{job.company?.company_name}</span>
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
                  <span>Deadline: {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Not specified'}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{job.positions} positions</span>
                </div>
              </div>
            </div>
            <div>
              {currentUser ? (
                <Button 
                  onClick={() => setShowApplicationModal(true)}
                  className="w-full md:w-auto"
                >
                  Apply Now
                </Button>
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
                  <p className="text-gray-700">{job.company?.description || "No company description provided."}</p>
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

                <div>
                  <h2 className="text-xl font-semibold mb-2">Eligibility</h2>
                  <div className="space-y-2">
                    {job.eligibility ? (
                      <p className="text-gray-700 whitespace-pre-line">{job.eligibility}</p>
                    ) : (
                      <p className="text-gray-500 italic">No specific eligibility criteria provided.</p>
                    )}
                    {job.min_qualification && (
                      <p className="text-gray-700">
                        <span className="font-medium">Minimum Qualification:</span> {job.min_qualification}
                      </p>
                    )}
                    {job.min_experience !== undefined && (
                      <p className="text-gray-700">
                        <span className="font-medium">Experience Required:</span> {job.min_experience} {job.min_experience === 1 ? 'year' : 'years'}
                      </p>
                    )}
                  </div>
                </div>

                {currentUser && currentUser.role === 'company' && applications.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Applications ({applications.length})</h2>
                    <div className="space-y-4">
                      {applications.map((application) => (
                        <div key={application.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold">
                                {application.student?.profiles?.name || "Unknown Applicant"}
                              </p>
                              <p className="text-sm text-gray-600">
                                {application.student?.profiles?.email || "No email provided"}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Badge className={
                                application.status === 'selected' ? 'bg-green-100 text-green-800' :
                                application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                application.status === 'interview' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }>
                                {application.status || 'pending'}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-3">
                            <p className="text-xs text-gray-500">
                              Applied on: {application.applied_at ? new Date(application.applied_at).toLocaleDateString() : 'Unknown date'}
                            </p>
                            <div className="flex gap-2">
                              {application.resume_url && (
                                <Button variant="outline" size="sm" onClick={() => window.open(application.resume_url as string, '_blank')}>
                                  View Resume
                                </Button>
                              )}
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={async () => {
                                  try {
                                    await supabase
                                      .from('job_applications')
                                      .update({ status: 'selected' })
                                      .eq('id', application.id);
                                    toast.success('Candidate shortlisted');
                                    // Refresh the page to update the status
                                    window.location.reload();
                                  } catch (error) {
                                    toast.error('Failed to update status');
                                  }
                                }}
                              >
                                Shortlist
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={async () => {
                                  try {
                                    await supabase
                                      .from('job_applications')
                                      .update({ status: 'interview' })
                                      .eq('id', application.id);
                                    toast.success('Interview scheduled');
                                    // Refresh the page to update the status
                                    window.location.reload();
                                  } catch (error) {
                                    toast.error('Failed to update status');
                                  }
                                }}
                              >
                                Schedule Interview
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {job && (
          <JobApplicationModal 
            isOpen={showApplicationModal} 
            onClose={() => setShowApplicationModal(false)}
            jobId={job.id}
            jobTitle={job.title}
            companyName={job.company?.company_name || ""}
            onSuccess={() => {
              toast.success("Application submitted successfully!");
              navigate('/student-dashboard', { 
                state: { activeTab: 'applications' } 
              });
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default JobDetails;
