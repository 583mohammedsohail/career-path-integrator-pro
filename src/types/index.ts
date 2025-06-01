
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'company' | 'admin' | 'management' | 'superadmin';
  avatar?: string;
  department?: string;
  course?: string;
  year?: number;
  cgpa?: number;
  skills?: string[];
  phone?: string;
  address?: string;
  university?: string;
  company_name?: string;
  industry?: string;
  website?: string;
  description?: string;
  location?: string;
  roll_number?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'internship' | 'contract';
  salary?: string;
  description: string;
  requirements: string[];
  posted_date: string;
  deadline?: string;
  company_id?: string;
  status?: 'active' | 'closed' | 'draft';
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  description: string;
  website?: string;
  logo?: string;
  size?: string;
  founded?: string;
  employees?: string;
  email?: string;
  phone?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  department: string;
  course: string;
  year: number;
  cgpa: number;
  skills: string[];
  avatar?: string;
  resume_url?: string;
  phone?: string;
  address?: string;
  university?: string;
  roll_number?: string;
}

export interface Application {
  id: string;
  student: Student;
  job: Job;
  status: 'pending' | 'approved' | 'rejected' | 'interviewed';
  appliedDate: string;
  resumeUrl?: string;
  coverLetter?: string;
}

export interface SystemActivity {
  id: string;
  action_type: string;
  entity_type: string;
  entity_id?: string;
  user_id?: string;
  details: any;
  created_at: string;
}

export interface CampusDrive {
  id: string;
  title: string;
  company: {
    id: string;
    name: string;
    logo: string;
  };
  location: string;
  date: string;
  registrationDeadline: string;
  positions: number;
  roles: string[];
  eligibility: string;
  salary: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  description: string;
  requirements: string[];
  applicationCount?: number;
  registeredStudents?: string[];
}
