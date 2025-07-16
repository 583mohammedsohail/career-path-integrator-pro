
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'company' | 'admin' | 'management' | 'superadmin';
  avatar_url?: string;
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

export interface CampusDriveApplication {
  id: string;
  student_id: string;
  campus_drive_id: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'accepted';
  applied_at: string;
  resume_url?: string;
  cover_letter?: string;
}

export interface JobApplication {
  id: string;
  student_id: string;
  job_id: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'accepted';
  applied_at: string;
  resume_url?: string;
  cover_letter?: string;
  job?: {
    title: string;
    company_name: string;
    location: string;
    salary: string;
  };
}

export interface PlacementStats {
  totalStudents: number;
  placedStudents: number;
  placementPercentage: number;
  averagePackage: string;
  highestPackage: string;
}

export interface Notification {
  id: string;
  user_id: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'admin';
  avatar_url?: string;
  department?: string;
}

export interface Management {
  id: string;
  name: string;
  email: string;
  role: 'management';
  avatar_url?: string;
  department?: string;
}

export interface SuperAdmin {
  id: string;
  name: string;
  email: string;
  role: 'superadmin';
  avatar_url?: string;
}

export interface Job {
  id: string;
  title: string;
  company_id: string;
  location?: string;
  type?: 'full-time' | 'part-time' | 'internship' | 'contract';
  salary?: string;
  description: string;
  requirements: string[];
  created_at: string;
  deadline?: string;
  status?: 'active' | 'closed' | 'draft';
  positions?: number;
}

export interface Company {
  id: string;
  company_name: string;
  industry?: string;
  location?: string;
  description?: string;
  website?: string;
  avatar_url?: string;
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
  avatar_url?: string;
  resume_url?: string;
  phone?: string;
  address?: string;
  university?: string;
  roll_number?: string;
}

export interface Application {
  id: string;
  student_id: string;
  job_id: string;
  status: 'pending' | 'approved' | 'rejected' | 'interviewed';
  applied_at: string;
  resume_url?: string;
  cover_letter?: string;
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
  company_id?: string;
  company_name?: string;
  company_logo?: string;
  location: string;
  date: string;
  registration_deadline?: string;
  registrationDeadline?: string;
  positions: number;
  roles: string[];
  eligibility_criteria?: string;
  eligibility?: string;
  salary: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  description: string;
  requirements: string[];
  application_count?: number;
  applicationCount?: number;
  registered_students?: string[];
  registeredStudents?: string[];
  created_at?: string;
  company?: {
    id: string;
    company_name?: string;
    name?: string;
    avatar_url?: string;
    logo?: string;
  };
}
