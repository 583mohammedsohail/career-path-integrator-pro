export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'company' | 'admin' | 'management' | 'superadmin';
  avatar?: string;
}

export interface Student extends User {
  role: 'student';
  rollNumber: string;
  department: string;
  course: string;
  year: number;
  cgpa: number;
  skills: string[];
  resumeUrl?: string;
  applications: JobApplication[];
}

export interface Company extends User {
  role: 'company';
  companyName: string;
  description: string;
  website: string;
  location: string;
  industry: string;
  postedJobs: Job[];
}

export interface Admin extends User {
  role: 'admin';
  department: string;
  position: string;
}

export interface Management extends User {
  role: 'management';
  department: string;
  position: string;
  managementLevel: 'junior' | 'senior' | 'executive';
}

export interface SuperAdmin extends User {
  role: 'superadmin';
  accessLevel: 'full';
  lastLogin: string;
}

export interface Job {
  id: string;
  title: string;
  company: Company;
  description: string;
  requirements: string[];
  location: string;
  salary: string;
  positions: number;
  deadline: string;
  status: 'open' | 'closed';
  createdAt: string;
  applications: JobApplication[];
}

export interface JobApplication {
  id: string;
  student: Student;
  job: Job;
  status: 'pending' | 'shortlisted' | 'rejected' | 'selected';
  appliedAt: string;
  resumeUrl: string;
}

export interface PlacementStats {
  totalStudents: number;
  totalCompanies: number;
  totalJobs: number;
  totalApplications: number;
  totalPlacements: number;
  averageSalary: number;
  highestSalary: number;
  placementRate: number;
}

export interface Notification {
  id: string;
  user: {
    id: string;
    name: string;
  };
  message: string;
  isRead: boolean;
  createdAt: string;
}
