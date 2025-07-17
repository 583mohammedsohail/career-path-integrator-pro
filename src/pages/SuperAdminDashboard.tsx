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
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import {
  Pencil, UserPlus, Building, Briefcase, 
  Bell, BarChart2, Settings, FileText, Users, Activity as ActivityIcon,
  Monitor, UserCheck, Calendar
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Import admin components
import UserManagement from '@/components/admin/UserManagement';
import ActivityLog from '@/components/admin/ActivityLog';
import DashboardStats from '@/components/admin/DashboardStats';
import SystemSettings from '@/components/admin/SystemSettings';
import ApplicationsTable from '@/components/admin/ApplicationsTable';
import JobDetailsModal from '@/components/jobs/JobDetailsModal';
import JobForm from '@/components/jobs/JobForm';
import RealTimeUserTracker from '@/components/admin/RealTimeUserTracker';
import type { Database } from '@/lib/supabase.types';

// Define types
type Tables = Database['public']['Tables'];
type DbJob = Tables['jobs']['Row'];

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

const SuperAdminDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('realtime');
  const [showAnnouncementDialog, setShowAnnouncementDialog] = useState(false);
  const [announcement, setAnnouncement] = useState({ title: '', message: '' });
  const [selectedJob, setSelectedJob] = useState<ExtendedJob | null>(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect if not a super admin
  if (currentUser?.role !== 'superadmin') {
    navigate('/');
    toast.error("You don't have permission to access this page.");
    return null;
  }

  const handleSendAnnouncement = async () => {
    if (!announcement.title || !announcement.message) {
      toast.error("Title and message are required");
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Insert the announcement into the system notifications table
      const { error } = await supabase
        .from('system_notifications')
        .insert({
          title: announcement.title,
          message: announcement.message,
          type: 'info',
          target_users: [], // empty array means all users
          created_by: currentUser?.id,
          is_active: true
        });

      if (error) throw error;
      
      toast.success('Announcement sent successfully');
      setShowAnnouncementDialog(false);
      setAnnouncement({ title: '', message: '' });
    } catch (error) {
      console.error('Failed to send announcement:', error);
      toast.error('Failed to send announcement');
    } finally {
      setIsSubmitting(false);
    }
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
          status: 'open'
        });

      if (error) throw error;
      toast.success('Job posted successfully');
      setShowJobForm(false);
    } catch (error) {
      console.error('Failed to post job:', error);
      toast.error('Failed to post job');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Super Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Real-time system administration and monitoring</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => setShowAnnouncementDialog(true)} className="gap-2">
              <Bell className="h-4 w-4" />
              Send Announcement
            </Button>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="realtime" className="gap-2">
              <Monitor className="h-4 w-4" />
              Real-time
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="gap-2">
              <BarChart2 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="students" className="gap-2">
              <Users className="h-4 w-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="companies" className="gap-2">
              <Building className="h-4 w-4" />
              Companies
            </TabsTrigger>
            <TabsTrigger value="jobs" className="gap-2">
              <Briefcase className="h-4 w-4" />
              Jobs
            </TabsTrigger>
            <TabsTrigger value="applications" className="gap-2">
              <FileText className="h-4 w-4" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <ActivityIcon className="h-4 w-4" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Real-time Dashboard */}
          <TabsContent value="realtime" className="space-y-6">
            <RealTimeUserTracker />
          </TabsContent>

          {/* Dashboard Overview */}
          <TabsContent value="dashboard">
            <Card>
              <CardHeader>
                <CardTitle>System Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <DashboardStats />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Management */}
          <TabsContent value="students">
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    Student Management & Attendance
                  </CardTitle>
                  <Button className="gap-2">
                    <UserPlus className="h-4 w-4" />
                    Add Student
                  </Button>
                </CardHeader>
                <CardContent>
                  <UserManagement userRole="student" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Companies Management */}
          <TabsContent value="companies">
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Company Management
                  </CardTitle>
                  <Button className="gap-2">
                    <Building className="h-4 w-4" />
                    Add Company
                  </Button>
                </CardHeader>
                <CardContent>
                  <UserManagement userRole="company" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Jobs Management */}
          <TabsContent value="jobs">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Job Postings Management
                </CardTitle>
                <Dialog open={showJobForm} onOpenChange={setShowJobForm}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Briefcase className="h-4 w-4" />
                      Post New Job
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Post New Job</DialogTitle>
                      <DialogDescription>
                        Create a new job posting for students to apply.
                      </DialogDescription>
                    </DialogHeader>
                    <JobForm onSubmit={handleCreateJob} isLoading={isSubmitting} />
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <ApplicationsTable
                  jobs={true}
                  onUpdateStatus={() => {}}
                  onViewDetails={() => {}}
                  onDownloadResume={() => {}}
                  onSendMessage={() => {}}
                />
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

          {/* Applications Management */}
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Application Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ApplicationsTable
                  applications={true}
                  onUpdateStatus={() => {}}
                  onViewDetails={() => {}}
                  onDownloadResume={() => {}}
                  onSendMessage={() => {}}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Activity Log */}
          <TabsContent value="activity">
            <ActivityLog />
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="settings">
            <SystemSettings 
              settings={{
                allowRegistration: true,
                emailNotifications: true,
                maintenanceMode: false,
                autoApproveCompanies: false,
                maxApplicationsPerStudent: 10,
                maxJobsPerCompany: 5,
                applicationDeadlineBuffer: 7,
                dataRetentionDays: 90,
              }}
              onUpdateSettings={() => {}}
            />
          </TabsContent>
        </Tabs>

        {/* System Announcement Dialog */}
        <Dialog open={showAnnouncementDialog} onOpenChange={setShowAnnouncementDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send System Announcement</DialogTitle>
              <DialogDescription>
                Create a system-wide announcement that will be visible to all users.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="text-sm font-medium">Announcement Title</label>
                <Input
                  id="title"
                  value={announcement.title}
                  onChange={(e) => setAnnouncement(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter announcement title"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea
                  id="message"
                  value={announcement.message}
                  onChange={(e) => setAnnouncement(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Enter announcement message"
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAnnouncementDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendAnnouncement} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Announcement'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default SuperAdminDashboard;