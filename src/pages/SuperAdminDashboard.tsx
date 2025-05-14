
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import {
  Pencil, Trash2, UserPlus, Building, Briefcase, 
  Bell, BarChart2, Settings, MessageSquare, Eye, 
  FileText, Users, Activity as ActivityIcon
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
import type { Database } from '@/lib/supabase.types';

// Define types
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

const SuperAdminDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('dashboard');
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
      // Insert the announcement into the database
      const { error } = await supabase
        .from('notifications')
        .insert({
          user_id: 'all', // Special value for system-wide announcements
          title: announcement.title,
          message: announcement.message,
          is_read: false,
          created_at: new Date().toISOString(),
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
          status: 'open',
          created_at: new Date().toISOString(),
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
          <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
          <div className="flex gap-4">
            <Button onClick={() => setShowAnnouncementDialog(true)}>
              <Bell className="mr-2 h-4 w-4" />
              New Announcement
            </Button>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="dashboard">
              <BarChart2 className="mr-2 h-4 w-4" />
              Dashboard
            </TabsTrigger>
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
            <TabsTrigger value="activity">
              <ActivityIcon className="mr-2 h-4 w-4" />
              Activity Log
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

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

          {/* Students Tab */}
          <TabsContent value="students">
            <UserManagement userRole="student" />
          </TabsContent>

          {/* Companies Tab */}
          <TabsContent value="companies">
            <UserManagement userRole="company" />
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

          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Job Applications</CardTitle>
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
          
          {/* Activity Log Tab */}
          <TabsContent value="activity">
            <ActivityLog />
          </TabsContent>

          {/* Settings Tab */}
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
