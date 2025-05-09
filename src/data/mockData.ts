
import { 
  Student, 
  Company, 
  Admin, 
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
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rollNumber: 'CS2021001',
    department: 'Computer Science',
    course: 'B.Tech',
    year: 4,
    cgpa: 9.2,
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    resumeUrl: '/resumes/alex-johnson.pdf',
    applications: []
  },
  {
    id: '2',
    name: 'Sarah Williams',
    email: 'sarah.williams@college.edu',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rollNumber: 'CS2021002',
    department: 'Computer Science',
    course: 'B.Tech',
    year: 4,
    cgpa: 8.5,
    skills: ['Python', 'Data Science', 'Machine Learning', 'SQL'],
    resumeUrl: '/resumes/sarah-williams.pdf',
    applications: []
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@college.edu',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?img=8',
    rollNumber: 'EE2021003',
    department: 'Electrical Engineering',
    course: 'B.Tech',
    year: 4,
    cgpa: 8.8,
    skills: ['Circuit Design', 'VLSI', 'Embedded Systems', 'C++'],
    resumeUrl: '/resumes/michael-brown.pdf',
    applications: []
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@college.edu',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?img=9',
    rollNumber: 'ME2021004',
    department: 'Mechanical Engineering',
    course: 'B.Tech',
    year: 4,
    cgpa: 8.3,
    skills: ['CAD', 'Thermal Engineering', 'Fluid Mechanics', 'AutoCAD'],
    resumeUrl: '/resumes/emily-davis.pdf',
    applications: []
  }
];

// Generate mock companies
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'HR Manager',
    email: 'hr@techcorp.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/microsoft.com',
    companyName: 'TechCorp Solutions',
    description: 'A leading technology company specializing in software development and cloud solutions.',
    website: 'https://www.techcorp.com',
    location: 'San Francisco, CA',
    industry: 'Information Technology',
    postedJobs: []
  },
  {
    id: '2',
    name: 'HR Manager',
    email: 'hr@datacorp.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/google.com',
    companyName: 'DataCorp Analytics',
    description: 'Specializing in big data analytics and machine learning solutions for businesses.',
    website: 'https://www.datacorp.com',
    location: 'New York, NY',
    industry: 'Data Analytics',
    postedJobs: []
  },
  {
    id: '3',
    name: 'HR Manager',
    email: 'hr@innovatech.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/apple.com',
    companyName: 'InnovaTech',
    description: 'An innovative company focused on creating cutting-edge technology products.',
    website: 'https://www.innovatech.com',
    location: 'Seattle, WA',
    industry: 'Technology',
    postedJobs: []
  },
  {
    id: '4',
    name: 'HR Manager',
    email: 'hr@fintech.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/paypal.com',
    companyName: 'FinTech Solutions',
    description: 'A financial technology company providing solutions for digital banking and payments.',
    website: 'https://www.fintech.com',
    location: 'Boston, MA',
    industry: 'Financial Technology',
    postedJobs: []
  }
];

// Generate mock admins
export const mockAdmins: Admin[] = [
  {
    id: '1',
    name: 'Prof. Robert Clark',
    email: 'robert.clark@college.edu',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=12',
    department: 'Computer Science',
    position: 'Placement Coordinator'
  },
  {
    id: '2',
    name: 'Dr. Jennifer Lee',
    email: 'jennifer.lee@college.edu',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=10',
    department: 'College Administration',
    position: 'Dean of Placements'
  }
];

// Generate mock jobs
export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Software Engineer',
    company: mockCompanies[0],
    description: 'We are looking for a talented Software Engineer to join our team to develop high-quality web applications.',
    requirements: [
      'B.Tech/M.Tech in Computer Science or related field',
      'Proficiency in JavaScript, React, and Node.js',
      'Minimum CGPA of 8.0',
      'Good problem-solving skills'
    ],
    location: 'San Francisco, CA (Remote)',
    salary: '$90,000 - $120,000',
    positions: 3,
    deadline: '2025-06-15',
    status: 'open',
    createdAt: '2025-05-01',
    applications: []
  },
  {
    id: '2',
    title: 'Data Scientist',
    company: mockCompanies[1],
    description: 'We are seeking a Data Scientist to analyze complex data and provide insights for business decision-making.',
    requirements: [
      'B.Tech/M.Tech in Computer Science, Statistics, or Mathematics',
      'Experience with Python, R, and SQL',
      'Knowledge of machine learning algorithms',
      'Minimum CGPA of 8.5'
    ],
    location: 'New York, NY',
    salary: '$100,000 - $130,000',
    positions: 2,
    deadline: '2025-06-20',
    status: 'open',
    createdAt: '2025-05-03',
    applications: []
  },
  {
    id: '3',
    title: 'Hardware Engineer',
    company: mockCompanies[2],
    description: 'Looking for a Hardware Engineer to design and develop electronic systems and components.',
    requirements: [
      'B.Tech/M.Tech in Electrical Engineering or Computer Engineering',
      'Experience with circuit design and FPGA',
      'Knowledge of digital and analog circuits',
      'Minimum CGPA of 7.5'
    ],
    location: 'Seattle, WA',
    salary: '$85,000 - $110,000',
    positions: 1,
    deadline: '2025-06-25',
    status: 'open',
    createdAt: '2025-05-05',
    applications: []
  },
  {
    id: '4',
    title: 'Financial Analyst',
    company: mockCompanies[3],
    description: 'We are looking for a Financial Analyst to analyze company finances and provide insights for growth.',
    requirements: [
      'B.Tech in any engineering discipline',
      'Strong analytical skills',
      'Knowledge of financial modeling',
      'Minimum CGPA of 7.0'
    ],
    location: 'Boston, MA',
    salary: '$80,000 - $100,000',
    positions: 2,
    deadline: '2025-06-30',
    status: 'open',
    createdAt: '2025-05-07',
    applications: []
  }
];

