import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Globe, MapPin, Briefcase, Users, Calendar, IndianRupee } from 'lucide-react';
import { mockCompanies } from '../data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import JobApplicationModal from '@/components/jobs/JobApplicationModal';
import { toast } from 'sonner';

const CompanyProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  // Define a type to match the actual mock data structure
  type MockCompany = {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar_url: string;
    company_name: string;
    description: string;
    website: string;
    location: string;
    industry: string;
    postedJobs: any[];
    avatar?: string;
    companyName?: string;
  };

  // Safely find company with null checks
  const company = mockCompanies.find(c => c?.id === id) as MockCompany | null;

  if (!company) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Company Not Found</h1>
            <p className="mt-2 text-gray-600">The company profile you're looking for doesn't exist.</p>
            <Button className="mt-4" onClick={() => navigate('/companies')}>
              Back to Companies
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleApply = (job: any) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={company?.avatar_url || company?.avatar} alt={company?.company_name || company?.companyName || 'Company'} />
                <AvatarFallback>{(company?.company_name || company?.companyName || 'C').charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{company?.company_name || company?.companyName || 'Company'}</h1>
                <p className="text-gray-600">{company?.industry || 'Various Industries'}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {company?.location || 'Location not specified'}
                  </Badge>
                  {company?.website && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      <a href={company.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {company.website}
                      </a>
                    </Badge>
                  )}
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {company?.postedJobs?.length || 0} job(s) posted
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="about" className="space-y-4">
          <TabsList>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="jobs">Open Positions</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About {company?.company_name || company?.companyName || 'Company'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-line">{company?.description || 'No description available.'}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs">
            <div className="space-y-4">
              {company?.postedJobs?.length > 0 ? company.postedJobs.map((job: any) => (
                <Card key={job.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold">{job?.title || 'Untitled Position'}</h3>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{job?.location || 'Location not specified'}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>Deadline: {job?.deadline ? new Date(job.deadline).toLocaleDateString() : 'No deadline'}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Users className="h-4 w-4" />
                            <span>{job?.positions || 'Multiple'} positions</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <IndianRupee className="h-4 w-4" />
                            <span>{job?.salary || 'Salary not specified'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => navigate(`/jobs/${job.id}`)}>
                          View Details
                        </Button>
                        {currentUser && (
                          <Button onClick={() => handleApply(job)}>
                            Apply Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-500">No open positions available at this time.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {selectedJob && (
          <JobApplicationModal 
            isOpen={showApplicationModal} 
            onClose={() => setShowApplicationModal(false)}
            jobId={selectedJob.id}
            jobTitle={selectedJob.title}
            companyName={company?.company_name || company?.companyName || 'Company'}
            onSuccess={() => {
              toast.success("Application submitted successfully!");
              setShowApplicationModal(false);
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default CompanyProfile; 