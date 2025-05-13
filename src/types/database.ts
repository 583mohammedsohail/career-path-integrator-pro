export interface Job {
  id: string;
  title: string;
  company_id: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  deadline: string;
  status: 'open' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  website: string | null;
  location: string | null;
  industry: string | null;
  created_at: string;
  updated_at: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  department: string;
  year: number;
  cgpa: number;
  resume_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: string;
  job_id: string;
  student_id: string;
  status: 'pending' | 'selected' | 'rejected' | 'interviewing';
  resume_url: string | null;
  applied_at: string;
  updated_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface SystemSettings {
  id: string;
  allow_registration: boolean;
  email_notifications: boolean;
  maintenance_mode: boolean;
  auto_approve_companies: boolean;
  max_applications_per_student: number;
  max_jobs_per_company: number;
  application_deadline_buffer: number;
  data_retention_days: number;
  updated_at: string;
} 