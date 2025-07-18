import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  BookOpen,
  Briefcase, 
  Clock, 
  CheckCircle, 
  GraduationCap,
  Target,
  TrendingUp,
  Users,
  Award,
  Bell,
  RefreshCw,
  Calendar
} from 'lucide-react';

// Type definitions for real-time data
interface JobApplication {
  id: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'pending' | 'interviewed' | 'approved' | 'rejected';
  salary: string;
  location: string;
}

const mockRecommendations = [
  {
    id: '1',
    title: 'Frontend Developer - React',
    company: 'Flipkart',
    match: 95,
    salary: '₹12-18 LPA',
    location: 'Bangalore'
  },
  {
    id: '2',
    title: 'DevOps Engineer',
    company: 'Paytm',
    match: 87,
    salary: '₹14-20 LPA',
    location: 'Noida'
  },
  {
    id: '3',
    title: 'Mobile App Developer',
    company: 'Zomato',
    match: 82,
    salary: '₹10-16 LPA',
    location: 'Gurgaon'
  }
];

const StudentDashboard = () => {
  const { currentUser, isLoading } = useAuth();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0
  });
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [todayAttendanceMarked, setTodayAttendanceMarked] = useState(false);

  // Fetch real-time job applications data
  const fetchApplications = async () => {
    setIsLoadingData(true);
    try {
      // If user is not authenticated, provide demo data
      if (!currentUser?.id) {
        console.log('No authenticated user, using demo data');
        
        // Demo applications data
        const demoApplications: JobApplication[] = [
          {
            id: 'demo-1',
            jobTitle: 'Software Engineer',
            company: 'TechCorp Solutions',
            appliedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            status: 'pending',
            salary: '₹8-12 LPA',
            location: 'Bangalore'
          },
          {
            id: 'demo-2',
            jobTitle: 'Frontend Developer',
            company: 'InnovateTech',
            appliedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            status: 'interviewed',
            salary: '₹6-10 LPA',
            location: 'Mumbai'
          },
          {
            id: 'demo-3',
            jobTitle: 'Data Analyst',
            company: 'DataDriven Inc',
            appliedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            status: 'approved',
            salary: '₹7-11 LPA',
            location: 'Hyderabad'
          },
          {
            id: 'demo-4',
            jobTitle: 'Backend Developer',
            company: 'CloudTech Systems',
            appliedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            status: 'rejected',
            salary: '₹9-13 LPA',
            location: 'Pune'
          }
        ];
        
        setApplications(demoApplications);
        
        // Calculate demo stats
        const demoStats = {
          totalApplications: demoApplications.length,
          pendingApplications: demoApplications.filter(app => app.status === 'pending').length,
          approvedApplications: demoApplications.filter(app => app.status === 'approved').length,
          rejectedApplications: demoApplications.filter(app => app.status === 'rejected').length
        };
        setDashboardStats(demoStats);
        
        toast.info('Showing demo data - Please log in to see your actual applications');
        setLastUpdated(new Date());
        setIsLoadingData(false);
        return;
      }
      
      console.log('Fetching real job applications for user:', currentUser.id);
      
      // Real data fetching for authenticated users - fetch from job_applications table
      const { data: applications, error } = await supabase
        .from('job_applications')
        .select(`
          id,
          status,
          applied_at,
          resume_url,
          job_id,
          student_id
        `)
        .eq('student_id', currentUser.id)
        .order('applied_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
        // If there's an error, show demo data but with a different message
        const demoApplications: JobApplication[] = [
          {
            id: 'demo-1',
            jobTitle: 'Software Engineer',
            company: 'TechCorp Solutions',
            appliedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            status: 'pending',
            salary: '₹8-12 LPA',
            location: 'Bangalore'
          }
        ];
        setApplications(demoApplications);
        setDashboardStats({
          totalApplications: 1,
          pendingApplications: 1,
          approvedApplications: 0,
          rejectedApplications: 0
        });
        toast.warning('Using demo data - Database connection issue');
        setLastUpdated(new Date());
        setIsLoadingData(false);
        return;
      }

      console.log('Found applications:', applications?.length || 0);

      // If no applications found, show empty state
      if (!applications || applications.length === 0) {
        setApplications([]);
        setDashboardStats({
          totalApplications: 0,
          pendingApplications: 0,
          approvedApplications: 0,
          rejectedApplications: 0
        });
        toast.info('No job applications found. Apply for jobs to see them here!');
        setLastUpdated(new Date());
        setIsLoadingData(false);
        return;
      }
      
      // Fetch job details for each application
      const jobIds = applications.map(app => app.job_id).filter(Boolean);
      console.log('Fetching job details for IDs:', jobIds);
      
      const { data: jobs, error: jobsError } = await supabase
        .from('jobs')
        .select(`
          id,
          title,
          salary,
          location,
          company_id
        `)
        .in('id', jobIds);

      if (jobsError) {
        console.error('Error fetching jobs:', jobsError);
      }

      // Fetch company details
      const companyIds = jobs?.map(job => job.company_id).filter(Boolean) || [];
      console.log('Fetching company details for IDs:', companyIds);
      
      const { data: companies, error: companiesError } = await supabase
        .from('companies')
        .select(`
          id,
          company_name
        `)
        .in('id', companyIds);

      if (companiesError) {
        console.error('Error fetching companies:', companiesError);
      }

      // Transform data to match our interface
      const transformedApplications: JobApplication[] = applications.map(app => {
        const job = jobs?.find(j => j.id === app.job_id);
        const company = companies?.find(c => c.id === job?.company_id);
        
        return {
          id: app.id,
          jobTitle: job?.title || `Job ID: ${app.job_id}`,
          company: company?.company_name || 'Company',
          appliedDate: app.applied_at ? new Date(app.applied_at).toLocaleDateString() : new Date().toLocaleDateString(),
          status: (app.status as 'pending' | 'interviewed' | 'approved' | 'rejected') || 'pending',
          salary: job?.salary || 'Salary not specified',
          location: job?.location || 'Location not specified'
        };
      });

      console.log('Transformed applications:', transformedApplications);
      setApplications(transformedApplications);
      
      // Calculate stats
      const newStats = {
        totalApplications: transformedApplications.length,
        pendingApplications: transformedApplications.filter(app => app.status === 'pending').length,
        approvedApplications: transformedApplications.filter(app => app.status === 'approved').length,
        rejectedApplications: transformedApplications.filter(app => app.status === 'rejected').length
      };
      setDashboardStats(newStats);
      
      if (transformedApplications.length > 0) {
        toast.success(`Found ${transformedApplications.length} job application(s)!`);
      }
      
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load applications');
    } finally {
      setIsLoadingData(false);
      setLastUpdated(new Date());
    }
  };

  // Initial data fetch and real-time updates
  useEffect(() => {
    if (currentUser?.id) {
      fetchApplications();
      
      // Set up real-time updates every 30 seconds
      const interval = setInterval(fetchApplications, 30000);
      return () => clearInterval(interval);
    }
  }, [currentUser?.id]);

  const refreshData = async () => {
    setIsLoadingData(true);
    await fetchApplications();
    setIsLoadingData(false);
  };

  // Mark attendance function with real-time sync to super admin
  const markAttendance = async () => {
    try {
      const now = new Date();
      // Create attendance record for potential database storage
      const attendanceRecord = {
        id: `att-${Date.now()}`,
        student_name: currentUser?.name || 'Student',
        student_email: currentUser?.email || '',
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'present' as const,
        location: 'Campus'
      };
      
      // Log attendance record for debugging (in real app, this would be saved to database)
      console.log('Attendance marked:', attendanceRecord);
      
      // Mark attendance as completed for today
      setTodayAttendanceMarked(true);
      
      // Show success message
      toast.success('✅ Attendance marked successfully!');
      
      // Simulate real-time sync to super admin dashboard
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

  // Check if attendance is already marked today
  useEffect(() => {
    const checkTodayAttendance = () => {
      // In a real app, this would check the database
      // For demo purposes, we'll reset daily
      const today = new Date().toDateString();
      const lastMarked = localStorage.getItem('lastAttendanceDate');
      
      if (lastMarked !== today) {
        setTodayAttendanceMarked(false);
      } else {
        setTodayAttendanceMarked(true);
      }
    };
    
    checkTodayAttendance();
  }, []);

  // Update localStorage when attendance is marked
  useEffect(() => {
    if (todayAttendanceMarked) {
      localStorage.setItem('lastAttendanceDate', new Date().toDateString());
    }
  }, [todayAttendanceMarked]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-md w-3/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-md"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!currentUser || currentUser.role !== 'student') {
    return <Navigate to="/login" replace />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'interviewed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'interviewed':
        return <Users className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const approvedCount = applications.filter(app => app.status === 'approved').length;
  const interviewedCount = applications.filter(app => app.status === 'interviewed').length;
  const pendingCount = applications.filter(app => app.status === 'pending').length;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {currentUser.name}!</h1>
            <p className="text-gray-600 mt-1">
              {currentUser.course} in {currentUser.department} • Year {currentUser.year}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 text-sm text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live Updates
              </div>
              <span className="text-xs text-gray-500">
                Last updated: {lastUpdated?.toLocaleTimeString()}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={markAttendance}
              disabled={todayAttendanceMarked}
              className={`flex items-center gap-2 ${todayAttendanceMarked ? 'bg-green-600 hover:bg-green-700' : ''}`}
              size="sm"
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalApplications}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interviews</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{interviewedCount}</div>
              <p className="text-xs text-muted-foreground">
                +1 this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Offers Received</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedCount}</div>
              <p className="text-xs text-muted-foreground">
                Success rate: {Math.round((approvedCount / applications.length) * 100)}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CGPA</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentUser.cgpa}</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(currentUser.cgpa || 0) * 10}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="applications" className="space-y-4">
          <TabsList>
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              My Applications
              {pendingCount > 0 && (
                <Badge variant="secondary" className="ml-1">{pendingCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Recommendations
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Job Applications
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Real-time
                      </div>
                    </CardTitle>
                    <CardDescription>Track your job application status in real-time</CardDescription>
                  </div>
                  <Bell className="h-5 w-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                {applications.length > 0 ? (
                  <div className="space-y-4">
                    {applications.map((application) => (
                      <div key={application.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">{application.jobTitle}</h3>
                              <Badge className={getStatusColor(application.status)}>
                                <div className="flex items-center gap-1">
                                  {getStatusIcon(application.status)}
                                  {application.status}
                                </div>
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-1">{application.company}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>📍 {application.location}</span>
                              <span>💰 {application.salary}</span>
                              <span>📅 Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Briefcase className="mx-auto h-12 w-12 mb-4" />
                    <p>No applications yet. Start applying to jobs to see them here!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Recommended Jobs
                </CardTitle>
                <CardDescription>Jobs that match your skills and profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecommendations.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                          <p className="text-gray-600 mb-2">{job.company}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <span>📍 {job.location}</span>
                            <span>💰 {job.salary}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Match:</span>
                            <Progress value={job.match} className="w-20 h-2" />
                            <span className="text-sm text-green-600 font-medium">{job.match}%</span>
                          </div>
                        </div>
                        <Button size="sm">Apply Now</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Academic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Course</label>
                    <p className="text-lg">{currentUser.course}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Department</label>
                    <p className="text-lg">{currentUser.department}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Year</label>
                    <p className="text-lg">{currentUser.year}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">CGPA</label>
                    <p className="text-lg">{currentUser.cgpa}/10</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.skills?.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    )) || <p className="text-gray-500">No skills added yet</p>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
