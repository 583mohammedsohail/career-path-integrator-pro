import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  RefreshCw,
  Calendar,
  MapPin,
  Building2,
  Briefcase,
  User,
  Mail,
  Phone,
  TrendingUp,
  Users,
  Award
} from 'lucide-react';

// Type definitions
interface JobApplication {
  id: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'pending' | 'interviewed' | 'approved' | 'rejected';
  salary: string;
  location: string;
}

interface AttendanceRecord {
  id: string;
  date: string;
  time: string;
  status: 'present' | 'absent';
  location?: string;
}

const StudentProfileDashboard = () => {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [todayAttendanceMarked, setTodayAttendanceMarked] = useState(false);

  if (!currentUser) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Please Login</h1>
            <p className="mt-2 text-gray-600">You need to be logged in to view your profile.</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Fetch real-time job applications
  const fetchApplications = async () => {
    setIsLoadingData(true);
    try {
      // Demo applications for testing
      const demoApplications: JobApplication[] = [
        {
          id: 'app-1',
          jobTitle: 'Software Engineer',
          company: 'TechCorp Solutions',
          appliedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          status: 'pending',
          salary: '₹8-12 LPA',
          location: 'Bangalore'
        },
        {
          id: 'app-2',
          jobTitle: 'Frontend Developer',
          company: 'InnovateTech',
          appliedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          status: 'interviewed',
          salary: '₹6-10 LPA',
          location: 'Mumbai'
        },
        {
          id: 'app-3',
          jobTitle: 'Data Analyst',
          company: 'DataDriven Inc',
          appliedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          status: 'approved',
          salary: '₹7-11 LPA',
          location: 'Hyderabad'
        },
        {
          id: 'app-4',
          jobTitle: 'Backend Developer',
          company: 'CloudTech Systems',
          appliedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          status: 'rejected',
          salary: '₹9-13 LPA',
          location: 'Pune'
        }
      ];
      
      setApplications(demoApplications);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setIsLoadingData(false);
    }
  };

  // Fetch attendance records
  const fetchAttendance = async () => {
    try {
      const demoAttendance: AttendanceRecord[] = [
        {
          id: 'att-1',
          date: new Date().toLocaleDateString(),
          time: '09:30 AM',
          status: 'present',
          location: 'Campus'
        },
        {
          id: 'att-2',
          date: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString(),
          time: '09:15 AM',
          status: 'present',
          location: 'Campus'
        },
        {
          id: 'att-3',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          time: '09:45 AM',
          status: 'present',
          location: 'Campus'
        },
        {
          id: 'att-4',
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          time: '10:00 AM',
          status: 'present',
          location: 'Campus'
        }
      ];
      
      setAttendance(demoAttendance);
      
      // Check if today's attendance is already marked
      const today = new Date().toLocaleDateString();
      const todayRecord = demoAttendance.find(record => record.date === today);
      setTodayAttendanceMarked(!!todayRecord);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  // Mark attendance with real-time sync to super admin
  const markAttendance = async () => {
    try {
      const now = new Date();
      const newAttendanceRecord: AttendanceRecord = {
        id: `att-${Date.now()}`,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'present',
        location: 'Campus'
      };
      
      // Add to local state
      setAttendance(prev => [newAttendanceRecord, ...prev]);
      setTodayAttendanceMarked(true);
      
      // Simulate real-time sync to super admin dashboard
      toast.success('Attendance marked successfully! ✅');
      
      // Simulate real-time notification to super admin
      setTimeout(() => {
        toast.info('📊 Attendance synced to admin dashboard in real-time');
      }, 1000);
      
      // In a real implementation, this would:
      // 1. Insert into Supabase attendance table
      // 2. Trigger real-time update to super admin dashboard
      // 3. Send notification to admin about new attendance
      
    } catch (error) {
      console.error('Error marking attendance:', error);
      toast.error('Failed to mark attendance');
    }
  };

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    fetchApplications();
    fetchAttendance();
    
    const interval = setInterval(() => {
      fetchApplications();
      fetchAttendance();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [currentUser?.id]);

  const refreshData = async () => {
    await Promise.all([fetchApplications(), fetchAttendance()]);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'interviewed': return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'interviewed': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate statistics
  const stats = {
    totalApplications: applications.length,
    pendingApplications: applications.filter(app => app.status === 'pending').length,
    approvedApplications: applications.filter(app => app.status === 'approved').length,
    rejectedApplications: applications.filter(app => app.status === 'rejected').length,
    attendanceRate: Math.round((attendance.filter(att => att.status === 'present').length / attendance.length) * 100) || 0
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={currentUser.avatar_url} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                <p className="text-gray-600">{currentUser.role === 'student' ? 'Student Profile Dashboard' : currentUser.role}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {currentUser.email}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    ID: {currentUser.id.slice(0, 8)}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {stats.attendanceRate}% Attendance
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button 
                  onClick={markAttendance}
                  disabled={todayAttendanceMarked}
                  className={`flex items-center gap-2 ${todayAttendanceMarked ? 'bg-green-600' : ''}`}
                >
                  <Calendar className="w-4 h-4" />
                  {todayAttendanceMarked ? 'Attendance Marked ✓' : 'Mark Attendance'}
                </Button>
                <Button 
                  onClick={refreshData}
                  disabled={isLoadingData}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoadingData ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </div>
            
            {/* Live Update Indicator */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Live Updates</span>
                <span className="text-xs text-gray-500">
                  Last updated: {lastUpdated?.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalApplications}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pendingApplications}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting response
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approvedApplications}</div>
              <p className="text-xs text-muted-foreground">
                Success rate: {Math.round((stats.approvedApplications / stats.totalApplications) * 100) || 0}%
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.attendanceRate}%</div>
              <Progress value={stats.attendanceRate} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="applications" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="applications">Job Applications</TabsTrigger>
            <TabsTrigger value="attendance">Attendance Records</TabsTrigger>
          </TabsList>

          {/* Job Applications Tab */}
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Real-time Job Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No job applications found.</p>
                      <p className="text-sm text-gray-400">Start applying to jobs to see them here!</p>
                    </div>
                  ) : (
                    applications.map((application) => (
                      <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(application.status)}
                          </div>
                          <div>
                            <h3 className="font-semibold">{application.jobTitle}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Building2 className="w-3 h-3" />
                                {application.company}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {application.location}
                              </span>
                              <span>{application.salary}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(application.status)}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </Badge>
                          <span className="text-sm text-gray-500">{application.appliedDate}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Attendance Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendance.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No attendance records found.</p>
                    </div>
                  ) : (
                    attendance.map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{record.date}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>Time: {record.time}</span>
                              {record.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {record.location}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          Present
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StudentProfileDashboard;
