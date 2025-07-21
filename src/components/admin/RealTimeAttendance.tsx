import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserCheck, Users, Clock, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AttendanceStats {
  total_students: number;
  present_today: number;
  absent_today: number;
  late_today: number;
  attendance_rate: number;
}

interface AttendanceRecord {
  id: string;
  student_id: string;
  student_name: string;
  student_email: string;
  date: string;
  status: string;
  marked_at: string;
}

const RealTimeAttendance = () => {
  const [stats, setStats] = useState<AttendanceStats>({
    total_students: 0,
    present_today: 0,
    absent_today: 0,
    late_today: 0,
    attendance_rate: 0
  });
  const [recentAttendance, setRecentAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAttendanceStats = async () => {
    try {
      // Use any to bypass TypeScript issues until types are regenerated
      const { data, error } = await (supabase as any).rpc('get_attendance_stats');
      if (error) throw error;
      
      if (data && Array.isArray(data) && data.length > 0) {
        setStats(data[0]);
      }
    } catch (error) {
      console.error('Error fetching attendance stats:', error);
    }
  };

  const fetchRecentAttendance = async () => {
    try {
      // Use any to bypass TypeScript issues until types are regenerated
      const { data, error } = await (supabase as any).rpc('get_recent_attendance');
      if (error) throw error;
      
      setRecentAttendance(data || []);
    } catch (error) {
      console.error('Error fetching recent attendance:', error);
    }
  };

  useEffect(() => {
    fetchAttendanceStats();
    fetchRecentAttendance();
    setLoading(false);

    // Set up real-time subscription for attendance changes
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
          fetchAttendanceStats();
          fetchRecentAttendance();
        }
      )
      .subscribe();

    // Refresh data every 30 seconds
    const interval = setInterval(() => {
      fetchAttendanceStats();
      fetchRecentAttendance();
    }, 30000);

    return () => {
      supabase.removeChannel(attendanceChannel);
      clearInterval(interval);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-500 text-white';
      case 'late': return 'bg-yellow-500 text-white';
      case 'absent': return 'bg-red-500 text-white';
      case 'excused': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  if (loading) {
    return <div className="animate-pulse">Loading attendance data...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Attendance Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.total_students}</p>
                <p className="text-xs text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-green-500">{stats.present_today}</p>
                <p className="text-xs text-muted-foreground">Present Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-yellow-500">{stats.late_today}</p>
                <p className="text-xs text-muted-foreground">Late Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-red-500">{stats.absent_today}</p>
                <p className="text-xs text-muted-foreground">Absent Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-blue-500">{stats.attendance_rate}%</p>
                <p className="text-xs text-muted-foreground">Attendance Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Attendance Records */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Attendance Records
            <Badge variant="secondary">{recentAttendance.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {recentAttendance.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>
                        {record.student_name?.charAt(0) || 'S'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{record.student_name}</p>
                      <p className="text-sm text-muted-foreground">{record.student_email}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(record.marked_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(record.status)}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </Badge>
                </div>
              ))}
              {recentAttendance.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No attendance records found
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeAttendance;