
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { 
  GraduationCap, 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  FileText, 
  Bell
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

import AttendanceMarker from '@/components/student/AttendanceMarker';
import PlacementStatsCard from '@/components/dashboard/PlacementStatsCard';

interface DashboardStats {
  applicationsCount: number;
  upcomingDrives: number;
  placementRate: number;
  cgpa: number;
}

interface RecentActivity {
  id: string;
  type: 'application' | 'campus_drive' | 'notification';
  title: string;
  description: string;
  date: string | null;
  status?: string | null;
}

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    applicationsCount: 0,
    upcomingDrives: 0,
    placementRate: 0,
    cgpa: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      fetchDashboardData();
    }
  }, [currentUser]);

  const fetchDashboardData = async () => {
    if (!currentUser) return;
    try {
      // Fetch student applications
      const { count: applicationsCount } = await supabase
        .from('job_applications')
        .select('*', { count: 'exact', head: true })
        .eq('student_id', currentUser?.id);

      // Fetch upcoming campus drives
      const { count: upcomingDrives } = await supabase
        .from('campus_drives')
        .select('*', { count: 'exact', head: true })
        .gte('date', new Date().toISOString());

      // Fetch student profile for CGPA
      const { data: studentData } = await supabase
        .from('students')
        .select('cgpa')
        .eq('id', currentUser.id)
        .single();

      setStats({
        applicationsCount: applicationsCount || 0,
        upcomingDrives: upcomingDrives || 0,
        placementRate: 75, // Mock data
        cgpa: Number(studentData?.cgpa) || 0
      });

      // Fetch recent activity
      const { data: applications } = await supabase
        .from('job_applications')
        .select(`
          id,
          applied_at,
          status,
          jobs (title, company_id)
        `)
        .eq('student_id', currentUser.id)
        .order('applied_at', { ascending: false })
        .limit(5);

      const activity: RecentActivity[] = applications?.map((app: any) => ({
        id: app.id,
        type: 'application' as const,
        title: `Applied to ${app.jobs?.title || 'Job'}`,
        description: 'Job Application',
        date: app.applied_at,
        status: app.status
      })) || [];

      setRecentActivity(activity);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-md w-3/4 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded-md mb-6"></div>
            <div className="h-64 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!currentUser || currentUser.role !== 'student') {
    navigate('/');
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {currentUser.name || 'Student'}!
          </h1>
          <p className="text-gray-600">
            Track your placement progress and stay updated with opportunities.
          </p>
        </div>

        <div className="mb-8">
          <PlacementStatsCard />
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.applicationsCount}</div>
              <p className="text-xs text-muted-foreground">
                Total job applications
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Campus Drives</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.upcomingDrives}</div>
              <p className="text-xs text-muted-foreground">
                Upcoming this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CGPA</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.cgpa.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Current academic performance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.placementRate}%</div>
              <p className="text-xs text-muted-foreground">
                Department average
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Attendance Marker */}
          <div className="lg:col-span-1">
            <AttendanceMarker />
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.length > 0 ? (
                    recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                        <div className="flex-shrink-0">
                          {activity.type === 'application' && (
                            <Briefcase className="h-5 w-5 text-blue-500" />
                          )}
                          {activity.type === 'campus_drive' && (
                            <Calendar className="h-5 w-5 text-green-500" />
                          )}
                          {activity.type === 'notification' && (
                            <Bell className="h-5 w-5 text-yellow-500" />
                          )}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium">{activity.title}</h4>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-muted-foreground">
                              {activity.date ? new Date(activity.date).toLocaleDateString() : ''}
                            </span>
                            {activity.status && (
                              <Badge variant="outline" className="text-xs">
                                {activity.status}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No recent activity to display</p>
                      <p className="text-sm">Start by applying for jobs or registering for campus drives</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  onClick={() => navigate('/jobs')} 
                  className="flex items-center gap-2"
                >
                  <Briefcase className="h-4 w-4" />
                  Browse Jobs
                </Button>
                <Button 
                  onClick={() => navigate('/campus-recruitment')} 
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Campus Drives
                </Button>
                <Button 
                  onClick={() => navigate('/profile')} 
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <GraduationCap className="h-4 w-4" />
                  Update Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
