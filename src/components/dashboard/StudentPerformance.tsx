
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Student } from '@/types';

interface StudentPerformanceProps {
  students: Student[];
}

const StudentPerformance: React.FC<StudentPerformanceProps> = ({ students }) => {
  // Sort students by CGPA
  const topStudents = [...students].sort((a, b) => b.cgpa - a.cgpa);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Students</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topStudents.map(student => (
            <div key={student.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={student.avatar} />
                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-muted-foreground">{student.department}, {student.course}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50">
                  CGPA: {student.cgpa}
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50">
                  {student.applications.filter(a => a.status === 'selected').length} Offers
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentPerformance;
