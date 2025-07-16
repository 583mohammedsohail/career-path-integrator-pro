import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import StudentCard from '../components/students/StudentCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { mockStudents } from '@/data/mockData';

// Define custom application type to handle both mock and Supabase data
interface ApplicationDisplay {
  id: string;
  job_id: string;
  student_id: string;
  status: string;
  resume_url?: string | null;
  applied_at?: string | null;
  updated_at: string;
}

// Define student type for the component
interface StudentDisplay {
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
  created_at?: string;
  updated_at?: string;
  applications?: ApplicationDisplay[];
  role?: string;
  rollNumber?: string;
}

const Students = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [students, setStudents] = useState<StudentDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState<string[]>(['all']);

  // Fetch students from Supabase and combine with mock data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        
        // First, get all users with 'student' role from auth.users
        const { data: authUsers, error: authError } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'student');
        
        if (authError) {
          throw authError;
        }
        
        // Get job applications for each student
        const { data: applications = [] } = await supabase
          .from('job_applications')
          .select('*');
        
        // Process the student data from Supabase
        const supabaseStudents: StudentDisplay[] = authUsers.map((user: any) => {
          // Find applications for this student and convert to ApplicationDisplay type
          const studentApplications: ApplicationDisplay[] = applications.filter(app => app.student_id === user.id)
            .map(app => ({
              id: app.id,
              job_id: app.job_id,
              student_id: app.student_id,
              status: app.status || 'pending',
              resume_url: app.resume_url,
              applied_at: app.applied_at,
              updated_at: app.updated_at || app.applied_at || new Date().toISOString()
            }));
          
          return {
            id: user.id,
            name: user.name || user.email?.split('@')[0] || 'Student',
            email: user.email,
            department: user.department || 'Computer Science',
            year: user.year || '2025',
            course: user.course || 'B.Tech',
            cgpa: user.cgpa || '8.5',
            skills: user.skills || ['Programming', 'Problem Solving'],
            avatar_url: user.avatar_url,
            user_metadata: user.user_metadata,
            created_at: user.created_at,
            updated_at: user.updated_at,
            applications: studentApplications,
            role: 'student'
          };
        });
        
        // Convert mock students to the right format
        const formattedMockStudents: StudentDisplay[] = mockStudents.map(student => ({
          id: student.id,
          name: student.name,
          email: student.email,
          department: student.university,
          year: student.graduation_year?.toString() || '2025',
          course: student.degree,
          cgpa: '8.5', // Default value since it's not in mock data
          skills: student.skills || [],
          avatar_url: student.profile_pic, // Use profile_pic from mock data
          applications: [],
          user_metadata: {},
          role: 'student',
          roll_number: student.roll_number
        }));
        
        // Combine both sets of students
        const combinedStudents = [...supabaseStudents, ...formattedMockStudents];
        
        setStudents(combinedStudents);
        
        // Extract unique departments for filtering
        const uniqueDepartments = ['all', ...new Set(combinedStudents
          .map(student => student.department)
          .filter(Boolean) as string[])];
        
        setDepartments(uniqueDepartments);
      } catch (error) {
        console.error('Error fetching students:', error);
        toast.error('Failed to load students');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudents();
  }, []);

  // Filter students based on search query and department
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.skills && student.skills.some(skill => 
        skill.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesDepartment = departmentFilter === 'all' || student.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Students</h1>
            <p className="text-gray-600 mt-1">Browse student profiles and talents</p>
          </div>
          <div className="w-full md:w-auto mt-4 md:mt-0">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search students..."
                  className="pl-8 w-full md:w-80"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[220px]">
                  <span className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Filter by department" />
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept === 'all' ? 'All Departments' : dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading students...</span>
          </div>
        ) : filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              No students matching your criteria.
            </p>
            <Button className="mt-4" onClick={() => {
              setSearchQuery('');
              setDepartmentFilter('all');
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Students;
