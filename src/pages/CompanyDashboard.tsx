
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { mockJobs, mockStudents } from '@/data/mockData';
import { Company, Job, Student } from '@/types';
import { toast } from 'sonner';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, BriefcaseIcon, User, Calendar, Clock, Download, Star } from 'lucide-react';

const CompanyDashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('postings');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<Student | null>(null);
  
  // Type guard to ensure currentUser is a Company
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (currentUser.role !== 'company') {
    return <Navigate to="/" />;
  }
  
  // Cast currentUser to Company type
  const companyUser = currentUser as Company;
  
  // Get jobs posted by this company
  const companyJobs = companyUser.postedJobs || [];
  
  // Function to handle status update for an applicant
  const updateApplicationStatus = (jobId: string, studentId: string, newStatus: string) => {
    toast.success(`Application status updated to ${newStatus}`);
    setIsDialogOpen(false);
  };
  
  // Function to handle viewing applicant details
  const viewApplicantDetails = (job: Job, student: Student) => {
    setSelectedJob(job);
    setSelectedApplicant(student);
    setIsDialogOpen(true);
  };
  
  // Calculate stats
  const stats = {
    totalJobs: companyJobs.length,
    activeJobs: companyJobs.filter(job => job.status === 'open').length,
    totalApplications: companyJobs.reduce((acc, job) => acc + (job.applications?.length || 0), 0),
    shortlistedCandidates: companyJobs.reduce(
      (acc, job) => acc + (job.applications?.filter(app => app.status === 'shortlisted' || app.status === 'selected').length || 0), 
      0
    )
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Company Dashboard</h1>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="text-muted-foreground text-sm flex items-center">
                <BriefcaseIcon className="mr-2 h-4 w-4" />
                Total Jobs
              </div>
              <div className="text-3xl font-bold mt-2">{stats.totalJobs}</div>
              <div className="text-xs text-muted-foreground mt-1">Jobs posted</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="text-muted-foreground text-sm flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Active Jobs
              </div>
              <div className="text-3xl font-bold mt-2">{stats.activeJobs}</div>
              <div className="text-xs text-muted-foreground mt-1">Currently open</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="text-muted-foreground text-sm flex items-center">
                <User className="mr-2 h-4 w-4" />
                Applications
              </div>
              <div className="text-3xl font-bold mt-2">{stats.totalApplications}</div>
              <div className="text-xs text-muted-foreground mt-1">Total received</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="text-muted-foreground text-sm flex items-center">
                <Star className="mr-2 h-4 w-4" />
                Shortlisted
              </div>
              <div className="text-3xl font-bold mt-2">{stats.shortlistedCandidates}</div>
              <div className="text-xs text-muted-foreground mt-1">Potential candidates</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="postings" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="postings">Job Postings</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="post">Post New Job</TabsTrigger>
            <TabsTrigger value="campus">Campus Recruitment</TabsTrigger>
          </TabsList>
          
          {/* Job Postings Tab */}
          <TabsContent value="postings">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Your Job Postings</CardTitle>
                <Button onClick={() => setActiveTab('post')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Post New Job
                </Button>
              </CardHeader>
              <CardContent>
                {companyJobs.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Job Title</TableHead>
                          <TableHead>Posted Date</TableHead>
                          <TableHead>Deadline</TableHead>
                          <TableHead>Applications</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {companyJobs.map((job) => (
                          <TableRow key={job.id}>
                            <TableCell>{job.title}</TableCell>
                            <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(job.deadline).toLocaleDateString()}</TableCell>
                            <TableCell>{job.applications?.length || 0}</TableCell>
                            <TableCell>
                              <Badge className={job.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                {job.status.toUpperCase()}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm" asChild>
                                  <a href={`/jobs/${job.id}`}>View</a>
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    toast.success(`Job status toggled to ${job.status === 'open' ? 'closed' : 'open'}`);
                                  }}
                                >
                                  {job.status === 'open' ? 'Close' : 'Reopen'}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">You haven't posted any jobs yet.</p>
                    <Button className="mt-4" onClick={() => setActiveTab('post')}>
                      Post Your First Job
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Manage Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.totalApplications > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Applicant</TableHead>
                          <TableHead>Job Position</TableHead>
                          <TableHead>Applied On</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {companyJobs.flatMap(job => 
                          (job.applications || []).map(application => (
                            <TableRow key={application.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={application.student.avatar} />
                                    <AvatarFallback>{application.student?.name?.charAt(0) || 'U'}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{application.student.name}</p>
                                    <p className="text-xs text-muted-foreground">{application.student.department}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{job.title}</TableCell>
                              <TableCell>{new Date(application.appliedAt).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Badge className={`
                                  ${application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                                  ${application.status === 'shortlisted' ? 'bg-blue-100 text-blue-800' : ''}
                                  ${application.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                                  ${application.status === 'selected' ? 'bg-green-100 text-green-800' : ''}
                                `}>
                                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => viewApplicantDetails(job, application.student)}
                                  >
                                    Review
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    asChild
                                  >
                                    <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer">
                                      <Download className="h-4 w-4" />
                                    </a>
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No applications have been received yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Post New Job Tab */}
          <TabsContent value="post">
            <Card>
              <CardHeader>
                <CardTitle>Post a New Job</CardTitle>
              </CardHeader>
              <CardContent>
                <form 
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast.success('Job posted successfully!');
                    setActiveTab('postings');
                  }}
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="title">Job Title</label>
                    <Input id="title" placeholder="e.g. Software Engineer" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="description">Job Description</label>
                    <Textarea id="description" rows={5} placeholder="Describe the role, responsibilities, and benefits" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="location">Location</label>
                      <Input id="location" placeholder="e.g. Bangalore, India" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="salary">Salary Range</label>
                      <Input id="salary" placeholder="e.g. ₹5,00,000 - ₹8,00,000" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="positions">Number of Positions</label>
                      <Input type="number" id="positions" min="1" placeholder="e.g. 2" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="deadline">Application Deadline</label>
                      <Input type="date" id="deadline" min={new Date().toISOString().split('T')[0]} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="requirements">Requirements (one per line)</label>
                    <Textarea 
                      id="requirements" 
                      rows={4} 
                      placeholder="e.g. 
- Bachelor's degree in Computer Science
- 2+ years experience with React
- Strong communication skills"
                    />
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button type="submit">Post Job</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Campus Recruitment Tab */}
        <TabsContent value="campus">
          <Card>
            <CardHeader>
              <CardTitle>Post a Campus Recruitment Drive</CardTitle>
            </CardHeader>
            <CardContent>
              <form 
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success('Campus recruitment drive posted successfully!');
                  setActiveTab('postings');
                }}
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="campus-title">Drive Title</label>
                  <Input id="campus-title" placeholder="e.g. 2025 Graduate Drive" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="campus-description">Description</label>
                  <Textarea id="campus-description" rows={4} placeholder="Describe the drive, target branches, etc." />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="campus-date">Drive Date</label>
                    <Input type="date" id="campus-date" min={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="campus-location">Location</label>
                    <Input id="campus-location" placeholder="e.g. College Auditorium" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="campus-requirements">Requirements (one per line)</label>
                  <Textarea id="campus-requirements" rows={4} placeholder="e.g. CS/IT branches, 60% minimum, etc." />
                </div>
                <div className="pt-4 flex justify-end">
                  <Button type="submit">Post Campus Drive</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Dialog for applicant details */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            {selectedApplicant && selectedJob && (
              <>
                <DialogHeader>
                  <DialogTitle>Application Review</DialogTitle>
                  <DialogDescription>
                    {selectedApplicant.name}'s application for {selectedJob.title}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={selectedApplicant.avatar} />
                        <AvatarFallback>{selectedApplicant?.name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold mt-4">{selectedApplicant.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedApplicant.department}</p>
                      
                      <div className="mt-4 w-full">
                        <div className="flex justify-between text-sm">
                          <span>CGPA</span>
                          <span className="font-medium">{selectedApplicant.cgpa}</span>
                        </div>
                        <div className="flex justify-between text-sm mt-2">
                          <span>Year</span>
                          <span className="font-medium">{selectedApplicant.year}</span>
                        </div>
                        <div className="flex justify-between text-sm mt-2">
                          <span>Course</span>
                          <span className="font-medium">{selectedApplicant.course}</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="mt-4 w-full"
                        asChild
                      >
                        <a href={selectedApplicant.resumeUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="mr-2 h-4 w-4" />
                          Download Resume
                        </a>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedApplicant.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Skill Match</h4>
                        <div className="space-y-2">
                          {selectedJob.requirements.map((requirement, index) => {
                            const isMatch = selectedApplicant.skills.some(skill => 
                              requirement.toLowerCase().includes(skill.toLowerCase())
                            );
                            return (
                              <div key={index} className="flex items-center gap-2">
                                {isMatch ? (
                                  <div className="h-4 w-4 rounded-full bg-green-500"></div>
                                ) : (
                                  <div className="h-4 w-4 rounded-full bg-gray-300"></div>
                                )}
                                <span className={`text-sm ${isMatch ? 'font-medium' : ''}`}>{requirement}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Update Application Status</h4>
                        <div className="flex gap-4">
                          <Select 
                            onValueChange={(value) => updateApplicationStatus(selectedJob.id, selectedApplicant.id, value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="shortlisted">Shortlist</SelectItem>
                              <SelectItem value="selected">Select</SelectItem>
                              <SelectItem value="rejected">Reject</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Interview Scheduling</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <Input type="date" placeholder="Select date" />
                          <Input type="time" placeholder="Select time" />
                        </div>
                        <Button className="mt-2 w-full">Schedule Interview</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default CompanyDashboard;
