
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TrendingUp } from 'lucide-react';
import { mockStudents } from '@/data/mockData';

const StudentPerformance = () => {
  // Get top performing students (by CGPA)
  const topStudents = mockStudents
    .sort((a, b) => b.cgpa - a.cgpa)
    .slice(0, 5);

  const averageCGPA = mockStudents.reduce((sum, student) => sum + student.cgpa, 0) / mockStudents.length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Top Performing Students</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topStudents.map((student) => (
            <div key={student.id} className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={student.avatar_url} alt={student.name} />
                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{student.name}</p>
                <div className="flex items-center space-x-2">
                  <p className="text-xs text-muted-foreground">{student.department}</p>
                  <Badge variant="secondary" className="text-xs">
                    Year {student.year}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={(student.cgpa / 10) * 100} className="flex-1 h-2" />
                  <span className="text-xs font-medium">{student.cgpa.toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {topStudents.length === 0 && (
          <p className="text-sm text-muted-foreground">No student data available</p>
        )}
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Average CGPA</span>
            <span className="text-sm font-medium">{averageCGPA.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentPerformance;
