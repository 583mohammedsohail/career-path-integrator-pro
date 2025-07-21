import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const AttendanceMarker = () => {
  const { currentUser } = useAuth();
  const [isMarking, setIsMarking] = useState(false);
  const [todayStatus, setTodayStatus] = useState<string | null>(null);

  const markAttendance = async (status: string) => {
    if (!currentUser || currentUser.role !== 'student') {
      toast.error('Only students can mark attendance');
      return;
    }

    setIsMarking(true);
    try {
      const { error } = await supabase.rpc('mark_student_attendance', {
        _student_id: currentUser.id,
        _status: status
      });

      if (error) throw error;

      setTodayStatus(status);
      toast.success(`Attendance marked as ${status.charAt(0).toUpperCase() + status.slice(1)}`);
    } catch (error: any) {
      console.error('Error marking attendance:', error);
      toast.error('Failed to mark attendance: ' + error.message);
    } finally {
      setIsMarking(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-500';
      case 'late': return 'bg-yellow-500';
      case 'absent': return 'bg-red-500';
      case 'excused': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  if (!currentUser || currentUser.role !== 'student') {
    return null;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Mark Today's Attendance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {new Date().toLocaleDateString()} - {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          Campus Location
        </div>

        {todayStatus && (
          <div className="flex items-center gap-2">
            <span className="text-sm">Today's Status:</span>
            <Badge className={`${getStatusColor(todayStatus)} text-white`}>
              {todayStatus.charAt(0).toUpperCase() + todayStatus.slice(1)}
            </Badge>
          </div>
        )}

        <Select onValueChange={markAttendance} disabled={isMarking}>
          <SelectTrigger>
            <SelectValue placeholder={isMarking ? "Marking..." : "Select your status"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="present">Present</SelectItem>
            <SelectItem value="late">Late</SelectItem>
            <SelectItem value="absent">Absent</SelectItem>
            <SelectItem value="excused">Excused</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default AttendanceMarker;