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
import { mockJobs } from '@/data/mockData';

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
  company_name?: string;
  companyName?: string;
  description?: string | null;
  website?: string | null;
  location?: string | null;
  industry?: string | null;
  logo_url?: string | null;
}

interface Job {
  id: string;
  title: string;
  description: string;
  company_id: string;
  location?: string | null;
  salary?: string | null;
  status?: string | null;
  deadline?: string | null;
  positions?: number | null;
  requirements?: string[] | null;
  created_at?: string | null;
  eligibility?: string | null;
  min_qualification?: string | null;
  min_experience?: number | null;
  company?: Company | null;
  applications: Application[];
  // Mock data compatibility fields
  postedDate?: string;
}

const sampleJobs = [
  {
    id: 'sample-se-1',
    title: 'Software Engineer',
    company_id: 'sample-company',
    location: 'Remote',
    salary: '₹8,00,000 - ₹12,00,000 per year',
    type: 'full-time',
    description: 'Looking for a skilled software engineer to join our team. Responsibilities include developing new features, fixing bugs, and collaborating with cross-functional teams.',
    requirements: ['3+ years experience', 'Proficiency in JavaScript/TypeScript', 'Bachelor\'s degree in CS or related field'],
    deadline: '2025-12-31',
    positions: 2,
    status: 'active',
    created_at: new Date().toISOString()
  },
  {
    id: 'sample-hr-1',
    title: 'HR Recruiter',
    company_id: 'sample-company',
    location: 'Hybrid',
    salary: '₹5,00,000 - ₹7,00,000 per year',
    type: 'full-time',
    description: 'Seeking an experienced HR professional to manage our recruitment process. You\'ll be responsible for sourcing candidates, conducting interviews, and managing hiring pipelines.',
    requirements: ['2+ years HR experience', 'Excellent communication skills', 'Bachelor\'s degree in HR or related field'],
    deadline: '2025-12-31',
    positions: 1,
    status: 'active',
    created_at: new Date().toISOString()
  },
  {
    id: 'sample-ba-1',
    title: 'Business Analyst',
    company_id: 'sample-company',
    location: 'Hybrid',
    salary: '₹9,00,000 - ₹14,00,000 per year',
    type: 'full-time',
    description: 'Looking for a Business Analyst to bridge the gap between IT and business using data analytics. You will analyze business processes, identify needs, and develop solutions.',
    requirements: ['5+ years BA experience', 'Strong analytical skills', 'Experience with Agile methodologies', 'Bachelor\'s degree in Business or related field'],
    deadline: '2025-12-31',
    positions: 1,
    status: 'active',
    created_at: new Date().toISOString()
  },
  {
    id: 'sample-tl-1',
    title: 'Team Lead',
    company_id: 'sample-company',
    location: 'On-site',
    salary: '₹15,00,000 - ₹20,00,000 per year',
    type: 'full-time',
    description: 'Seeking an experienced Team Lead to guide our development team. You will be responsible for technical leadership, mentoring junior developers, and ensuring project delivery.',
    requirements: ['7+ years development experience', '2+ years leadership experience', 'Strong communication skills', 'Experience with project management'],
    deadline: '2025-12-31',
    positions: 1,
    status: 'active',
    created_at: new Date().toISOString()
  },
  {
    id: 'sample-ds-1',
    title: 'Director of Sales',
    company_id: 'sample-company',
    location: 'On-site',
    salary: '₹25,00,000 - ₹35,00,000 per year',
    type: 'full-time',
    description: 'Looking for a Director of Sales to lead our sales team and drive revenue growth. You will develop sales strategies, build client relationships, and oversee the sales pipeline.',
    requirements: ['10+ years sales experience', '5+ years in leadership role', 'Proven track record of meeting targets', 'Excellent negotiation skills'],
    deadline: '2025-12-31',
    positions: 1,
    status: 'active',
    created_at: new Date().toISOString()
  }
];

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
        // First try to find in mock data
        const job = mockJobs.find(j => j.id === id) || 
          sampleJobs.find(j => j.id === id) || 
          null;
        if (job) {
          // Cast the mock job to any to handle unknown structure
          const mockJobData = job as any;
          
          // Extract company data safely
          const companyData = mockJobData.company || {};
          
          // Convert mock job to the expected format
          const convertedJob: Job = {
            id: mockJobData.id || '',
            title: mockJobData.title || '',
            description: mockJobData.description || '',
            company_id: typeof companyData === 'object' ? companyData.id || '' : '',
            location: mockJobData.location || null,
            salary: mockJobData.salary || null,
            status: mockJobData.status || null,
            deadline: mockJobData.deadline || null,
            positions: mockJobData.positions || null,
            requirements: Array.isArray(mockJobData.requirements) ? mockJobData.requirements : [], // Ensure requirements is always an array
            created_at: mockJobData.created_at || null,
            eligibility: null,
            min_qualification: null,
            min_experience: null,
            company: typeof companyData === 'object' ? {
              id: companyData.id || '',
              company_name: companyData.company_name || companyData.companyName || '',
              description: companyData.description || "A leading company in the industry",
              website: companyData.website || null,
              location: mockJobData.location || null,
              industry: companyData.industry || null,
              logo_url: companyData.logo_url || null
            } : null,
            applications: []
          };
          setJob(convertedJob);
          setLoading(false);
          return;
        }

        // If not in mock data, try Supabase
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
              industry,
              logo_url
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

        if (error) {
          console.warn('Job not found in Supabase, using mock data fallback');
          throw error;
        }
        
        if (data) {
          console.log('Job data loaded from Supabase:', data);
          
          // Cast the data to any to handle unknown structure
          const supabaseData = data as any;
          
          // Convert Supabase data to match our Job interface
          const jobData: Job = {
            id: supabaseData.id || '',
            title: supabaseData.title || '',
            description: supabaseData.description || '',
            company_id: supabaseData.company_id || '',
            location: supabaseData.location || null,
            salary: supabaseData.salary || null,
            status: supabaseData.status || null,
            deadline: supabaseData.deadline || null,
            // Handle potential missing fields
            positions: typeof supabaseData.positions === 'number' ? supabaseData.positions : null,
            requirements: Array.isArray(supabaseData.requirements) ? supabaseData.requirements : [],
            created_at: supabaseData.created_at || null,
            // These fields might not exist in the Supabase response
            eligibility: null,
            min_qualification: null,
            min_experience: null,
            // Handle company data safely
            company: supabaseData.company && typeof supabaseData.company === 'object' ? {
              id: supabaseData.company.id || '',
              company_name: supabaseData.company.company_name || '',
              description: supabaseData.company.description || null,
              website: supabaseData.company.website || null,
              location: supabaseData.company.location || null,
              industry: supabaseData.company.industry || null,
              logo_url: supabaseData.company.logo_url || null
            } : null,
            // Ensure applications is an array
            applications: Array.isArray(supabaseData.applications) ? supabaseData.applications : []
          };
          setJob(jobData);
        }
      } catch (error) {
        console.error('Error loading job details:', error);
        toast.error('Job not found');
        // Don't navigate away, just show error state
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
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <Badge 
              variant={job.status === 'active' ? 'default' : 'secondary'}
              className={job.id.startsWith('sample-') ? 'bg-green-100 text-green-800' : ''}
            >
              {job.id.startsWith('sample-') ? 'Open' : job.status || 'Unknown'}
            </Badge>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mt-2">
                {job.company?.logo_url ? (
                  <img 
                    src={job.company.logo_url} 
                    alt={`${job.company.company_name} logo`}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <Building className="h-4 w-4 text-gray-500" />
                )}
                <span className="text-lg text-gray-700">{job.company?.company_name}</span>
              </div>
              <div className="flex flex-wrap gap-3 mt-3">
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

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.requirements && job.requirements.length > 0 ? (
                      job.requirements.map((requirement, index) => (
                        <li key={index} className="text-gray-700">{requirement}</li>
                      ))
                    ) : (
                      <li className="text-gray-700">No specific requirements listed</li>
                    )}
                  </ul>
                </div>

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
            job={{
              ...job,
              location: job.location || undefined,
              salary: job.salary || undefined,
              deadline: job.deadline || undefined,
              status: (job.status as 'active' | 'closed' | 'draft') || undefined,
              positions: job.positions || undefined,
              requirements: job.requirements || [],
              created_at: job.created_at || new Date().toISOString()
            }}
            company={{
              ...job.company,
              id: job.company?.id || 'unknown',
              company_name: job.company?.company_name || 'Unknown Company',
              logo_url: job.company?.logo_url || undefined,
              location: job.company?.location || undefined,
              description: job.company?.description || undefined,
              website: job.company?.website || undefined,
              industry: job.company?.industry || undefined
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default JobDetails;