// Update company postedJobs
mockCompanies[0].postedJobs = [mockJobs[0]];
mockCompanies[1].postedJobs = [mockJobs[1]];
mockCompanies[2].postedJobs = [mockJobs[2]];
mockCompanies[3].postedJobs = [mockJobs[3]];

// Generate mock job applications
export const mockJobApplications: JobApplication[] = [
  {
    id: '1',
    student: mockStudents[0],
    job: mockJobs[0],
    status: 'pending',
    appliedAt: '2025-05-10',
    resumeUrl: '/resumes/alex-johnson.pdf'
  },
  {
    id: '2',
    student: mockStudents[0],
    job: mockJobs[2],
    status: 'shortlisted',
    appliedAt: '2025-05-11',
    resumeUrl: '/resumes/alex-johnson.pdf'
  },
  {
    id: '3',
    student: mockStudents[1],
    job: mockJobs[1],
    status: 'pending',
    appliedAt: '2025-05-12',
    resumeUrl: '/resumes/sarah-williams.pdf'
  },
  {
    id: '4',
    student: mockStudents[2],
    job: mockJobs[2],
    status: 'selected',
    appliedAt: '2025-05-09',
    resumeUrl: '/resumes/michael-brown.pdf'
  },
  {
    id: '5',
    student: mockStudents[3],
    job: mockJobs[3],
    status: 'rejected',
    appliedAt: '2025-05-08',
    resumeUrl: '/resumes/emily-davis.pdf'
  }
];

// Update student applications
mockStudents[0].applications = [mockJobApplications[0], mockJobApplications[1]];
mockStudents[1].applications = [mockJobApplications[2]];
mockStudents[2].applications = [mockJobApplications[3]];
mockStudents[3].applications = [mockJobApplications[4]];

// Update job applications
mockJobs[0].applications = [mockJobApplications[0]];
mockJobs[1].applications = [mockJobApplications[2]];
mockJobs[2].applications = [mockJobApplications[1], mockJobApplications[3]];
mockJobs[3].applications = [mockJobApplications[4]];

// Generate mock placement stats
export const mockPlacementStats: PlacementStats = {
  totalStudents: 120,
  totalCompanies: 25,
  totalJobs: 42,
  totalApplications: 310,
  totalPlacements: 87,
  averageSalary: 92000
};

// Generate mock notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    user: mockStudents[0],
    message: 'Your application for Software Engineer at TechCorp Solutions has been received.',
    isRead: false,
    createdAt: '2025-05-10T09:30:00'
  },
  {
    id: '2',
    user: mockStudents[0],
    message: 'You have been shortlisted for Hardware Engineer at InnovaTech. Check your email for interview details.',
    isRead: true,
    createdAt: '2025-05-11T14:15:00'
  },
  {
    id: '3',
    user: mockStudents[1],
    message: 'New job posting that matches your skills: Data Scientist at DataCorp Analytics.',
    isRead: false,
    createdAt: '2025-05-03T11:45:00'
  },
  {
    id: '4',
    user: mockCompanies[0],
    message: 'Alex Johnson has applied for the Software Engineer position.',
    isRead: false,
    createdAt: '2025-05-10T09:35:00'
  },
  {
    id: '5',
    user: mockAdmins[0],
    message: 'New company registered: FinTech Solutions. Pending approval.',
    isRead: false,
    createdAt: '2025-05-07T16:20:00'
  }
];

// Export all users combined for auth purposes
export const allUsers = [...mockStudents, ...mockCompanies, ...mockAdmins];
