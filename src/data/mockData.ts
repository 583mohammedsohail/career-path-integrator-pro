import { 
  Student, 
  Company, 
  Admin, 
  Management,
  SuperAdmin,
  Job, 
  JobApplication, 
  PlacementStats,
  Notification
} from '../types';

// Generate mock students
export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@college.edu',
    avatar_url: 'https://i.pravatar.cc/150?img=1',
    roll_number: 'CS2021001',
    department: 'Computer Science',
    course: 'B.Tech',
    year: 4,
    cgpa: 9.2,
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    resume_url: '/resumes/alex-johnson.pdf'
  },
  {
    id: '2',
    name: 'Sarah Williams',
    email: 'sarah.williams@college.edu',
    avatar_url: 'https://i.pravatar.cc/150?img=5',
    roll_number: 'CS2021002',
    department: 'Computer Science',
    course: 'B.Tech',
    year: 4,
    cgpa: 8.5,
    skills: ['Python', 'Data Science', 'Machine Learning', 'SQL'],
    resume_url: '/resumes/sarah-williams.pdf'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@college.edu',
    avatar_url: 'https://i.pravatar.cc/150?img=8',
    roll_number: 'EE2021003',
    department: 'Electrical Engineering',
    course: 'B.Tech',
    year: 4,
    cgpa: 8.8,
    skills: ['Circuit Design', 'VLSI', 'Embedded Systems', 'C++'],
    resume_url: '/resumes/michael-brown.pdf'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@college.edu',
    avatar_url: 'https://i.pravatar.cc/150?img=9',
    roll_number: 'ME2021004',
    department: 'Mechanical Engineering',
    course: 'B.Tech',
    year: 4,
    cgpa: 8.3,
    skills: ['CAD', 'Thermal Engineering', 'Fluid Mechanics', 'AutoCAD'],
    resume_url: '/resumes/emily-davis.pdf'
  }
];

// Generate mock companies
export const mockCompanies: Company[] = [
  {
    id: '1',
    company_name: 'Tata Consultancy Services',
    email: 'hr@tcs.com',
    avatar_url: 'https://logo.clearbit.com/tcs.com',
    description: "TCS is a global leader in IT services, consulting, and business solutions.",
    website: 'https://www.tcs.com',
    location: 'Mumbai, Maharashtra',
    industry: 'Information Technology'
  },
  {
    id: '2',
    company_name: 'Infosys',
    email: 'hr@infosys.com',
    avatar_url: 'https://logo.clearbit.com/infosys.com',
    description: "Infosys is a global leader in next-generation digital services and consulting.",
    website: 'https://www.infosys.com',
    location: 'Bangalore, Karnataka',
    industry: 'Information Technology'
  }
];

// Generate mock admins
export const mockAdmins: Admin[] = [
  {
    id: '1',
    name: 'Prof. Robert Clark',
    email: 'robert.clark@college.edu',
    role: 'admin',
    avatar_url: 'https://i.pravatar.cc/150?img=12',
    department: 'Computer Science'
  },
  {
    id: '2',
    name: 'Dr. Jennifer Lee',
    email: 'jennifer.lee@college.edu',
    role: 'admin',
    avatar_url: 'https://i.pravatar.cc/150?img=10',
    department: 'College Administration'
  }
];

// Generate mock management users
export const mockManagement: Management[] = [
  {
    id: '1',
    name: 'David Morgan',
    email: 'david.morgan@college.edu',
    role: 'management',
    avatar_url: 'https://i.pravatar.cc/150?img=15',
    department: 'College Management'
  },
  {
    id: '2',
    name: 'Laura Chen',
    email: 'laura.chen@college.edu',
    role: 'management',
    avatar_url: 'https://i.pravatar.cc/150?img=16',
    department: 'Finance Department'
  }
];

// Generate mock superadmin
export const mockSuperAdmin: SuperAdmin = {
  id: '1',
  name: 'System Administrator',
  email: 'sysadmin@college.edu',
  role: 'superadmin',
  avatar_url: 'https://i.pravatar.cc/150?img=20'
};

// Generate mock jobs
export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Software Engineer',
    company_id: '1',
    description: 'We are looking for a talented Software Engineer to join our team.',
    requirements: ['B.Tech/M.Tech in Computer Science', 'Proficiency in Java, Spring Boot'],
    location: 'Mumbai, Maharashtra',
    salary: '₹8,00,000 - ₹12,00,000 per annum',
    positions: 5,
    deadline: '2024-06-15',
    status: 'active',
    created_at: '2024-05-01'
  }
];

// Generate mock notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    user_id: '1',
    message: 'You have been shortlisted for TCS interview.',
    is_read: false,
    created_at: '2024-05-10T09:30:00'
  }
];

// Generate mock placement stats
export const mockPlacementStats: PlacementStats = {
  totalStudents: 120,
  placedStudents: 88,
  placementPercentage: 73.33,
  averagePackage: '₹8.5 LPA',
  highestPackage: '₹24 LPA'
};