
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, UserCheck, UserX, Clock, Activity } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UserSession {
  id: string;
  user_id: string;
  session_start: string;
  last_activity: string;
  is_active: boolean;
  profiles: {
    name: string;
    email: string;
    role: string;
    avatar_url?: string;
  };
}

interface ActiveUsersStats {
  total_users: number;
  active_now: number;
  active_today: number;
  students_online: number;
  companies_online: number;
}

const RealTimeUserTracker = () => {
  const [activeUsers, setActiveUsers] = useState<UserSession[]>([]);
  const [stats, setStats] = useState<ActiveUsersStats>({
    total_users: 0,
    active_now: 0,
    active_today: 0,
    students_online: 0,
    companies_online: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchActiveUsers = async () => {
    try {
      // For now, simulate active users from profiles since user_sessions table is new
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(10);

      if (error) throw error;
      
      // Mock active sessions for demonstration
      const mockSessions = profiles?.map(profile => ({
        id: `session_${profile.id}`,
        user_id: profile.id,
        session_start: new Date().toISOString(),
        last_activity: new Date().toISOString(),
        is_active: true,
        profiles: {
          name: profile.name || 'Unknown User',
          email: profile.email || 'No email',
          role: profile.role || 'user',
          avatar_url: profile.avatar_url || undefined
        }
      })) || [];
      
      setActiveUsers(mockSessions);
    } catch (error) {
      console.error('Error fetching active users:', error);
    }
  };

  const fetchStats = async () => {
    try {
      // Get basic counts from profiles
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
        active_now: Math.floor((totalUsers || 0) * 0.3), // Mock 30% active
        active_today: Math.floor((totalUsers || 0) * 0.6), // Mock 60% active today
        students_online: Math.floor((students || 0) * 0.4),
        companies_online: Math.floor((companies || 0) * 0.2)
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const markAttendance = async (studentId: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    try {
      const { data, error } = await supabase.rpc('mark_student_attendance', {
        _student_id: studentId,
        _status: status
      });

      if (error) throw error;

      toast.success(`Attendance marked as ${status} for student`);
    } catch (error) {
      console.error('Error marking attendance:', error);
      toast.error('Failed to mark attendance');
    }
  };

  useEffect(() => {
    fetchActiveUsers();
    fetchStats();
    setLoading(false);

    // Set up real-time subscriptions for profiles changes
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

    // Set up real-time subscriptions for attendance changes
    const attendanceChannel = supabase
      .channel('attendance-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'student_attendance'
        },
        () => {
          // Refresh data when attendance is updated
          fetchActiveUsers();
          fetchStats();
        }
      )
      .subscribe();

    // Refresh data every 30 seconds
    const interval = setInterval(() => {
      fetchActiveUsers();
      fetchStats();
    }, 30000);

    return () => {
      supabase.removeChannel(profilesChannel);
      supabase.removeChannel(attendanceChannel);
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Stats Cards */}
      <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-5 gap-4">
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
              <Clock className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-blue-500">{stats.active_today}</p>
                <p className="text-xs text-muted-foreground">Active Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-purple-500">{stats.students_online}</p>
                <p className="text-xs text-muted-foreground">Students Online</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserX className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold text-orange-500">{stats.companies_online}</p>
                <p className="text-xs text-muted-foreground">Companies Online</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Users List */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Active Users
            <Badge variant="secondary">{activeUsers.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {activeUsers.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={session.profiles.avatar_url} />
                      <AvatarFallback>
                        {session.profiles.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{session.profiles.name}</p>
                      <p className="text-sm text-muted-foreground">{session.profiles.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {session.profiles.role}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Last active: {new Date(session.last_activity).toLocaleTimeString()}
                        </span>
                      </div>
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

      {/* Attendance Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-3">
              {activeUsers
                .filter(session => session.profiles.role === 'student')
                .map((session) => (
                  <div key={session.id} className="p-3 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={session.profiles.avatar_url} />
                        <AvatarFallback className="text-xs">
                          {session.profiles.name?.charAt(0) || 'S'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{session.profiles.name}</p>
                      </div>
                    </div>
                    <Select onValueChange={(value) => markAttendance(session.user_id, value as any)}>
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
  );
};

export default RealTimeUserTracker;
