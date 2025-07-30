import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Calendar, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockCompanies, mockJobs } from '../data/mockData';
import JobApplicationModal from '@/components/jobs/JobApplicationModal';
import { Job } from '@/types';
import { Badge } from '@/components/ui/badge';

const CompanyProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Safely find company with null checks
  const company = mockCompanies.find(c => c.id === id);

  if (!company) {
    const companyName = id ? `Company ID: ${id}` : 'Unknown Company';
    const similarCompanies = mockCompanies.slice(0, 3);

    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <h2 className="mt-4 text-xl font-semibold">Company Not Found</h2>
          <p className="text-gray-500 mb-6">
            The profile for {companyName} doesn't exist in our system.
          </p>
          
          <div className="w-full max-w-md">
            <h3 className="font-medium mb-4">Similar Companies You Might Like:</h3>
            <div className="space-y-4">
              {similarCompanies.map((c) => (
                <Card key={c.id} className="p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => navigate(`/company/${c.id}`)}>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={c.logo_url} />
                      <AvatarFallback>{(c.company_name || 'C').charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{c.company_name}</h4>
                      <p className="text-sm text-gray-500">{c.industry}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          <Button className="mt-8" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </Layout>
    );
  }

  // Update job filtering to use global mockJobs
  const jobs = mockJobs.filter((job: Job) => job.company_id === company.id);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={company.logo_url} alt={company.company_name} />
              <AvatarFallback>{(company.company_name || 'C').charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{company.company_name || 'Company Name'}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{company.location}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">About</h3>
              <p className="text-sm text-gray-600">{company.description}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Contact</h3>
              {company.email && (
                <p className="text-sm text-gray-600 mb-1">Email: {company.email}</p>
              )}
              {company.website && (
                <p className="text-sm text-gray-600">
                  Website: <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {company.website.replace(/^https?:\/\//, '')}
                  </a>
                </p>
              )}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Details</h3>
              <p className="text-sm text-gray-600 mb-1">Industry: {company.industry}</p>
              <p className="text-sm text-gray-600">Open Positions: {company.open_positions || 0}</p>
            </div>
          </div>

          {company && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Description</h4>
                      <p>{company.description || 'No description available'}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Founded</h4>
                        <p>{company.founded_year || 'N/A'}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Employees</h4>
                        <p>{company.employee_count ? company.employee_count.toLocaleString() : 'N/A'}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Headquarters</h4>
                        <p>{company.headquarters || 'N/A'}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Revenue</h4>
                        <p>{company.revenue || 'N/A'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Technology Stack</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {company.tech_stack?.map(tech => (
                          <Badge key={tech} variant="outline">{tech}</Badge>
                        )) || 'N/A'}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Key Products</h4>
                      <ul className="list-disc pl-5 mt-2">
                        {company.key_products?.map(product => (
                          <li key={product}>{product}</li>
                        )) || 'N/A'}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          <Tabs defaultValue="jobs" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-xs">
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            
            <TabsContent value="jobs">
              <div className="space-y-4 mt-4">
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <Card key={job.id}>
                      <CardHeader className="pb-4">
                        <CardTitle>{job.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>Deadline: {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'No deadline'}</span>
                        </div>
                        <p className="text-sm text-gray-600">Salary: {job.salary}</p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex justify-between items-center">
                          <Button size="sm" onClick={() => {
                            setSelectedJob(job);
                            setShowApplicationModal(true);
                          }}>
                            Apply Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No job openings currently available</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="about">
              <div className="mt-4">
                <h3 className="font-medium mb-2">Company Overview</h3>
                <p className="text-sm text-gray-600 mb-4">{company.description}</p>
                
                <h3 className="font-medium mb-2">Requirements</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {company.requirements?.map((req, i) => (
                    <li key={i}>{req}</li>
                  )) || <li>No specific requirements listed</li>}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <JobApplicationModal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        job={selectedJob}
        company={company}
      />
    </Layout>
  );
};

export default CompanyProfile;