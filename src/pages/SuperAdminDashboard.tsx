import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { mockStudents, mockCompanies, mockJobs } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Pencil, Trash2, UserPlus, Building, Briefcase, 
  Bell, BarChart2, Settings, Lock, Shield, 
  MessageSquare, FileText, Users, CheckCircle, XCircle, Eye 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import AnalyticsCards from '@/components/admin/AnalyticsCards';
import SystemSettings from '@/components/admin/SystemSettings';
import ApplicationsTable from '@/components/admin/ApplicationsTable';
import JobDetailsModal from '@/components/jobs/JobDetailsModal';
import JobForm from '@/components/jobs/JobForm';
import type { Database } from '@/lib/supabase.types';

type Tables = Database['public']['Tables'];
type DbJob = Tables['jobs']['Row'];
type DbCompany = Tables['companies']['Row'];
type DbStudent = Tables['students']['Row'];
type DbJobApplication = Tables['job_applications']['Row'];

interface ExtendedJob extends DbJob {
  company: {
    name: string;
    logo: string;
  };
  applications: Array<{
    id: string;
    student: {
      id: string;
      name: string;
      avatar: string;
      email: string;
    };
    status: string;
    appliedDate: string;
  }>;
}

interface SystemSettings {
  allowRegistration: boolean;
  emailNotifications: boolean;
  maintenanceMode: boolean;
  autoApproveCompanies: boolean;
  maxApplicationsPerStudent: number;
  maxJobsPerCompany: number;
  applicationDeadlineBuffer: number;
  dataRetentionDays: number;
}

interface MockStudent {
  id: string;
  name: string;
  email: string;
  department: string;
  avatar: string;
  course: string;
  cgpa: number;
  year: number;
}

interface MockCompany {
  id: string;
  name: string;
  companyName: string;
  email: string;
  avatar: string;
  location: string;
  postedJobs: number;
}

interface MockJob {
  id: string;
  title: string;
  company: {
    id: string;
    name: string;
    companyName: string;
    logo: string;
  };
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  deadline: string;
  status: string;
  applications: Array<{
    id: string;
    student: {
      id: string;
      name: string;
      avatar: string;
      email: string;
    };
    status: string;
    appliedDate: string;
  }>;
}

const SuperAdminDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('students');
  const [showAnnouncementDialog, setShowAnnouncementDialog] = useState(false);
  const [announcement, setAnnouncement] = useState({ title: '', message: '' });
  const [selectedJob, setSelectedJob] = useState<ExtendedJob | null>(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [systemSettings, setSystemSettings] = useState({
    allowRegistration: true,
    emailNotifications: true,
    maintenanceMode: false,
    autoApproveCompanies: false,
    maxApplicationsPerStudent: 10,
    maxJobsPerCompany: 5,
    applicationDeadlineBuffer: 7,
    dataRetentionDays: 90,
  });

  const [analyticsData, setAnalyticsData] = useState({
    totalStudents: mockStudents.length,
    totalCompanies: mockCompanies.length,
    totalJobs: mockJobs.length,
    totalPlacements: mockJobs.reduce((acc, job) => 
      acc + (job.applications?.filter(app => app.status === 'selected').length || 0), 0),
    placementRate: 75, // Calculate based on actual data
    averageSalary: 800000, // Calculate based on actual data
    activeApplications: mockJobs.reduce((acc, job) => 
      acc + (job.applications?.filter(app => app.status === 'pending').length || 0), 0),
    upcomingDeadlines: mockJobs.filter(job => 
      new Date(job.deadline) > new Date() && 
      new Date(job.deadline) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    ).length,
  });

  // Redirect if not a super admin
  if (currentUser?.role !== 'superadmin') {
    navigate('/');
    toast.error("You don't have permission to access this page.");
    return null;
  }

  const handleEditStudent = async (studentId: string) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .update({ /* updated fields */ })
        .eq('id', studentId);

      if (error) throw error;
      toast.success('Student updated successfully');
    } catch (error) {
      toast.error('Failed to update student');
    }
  };

  const handleDeleteStudent = async (studentId: string) => {
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', studentId);

      if (error) throw error;
      toast.success('Student deleted successfully');
    } catch (error) {
      toast.error('Failed to delete student');
    }
  };

  const handleEditCompany = async (companyId: string) => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .update({ /* updated fields */ })
        .eq('id', companyId);

      if (error) throw error;
      toast.success('Company updated successfully');
    } catch (error) {
      toast.error('Failed to update company');
    }
  };

  const handleDeleteCompany = async (companyId: string) => {
    try {
      const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', companyId);

      if (error) throw error;
      toast.success('Company deleted successfully');
    } catch (error) {
      toast.error('Failed to delete company');
    }
  };

  const handleEditJob = async (jobId: string) => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .update({ /* updated fields */ })
        .eq('id', jobId);

      if (error) throw error;
      toast.success('Job updated successfully');
    } catch (error) {
      toast.error('Failed to update job');
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId);

      if (error) throw error;
      toast.success('Job deleted successfully');
    } catch (error) {
      toast.error('Failed to delete job');
    }
  };

  const handleSendAnnouncement = async () => {
    try {
      const { error } = await supabase
        .from('notifications')
        .insert({
          user_id: 'all', // Special value to indicate system-wide announcement
          title: announcement.title,
          message: announcement.message,
          read: false,
          created_at: new Date().toISOString(),
        });

      if (error) throw error;
      toast.success('Announcement sent successfully');
      setShowAnnouncementDialog(false);
      setAnnouncement({ title: '', message: '' });
    } catch (error) {
      toast.error('Failed to send announcement');
    }
  };

  const handleUpdateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status: newStatus })
        .eq('id', applicationId);

      if (error) throw error;
      toast.success(`Application status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update application status');
    }
  };

  const handleUpdateSettings = (newSettings: Tables['system_settings']['Row']) => {
    setSystemSettings({
      allowRegistration: newSettings.allow_registration,
      emailNotifications: newSettings.email_notifications,
      maintenanceMode: newSettings.maintenance_mode,
      autoApproveCompanies: newSettings.auto_approve_companies,
      maxApplicationsPerStudent: newSettings.max_applications_per_student,
      maxJobsPerCompany: newSettings.max_jobs_per_company,
      applicationDeadlineBuffer: newSettings.application_deadline_buffer,
      dataRetentionDays: newSettings.data_retention_days,
    });
  };

  const handleViewApplicationDetails = (jobId: string) => {
    const job = mockJobs.find(j => j.id === jobId) as MockJob | undefined;
    if (job) {
      setSelectedJob({
        id: job.id,
        title: job.title,
        company_id: job.company.id,
        location: job.location,
        salary: job.salary,
        description: job.description,
        requirements: job.requirements,
        deadline: job.deadline,
        status: job.status as 'open' | 'closed',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        company: {
          name: job.company.companyName,
          logo: job.company.logo,
        },
        applications: job.applications,
      });
      setShowJobModal(true);
    }
  };

  const handleDownloadResume = async (resumeUrl: string) => {
    try {
      const response = await fetch(resumeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast.error('Failed to download resume');
    }
  };

  const handleSendMessage = (studentId: string) => {
    // Implement messaging functionality
    toast.info(`Sending message to student ${studentId}`);
  };

  const handleCreateJob = async (data: {
    title: string;
    company: string;
    location: string;
    salary: string;
    description: string;
    requirements: string;
    deadline: Date;
  }) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('jobs')
        .insert({
          title: data.title,
          company_id: data.company,
          location: data.location,
          salary: data.salary,
          description: data.description,
          requirements: data.requirements.split('\n').filter(Boolean),
          deadline: data.deadline.toISOString(),
          status: 'open',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      toast.success('Job posted successfully');
      setShowJobForm(false);
    } catch (error) {
      toast.error('Failed to post job');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter function for all data based on search query
  const filterData = <T extends { [key: string]: any }>(
    data: T[],
    fields: (keyof T)[]
  ): T[] => {
    if (!searchQuery) return data;
    
    return data.filter(item => 
      fields.some(field => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      })
    );
  };

  const filteredStudents = filterData<MockStudent>(mockStudents as MockStudent[], ['name', 'email', 'department']);
  const filteredCompanies = filterData<MockCompany>(mockCompanies as MockCompany[], ['name', 'companyName', 'email']);
  const filteredJobs = filterData<MockJob>(mockJobs as MockJob[], ['title', 'location']);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
          <div className="flex gap-4">
            <Input 
              placeholder="Search..." 
              className="max-w-xs" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button onClick={() => setShowAnnouncementDialog(true)}>
              <Bell className="mr-2 h-4 w-4" />
              New Announcement
            </Button>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="students">
              <Users className="mr-2 h-4 w-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="companies">
              <Building className="mr-2 h-4 w-4" />
              Companies
            </TabsTrigger>
            <TabsTrigger value="jobs">
              <Briefcase className="mr-2 h-4 w-4" />
              Jobs
            </TabsTrigger>
            <TabsTrigger value="applications">
              <FileText className="mr-2 h-4 w-4" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart2 className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Students Tab */}
          <TabsContent value="students">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Manage Students</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Student
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Student</DialogTitle>
                      <DialogDescription>
                        This would contain a form to add a new student. For demo purposes, this is just a placeholder.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <p>Student creation form would be here</p>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => toast.success("Student successfully added!")}>
                        Save Student
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>CGPA</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={student.avatar} alt={student.name} />
                                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{student.name}</p>
                                <p className="text-xs text-muted-foreground">{student.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{student.department}</TableCell>
                          <TableCell>{student.course}</TableCell>
                          <TableCell>{student.cgpa}</TableCell>
                          <TableCell>{student.year}</TableCell>
                          <TableCell className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleEditStudent(student.id)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Student</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete {student.name}? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteStudent(student.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Companies Tab */}
          <TabsContent value="companies">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Manage Companies</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Building className="mr-2 h-4 w-4" />
                      Add Company
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Company</DialogTitle>
                      <DialogDescription>
                        This would contain a form to add a new company. For demo purposes, this is just a placeholder.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <p>Company creation form would be here</p>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => toast.success("Company successfully added!")}>
                        Save Company
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Contact Email</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Jobs Posted</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCompanies.map((company) => (
                        <TableRow key={company.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={company.avatar} alt={company.companyName} />
                                <AvatarFallback>{company.companyName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{company.companyName}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{company.email}</TableCell>
                          <TableCell>{company.location || "N/A"}</TableCell>
                          <TableCell>{company.postedJobs?.length || 0}</TableCell>
                          <TableCell className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleEditCompany(company.id)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Company</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete {company.companyName}? All associated jobs will also be deleted. This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteCompany(company.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Manage Jobs</CardTitle>
                <Dialog open={showJobForm} onOpenChange={setShowJobForm}>
                  <DialogTrigger asChild>
                    <Button>
                      <Briefcase className="mr-2 h-4 w-4" />
                      Add Job
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Post New Job</DialogTitle>
                      <DialogDescription>
                        Fill in the details below to post a new job opening.
                      </DialogDescription>
                    </DialogHeader>
                    <JobForm onSubmit={handleCreateJob} isLoading={isSubmitting} />
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredJobs.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell>
                            <p className="font-medium">{job.title}</p>
                          </TableCell>
                          <TableCell>{job.company.companyName}</TableCell>
                          <TableCell>{job.location}</TableCell>
                          <TableCell>{new Date(job.deadline).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              job.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {job.status.toUpperCase()}
                            </span>
                          </TableCell>
                          <TableCell className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleViewApplicationDetails(job.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleEditJob(job.id)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Job</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete the job "{job.title}"? All associated applications will also be deleted. This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteJob(job.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Job Details Modal */}
            {selectedJob && (
              <JobDetailsModal
                isOpen={showJobModal}
                onClose={() => {
                  setShowJobModal(false);
                  setSelectedJob(null);
                }}
                job={selectedJob}
              />
            )}
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Job Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <ApplicationsTable
                  applications={[]} // Replace with actual applications data
                  onUpdateStatus={handleUpdateApplicationStatus}
                  onViewDetails={handleViewApplicationDetails}
                  onDownloadResume={handleDownloadResume}
                  onSendMessage={handleSendMessage}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>System Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <AnalyticsCards stats={analyticsData} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <SystemSettings 
              settings={systemSettings}
              onUpdateSettings={handleUpdateSettings}
            />
          </TabsContent>
        </Tabs>

        {/* Announcement Dialog */}
        <Dialog open={showAnnouncementDialog} onOpenChange={setShowAnnouncementDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Announcement</DialogTitle>
              <DialogDescription>
                Create a new announcement that will be visible to all users.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Input
                  id="title"
                  value={announcement.title}
                  onChange={(e) => setAnnouncement(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Announcement title"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea
                  id="message"
                  value={announcement.message}
                  onChange={(e) => setAnnouncement(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Announcement message"
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAnnouncementDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendAnnouncement}>
                Send Announcement
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default SuperAdminDashboard;
