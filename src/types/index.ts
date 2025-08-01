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
  profile_pic?: string;
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
  totalApplications: number;
  totalJobs: number;
  totalPlacements: number;
  averageSalary: string;
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
  department: string;
  profile_pic?: string;
}

export interface Management {
  id: string;
  name: string;
  email: string;
  role: 'management';
  department: string;
  profile_pic?: string;
}

export interface SuperAdmin {
  id: string;
  name: string;
  email: string;
  role: 'superadmin';
  profile_pic?: string;
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
  name?: string;
  company_name?: string;
  logo?: string;
  logo_url?: string;
  avatar_url?: string;
  location?: string;
  size?: string;
  description?: string;
  email?: string;
  website?: string;
  industry?: string;
  open_positions?: number;
  requirements?: string[];
  employee_count?: number;
  founded_year?: number;
  headquarters?: string;
  revenue?: string;
  tech_stack?: string[];
  company_type?: string;
  key_products?: string[];
}

export interface Student {
  id: string;
  name: string;
  email: string;
  profile_pic?: string;
  avatar_url?: string;
  avatar?: string;
  university?: string;
  degree?: string;
  graduation_year?: string;
  skills?: string[];
  location?: string;
  roll_number?: string;
  department?: string;
  course?: string;
  year?: number;
  cgpa?: number;
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
  details: Record<string, unknown>;
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
