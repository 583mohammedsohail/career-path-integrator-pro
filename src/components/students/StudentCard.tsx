
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, GraduationCap, Code } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Define Application interface for the component
interface Application {
  id: string;
  job_id: string;
  student_id: string;
  status: string;
  resume_url?: string | null;
  applied_at?: string | null;
  updated_at: string;
}

// Define Student interface directly in this component
interface Student {
  id: string;
  name: string;
  email: string;
  department?: string;
  year?: string | number;
  course?: string;
  cgpa?: string | number;
  skills?: string[];
  avatar_url?: string;
  avatar?: string; // For mock students
  user_metadata?: any;
  applications?: Application[];
  role?: string;
  rollNumber?: string;
}

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={student.avatar_url} alt={student.name} />
            <AvatarFallback>{student.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{student.name}</h3>
            <p className="text-sm text-muted-foreground">
              {student.department || 'Computer Science'}
              {student.course && `, ${student.course}`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <GraduationCap className="h-4 w-4" />
            <span>Year {student.year || '2025'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>CGPA: {student.cgpa || '8.5'}</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Code className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Skills</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(student.skills || ['Programming', 'Problem Solving']).slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="secondary" className="font-normal">
                {skill}
              </Badge>
            ))}
            {(student.skills?.length || 0) > 4 && (
              <Badge variant="outline" className="font-normal">
                +{student.skills!.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <Badge variant={
              student.applications && student.applications.some((app) => app.status === 'selected') 
                ? 'default' 
                : 'outline'
            }>
              {student.applications && student.applications.some((app) => app.status === 'selected') 
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
