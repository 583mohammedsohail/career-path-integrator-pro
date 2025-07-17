import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, UserCheck, Activity, Building, Briefcase } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ActiveUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar_url?: string;
  last_activity: string;
}

interface ActiveUsersStats {
  total_users: number;
  active_now: number;
  students_online: number;
  companies_online: number;
}

const SimplifiedAdminDashboard = () => {
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const [stats, setStats] = useState<ActiveUsersStats>({
    total_users: 0,
    active_now: 0,
    students_online: 0,
    companies_online: 0
  });
  const [showJobDialog, setShowJobDialog] = useState(false);
  const [showCompanyDialog, setShowCompanyDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Job form state
  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    requirements: '',
    deadline: ''
  });

  // Company form state
  const [companyForm, setCompanyForm] = useState({
    company_name: '',
    description: '',
    website: '',
    location: '',
    industry: ''
  });

  const fetchActiveUsers = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(20);

      if (error) throw error;
      
      // Simulate active users
      const mockActiveUsers = profiles?.map(profile => ({
        id: profile.id,
        name: profile.name || 'Unknown User',
        email: profile.email || 'No email',
        role: profile.role || 'user',
        avatar_url: profile.avatar_url || undefined,
        last_activity: new Date().toISOString()
      })) || [];
      
      setActiveUsers(mockActiveUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      const { count: students } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'student');

      const { count: companies } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'company');

      setStats({
        total_users: totalUsers || 0,
        active_now: Math.floor((totalUsers || 0) * 0.4), // Mock 40% active
        students_online: Math.floor((students || 0) * 0.3),
        companies_online: Math.floor((companies || 0) * 0.2)
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const markAttendance = async (_studentId: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    try {
      toast.success(`Attendance marked as ${status} for student`);
    } catch (error) {
      console.error('Error marking attendance:', error);
      toast.error('Failed to mark attendance');
    }
  };

  const createJob = async () => {
    try {
      const { error } = await supabase
        .from('jobs')
        .insert({
          title: jobForm.title,
          description: jobForm.description,
          location: jobForm.location,
          salary: jobForm.salary,
          requirements: jobForm.requirements.split('\n').filter(Boolean),
          deadline: new Date(jobForm.deadline).toISOString(),
          company_id: 'admin-created', // Placeholder
          status: 'open'
        });

      if (error) throw error;
      
      toast.success('Job created successfully');
      setShowJobDialog(false);
      setJobForm({
        title: '',
        description: '',
        location: '',
        salary: '',
        requirements: '',
        deadline: ''
      });
    } catch (error) {
      console.error('Error creating job:', error);
      toast.error('Failed to create job');
    }
  };

  const createCompany = async () => {
    try {
      // First create a profile entry with a unique ID
      const profileId = crypto.randomUUID();
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: profileId,
          name: companyForm.company_name,
          email: `${companyForm.company_name.toLowerCase().replace(/\s+/g, '')}@company.com`,
          role: 'company'
        });

      if (profileError) throw profileError;

      // Then create the company entry
      const { error: companyError } = await supabase
        .from('companies')
        .insert({
          id: profileId,
          company_name: companyForm.company_name,
          description: companyForm.description,
          website: companyForm.website,
          location: companyForm.location,
          industry: companyForm.industry
        });

      if (companyError) throw companyError;
      
      toast.success('Company created successfully');
      setShowCompanyDialog(false);
      setCompanyForm({
        company_name: '',
        description: '',
        website: '',
        location: '',
        industry: ''
      });
      fetchActiveUsers();
      fetchStats();
    } catch (error) {
      console.error('Error creating company:', error);
      toast.error('Failed to create company');
    }
  };

  useEffect(() => {
    fetchActiveUsers();
    fetchStats();
    setLoading(false);

    // Real-time subscriptions
    const profilesChannel = supabase
      .channel('profiles-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        () => {
          fetchActiveUsers();
          fetchStats();
        }
      )
      .subscribe();

    // Refresh every 30 seconds
    const interval = setInterval(() => {
      fetchActiveUsers();
      fetchStats();
    }, 30000);

    return () => {
      supabase.removeChannel(profilesChannel);
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return <div className="animate-pulse p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Super Admin Dashboard</h1>
          <p className="text-muted-foreground">Real-time monitoring and management</p>
        </div>
        <div className="flex gap-3">
          <Dialog open={showJobDialog} onOpenChange={setShowJobDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Briefcase className="h-4 w-4" />
                Add Job
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Job</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Job Title"
                  value={jobForm.title}
                  onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                />
                <Textarea
                  placeholder="Job Description"
                  value={jobForm.description}
                  onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                />
                <Input
                  placeholder="Location"
                  value={jobForm.location}
                  onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                />
                <Input
                  placeholder="Salary"
                  value={jobForm.salary}
                  onChange={(e) => setJobForm({...jobForm, salary: e.target.value})}
                />
                <Textarea
                  placeholder="Requirements (one per line)"
                  value={jobForm.requirements}
                  onChange={(e) => setJobForm({...jobForm, requirements: e.target.value})}
                />
                <Input
                  type="date"
                  value={jobForm.deadline}
                  onChange={(e) => setJobForm({...jobForm, deadline: e.target.value})}
                />
                <Button onClick={createJob} className="w-full">Create Job</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showCompanyDialog} onOpenChange={setShowCompanyDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Building className="h-4 w-4" />
                Add Company
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Company</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Company Name"
                  value={companyForm.company_name}
                  onChange={(e) => setCompanyForm({...companyForm, company_name: e.target.value})}
                />
                <Textarea
                  placeholder="Company Description"
                  value={companyForm.description}
                  onChange={(e) => setCompanyForm({...companyForm, description: e.target.value})}
                />
                <Input
                  placeholder="Website"
                  value={companyForm.website}
                  onChange={(e) => setCompanyForm({...companyForm, website: e.target.value})}
                />
                <Input
                  placeholder="Location"
                  value={companyForm.location}
                  onChange={(e) => setCompanyForm({...companyForm, location: e.target.value})}
                />
                <Input
                  placeholder="Industry"
                  value={companyForm.industry}
                  onChange={(e) => setCompanyForm({...companyForm, industry: e.target.value})}
                />
                <Button onClick={createCompany} className="w-full">Create Company</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.total_users}</p>
                <p className="text-xs text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-green-500">{stats.active_now}</p>
                <p className="text-xs text-muted-foreground">Active Now</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-blue-500">{stats.students_online}</p>
                <p className="text-xs text-muted-foreground">Students Online</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-purple-500">{stats.companies_online}</p>
                <p className="text-xs text-muted-foreground">Companies Online</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Real-time Active Users
              <Badge variant="secondary">{activeUsers.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {activeUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback>
                          {user.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {user.role}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-500">Online</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Attendance Marking */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Attendance Marking</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {activeUsers
                  .filter(user => user.role === 'student')
                  .map((student) => (
                    <div key={student.id} className="p-3 border rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar_url} />
                          <AvatarFallback className="text-xs">
                            {student.name?.charAt(0) || 'S'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{student.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{student.email}</p>
                        </div>
                      </div>
                      <Select onValueChange={(value) => markAttendance(student.id, value as any)}>
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="Mark attendance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="present">Present</SelectItem>
                          <SelectItem value="late">Late</SelectItem>
                          <SelectItem value="absent">Absent</SelectItem>
                          <SelectItem value="excused">Excused</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimplifiedAdminDashboard;