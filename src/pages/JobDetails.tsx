
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Calendar, Users, Building } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';
import JobApplicationModal from '@/components/jobs/JobApplicationModal';
import { toast } from 'sonner';

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  // Mock job data to avoid fetch errors
  const job = {
    id: id || 'job-1',
    title: 'Software Developer',
    status: 'open',
    location: 'Remote / San Francisco, CA',
    deadline: '2025-12-31',
    positions: 3,
    description: 'We are looking for a skilled software developer to join our team. The ideal candidate will have experience with React, TypeScript, and modern web development practices.',
    salary: '$80,000 - $120,000',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '2+ years experience with React',
      'Proficiency in TypeScript and JavaScript',
      'Strong problem-solving skills'
    ],
    company: {
      id: 'company-1',
      company_name: 'Tech Innovations Inc.',
      description: 'A leading software development company specializing in web and mobile applications.',
      website: 'https://techinnovations.example.com',
      location: 'San Francisco, CA',
      industry: 'Software Development'
    }
  };

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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
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
                  <p className="text-gray-700">{job.company.description}</p>
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
