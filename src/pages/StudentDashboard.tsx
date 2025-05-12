
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { mockJobs } from '@/data/mockData';
import { Student, JobApplication } from '@/types';
import { BriefcaseIcon, Clock, TrendingUp, CheckCircle, XCircle, Calendar } from 'lucide-react';
import CareerAssistant from '@/components/career/CareerAssistant';
import CareerGoals from '@/components/career/CareerGoals';

// Sample career goals data
const sampleGoals = [
  {
    id: '1',
    name: 'Complete Profile',
    description: 'Add all your skills and experience to your profile.',
    progress: 100,
    status: 'completed' as const,
  },
  {
    id: '2',
    name: 'Apply to 5 Jobs',
    description: 'Apply to relevant positions that match your skills and interests.',
    progress: 40,
    status: 'in-progress' as const,
  },
  {
    id: '3',
    name: 'Upload Enhanced Resume',
    description: 'Create a targeted resume highlighting your key achievements.',
    progress: 0,
    status: 'not-started' as const,
  },
  {
    id: '4',
    name: 'Complete LinkedIn Profile',
    description: 'Update your LinkedIn profile with relevant experience and skills.',
    progress: 70,
    status: 'in-progress' as const,
  },
];

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('applications');
  
  // Type guard to ensure currentUser is a Student
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (currentUser.role !== 'student') {
    return <Navigate to="/" />;
  }
  
  // Cast currentUser to Student type
  const studentUser = currentUser as Student;
  
  // Get applications for this student from the mock data
  const applications = studentUser.applications || [];
  
  // Calculate application statistics
  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    shortlisted: applications.filter(app => app.status === 'shortlisted').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
    selected: applications.filter(app => app.status === 'selected').length,
    successRate: applications.length ? 
      Math.round((applications.filter(app => ['shortlisted', 'selected'].includes(app.status)).length / applications.length) * 100) : 0
  };
  
  // Get recommended jobs based on student skills
  const recommendedJobs = mockJobs
    .filter(job => 
      // Job is open
      job.status === 'open' && 
      // Student hasn't already applied
      !applications.some(app => app.job.id === job.id) &&
      // Student has at least one matching skill
      studentUser.skills.some(skill => 
        job.requirements.some(req => 
          req.toLowerCase().includes(skill.toLowerCase())
        )
      )
    )
    .slice(0, 5);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="text-muted-foreground text-sm flex items-center">
                <BriefcaseIcon className="mr-2 h-4 w-4" />
                Applications
              </div>
              <div className="text-3xl font-bold mt-2">{stats.total}</div>
              <div className="text-xs text-muted-foreground mt-1">Total job applications</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="text-muted-foreground text-sm flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Pending
              </div>
              <div className="text-3xl font-bold mt-2">{stats.pending}</div>
              <div className="text-xs text-muted-foreground mt-1">Awaiting response</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="text-muted-foreground text-sm flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                Selected
              </div>
              <div className="text-3xl font-bold mt-2">{stats.selected}</div>
              <div className="text-xs text-muted-foreground mt-1">Offers received</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="text-muted-foreground text-sm flex items-center">
                <TrendingUp className="mr-2 h-4 w-4" />
                Success Rate
              </div>
              <div className="text-3xl font-bold mt-2">{stats.successRate}%</div>
              <div className="text-xs text-muted-foreground mt-1">Shortlisted or selected</div>
              <Progress className="mt-2" value={stats.successRate} />
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="applications" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="recommended">Recommended Jobs</TabsTrigger>
            <TabsTrigger value="career">Career Planning</TabsTrigger>
          </TabsList>
          
          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>My Job Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {applications.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Job Title</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Applied On</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {applications.map((app) => (
                          <TableRow key={app.id}>
                            <TableCell>{app.job.title}</TableCell>
                            <TableCell>{app.job.company.companyName}</TableCell>
                            <TableCell>{new Date(app.appliedAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Badge className={`
                                ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                                ${app.status === 'shortlisted' ? 'bg-blue-100 text-blue-800' : ''}
                                ${app.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                                ${app.status === 'selected' ? 'bg-green-100 text-green-800' : ''}
                              `}>
                                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" asChild>
                                <a href={`/jobs/${app.job.id}`}>View Job</a>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">You haven't applied to any jobs yet.</p>
                    <Button className="mt-4" asChild>
                      <a href="/jobs">Browse Jobs</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Recommended Jobs Tab */}
          <TabsContent value="recommended">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                {recommendedJobs.length > 0 ? (
                  <div className="grid gap-4">
                    {recommendedJobs.map(job => (
                      <Card key={job.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="p-6">
                            <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{job.company.companyName} • {job.location}</p>
                            <p className="text-sm mb-4 line-clamp-2">{job.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {job.requirements.slice(0, 3).map((req, idx) => (
                                <Badge key={idx} variant="secondary">{req}</Badge>
                              ))}
                              {job.requirements.length > 3 && <Badge variant="outline">+{job.requirements.length - 3} more</Badge>}
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  Deadline: {new Date(job.deadline).toLocaleDateString()}
                                </span>
                              </div>
                              <Button asChild>
                                <a href={`/jobs/${job.id}`}>View Job</a>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No recommended jobs found. Update your skills to get personalized recommendations.</p>
                    <Button className="mt-4" asChild>
                      <a href="/profile">Update Profile</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Career Planning Tab */}
          <TabsContent value="career">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CareerAssistant />
              
              <div className="space-y-6">
                <CareerGoals goals={sampleGoals} />
                
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Builder</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-6 rounded-lg text-center">
                      <h3 className="text-lg font-semibold mb-2">Smart Resume Generator</h3>
                      <p className="mb-4 text-sm">Create a tailored resume optimized for your target roles. Our AI-powered tool highlights your key strengths and achievements.</p>
                      <Button>Build Your Resume</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Career Path Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-6 rounded-lg text-center">
                      <h3 className="text-lg font-semibold mb-2">Compare Career Paths</h3>
                      <p className="mb-4 text-sm">Explore and compare different career trajectories based on your skills, interests, and market demand.</p>
                      <Button variant="secondary">Coming Soon</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
