
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Student } from '@/types';
import { BookOpen, GraduationCap, Code } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={student.avatar} alt={student.name} />
            <AvatarFallback>{student.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{student.name}</h3>
            <p className="text-sm text-muted-foreground">{student.department}, {student.course}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <GraduationCap className="h-4 w-4" />
            <span>Year {student.year}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>CGPA: {student.cgpa}</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Code className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Skills</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {student.skills.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="secondary" className="font-normal">
                {skill}
              </Badge>
            ))}
            {student.skills.length > 4 && (
              <Badge variant="secondary" className="font-normal">
                +{student.skills.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <Badge variant={
              student.applications.some(app => app.status === 'selected') 
                ? 'default' 
                : 'outline'
            }>
              {student.applications.some(app => app.status === 'selected') 
                ? 'Placed' 
                : 'Not Placed'
              }
            </Badge>
          </div>
          <Button asChild>
            <Link to={`/students/${student.id}`}>View Profile</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentCard;
