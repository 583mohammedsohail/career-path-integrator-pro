import {
  User,
  Student,
  Company,
  Job,
  Application,
  SystemActivity,
  PlacementStats,
  Notification,
} from '../types';

// Mock Students Data
export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Rahul Patel',
    email: 'rahul.patel@example.com',
    department: 'Computer Science',
    course: 'B.Tech',
    year: 4,
    cgpa: 8.5,
    skills: ['React', 'Node.js', 'Python', 'MongoDB'],
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    resume_url: '/resumes/rahul-patel.pdf',
    phone: '+91 98765 43210',
    address: '123 Student Hostel, College Campus',
    university: 'ABC Institute of Technology',
    roll_number: 'CSE2021001'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    department: 'Information Technology',
    course: 'B.Tech',
    year: 3,
    cgpa: 9.2,
    skills: ['Java', 'Spring Boot', 'MySQL', 'Angular'],
    avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b192?w=150&h=150&fit=crop&crop=face',
    resume_url: '/resumes/priya-sharma.pdf',
    phone: '+91 87654 32109',
    university: 'ABC Institute of Technology',
    roll_number: 'IT2022001'
  },
  {
    id: '3',
    name: 'Amit Kumar',
    email: 'amit.kumar@example.com',
    department: 'Electronics',
    course: 'B.Tech',
    year: 2,
    cgpa: 7.8,
    skills: ['C++', 'Embedded Systems', 'MATLAB'],
    avatar_url: 'https://images.unsplash.com/photo-1534528741702-a0cfae562c9c?w=150&h=150&fit=crop&crop=face',
    resume_url: '/resumes/amit-kumar.pdf',
    phone: '+91 76543 21098',
    address: '456 New Apartments, City Center',
    university: 'XYZ University',
    roll_number: 'ECE2023001'
  },
  {
    id: '4',
    name: 'Neha Singh',
    email: 'neha.singh@example.com',
    department: 'Mechanical Engineering',
    course: 'B.Tech',
    year: 4,
    cgpa: 8.9,
    skills: ['AutoCAD', 'SolidWorks', 'Thermodynamics'],
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    resume_url: '/resumes/neha-singh.pdf',
    phone: '+91 65432 10987',
    address: '789 Old Quarters, Suburb Area',
    university: 'PQR Engineering College',
    roll_number: 'ME2021001'
  },
  {
    id: '5',
    name: 'Vikram Verma',
    email: 'vikram.verma@example.com',
    department: 'Chemical Engineering',
    course: 'B.Tech',
    year: 3,
    cgpa: 9.5,
    skills: ['Chemical Processes', 'MATLAB', 'Python'],
    avatar_url: 'https://images.unsplash.com/photo-1547425260-76bcbf01fe9b?w=150&h=150&fit=crop&crop=face',
    resume_url: '/resumes/vikram-verma.pdf',
    phone: '+91 54321 09876',
    address: '101 Green Avenue, Residential Area',
    university: 'LMN Institute of Technology',
    roll_number: 'CHE2022001'
  }
];

// Mock Companies Data with real logos
export const mockCompanies: Company[] = [
  {
    id: '1',
    company_name: 'Google',
    name: 'Google',
    industry: 'Technology',
    location: 'Bangalore, India',
    description: 'A multinational technology company that specializes in Internet-related services and products.',
    website: 'https://www.google.com',
    avatar_url: 'https://logo.clearbit.com/google.com',
    logo: 'https://logo.clearbit.com/google.com',
    size: '10000+',
    founded: '1998',
    email: 'hr@google.com'
  },
  {
    id: '2',
    company_name: 'Microsoft',
    name: 'Microsoft',
    industry: 'Technology',
    location: 'Hyderabad, India',
    description: 'A multinational technology corporation that develops, manufactures, licenses, supports, and sells computer software.',
    website: 'https://www.microsoft.com',
    avatar_url: 'https://logo.clearbit.com/microsoft.com',
    logo: 'https://logo.clearbit.com/microsoft.com',
    size: '5000-10000',
    founded: '1975',
    email: 'careers@microsoft.com'
  },
  {
    id: '3',
    company_name: 'Amazon',
    name: 'Amazon',
    industry: 'E-commerce',
    location: 'Seattle, USA',
    description: 'An American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence.',
    website: 'https://www.amazon.com',
    avatar_url: 'https://logo.clearbit.com/amazon.com',
    logo: 'https://logo.clearbit.com/amazon.com',
    size: '10000+',
    founded: '1994',
    email: 'jobs@amazon.com'
  },
  {
    id: '4',
    company_name: 'Tata Consultancy Services',
    name: 'Tata Consultancy Services',
    industry: 'IT Services',
    location: 'Mumbai, India',
    description: 'A global IT services, consulting and business solutions organization.',
    website: 'https://www.tcs.com',
    avatar_url: 'https://logo.clearbit.com/tcs.com',
    logo: 'https://logo.clearbit.com/tcs.com',
    size: '10000+',
    founded: '1968',
    email: 'careers@tcs.com'
  },
  {
    id: '5',
    company_name: 'Infosys',
    name: 'Infosys',
    industry: 'IT Services',
    location: 'Bangalore, India',
    description: 'A global leader in next-generation digital services and consulting.',
    website: 'https://www.infosys.com',
    avatar_url: 'https://logo.clearbit.com/infosys.com',
    logo: 'https://logo.clearbit.com/infosys.com',
    size: '10000+',
    founded: '1981',
    email: 'careers@infosys.com'
  }
];

// Mock Jobs Data with company logos
export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Software Development Engineer',
    company_id: '1',
    company_name: 'Google',
    company_logo: 'https://logo.clearbit.com/google.com',
    location: 'Bangalore, India',
    type: 'full-time',
    salary: '₹18-25 LPA',
    description: 'We are looking for a talented Software Development Engineer to join our team.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      'Strong programming skills in Java, Python, or C++',
      'Experience with data structures and algorithms',
      'Good problem-solving abilities'
    ],
    created_at: '2024-01-15T10:00:00Z',
    deadline: '2024-02-15T23:59:59Z',
    status: 'active',
    positions: 5
  },
  {
    id: '2',
    title: 'Product Manager Intern',
    company_id: '2',
    company_name: 'Microsoft',
    company_logo: 'https://logo.clearbit.com/microsoft.com',
    location: 'Hyderabad, India',
    type: 'internship',
    salary: '₹50,000/month',
    description: 'Join our product management team as an intern and gain hands-on experience.',
    requirements: [
      'Currently pursuing MBA or equivalent',
      'Strong analytical and communication skills',
      'Interest in technology products',
      'Leadership experience preferred'
    ],
    created_at: '2024-01-10T09:00:00Z',
    deadline: '2024-02-10T23:59:59Z',
    status: 'active',
    positions: 3
  },
  {
    id: '3',
    title: 'Data Scientist',
    company_id: '3',
    company_name: 'Amazon',
    company_logo: 'https://logo.clearbit.com/amazon.com',
    location: 'Seattle, USA',
    type: 'full-time',
    salary: '$120,000 - $150,000/year',
    description: 'We are seeking a Data Scientist to analyze large datasets and develop machine learning models.',
    requirements: [
      'Master\'s or Ph.D. in Statistics, Mathematics, or related field',
      'Experience with machine learning algorithms',
      'Proficiency in Python or R',
      'Strong communication skills'
    ],
    created_at: '2024-01-05T14:00:00Z',
    deadline: '2024-02-05T23:59:59Z',
    status: 'active',
    positions: 2
  },
  {
    id: '4',
    title: 'Assistant System Engineer',
    company_id: '4',
    company_name: 'Tata Consultancy Services',
    company_logo: 'https://logo.clearbit.com/tcs.com',
    location: 'Mumbai, India',
    type: 'full-time',
    salary: '₹4-6 LPA',
    description: 'Join TCS as an Assistant System Engineer and work on cutting-edge technologies.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      'Basic programming knowledge',
      'Good communication skills',
      'Willingness to learn'
    ],
    created_at: '2023-12-20T08:00:00Z',
    deadline: '2024-01-20T23:59:59Z',
    status: 'closed',
    positions: 10
  },
  {
    id: '5',
    title: 'Systems Engineer',
    company_id: '5',
    company_name: 'Infosys',
    company_logo: 'https://logo.clearbit.com/infosys.com',
    location: 'Bangalore, India',
    type: 'full-time',
    salary: '₹6-8 LPA',
    description: 'Infosys is hiring Systems Engineers to design and implement scalable systems.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      'Experience with Linux and cloud technologies',
      'Strong problem-solving skills',
      'Team player'
    ],
    created_at: '2023-12-15T11:00:00Z',
    deadline: '2024-01-15T23:59:59Z',
    status: 'closed',
    positions: 8
  }
];

// Mock Applications Data
export const mockApplications: Application[] = [
  {
    id: '1',
    student_id: '1',
    job_id: '1',
    status: 'pending',
    applied_at: '2024-01-16T10:00:00Z',
    resume_url: '/resumes/rahul-patel.pdf'
  },
  {
    id: '2',
    student_id: '2',
    job_id: '1',
    status: 'approved',
    applied_at: '2024-01-17T14:00:00Z',
    resume_url: '/resumes/priya-sharma.pdf'
  },
  {
    id: '3',
    student_id: '3',
    job_id: '2',
    status: 'rejected',
    applied_at: '2024-01-12T09:00:00Z',
    resume_url: '/resumes/amit-kumar.pdf'
  },
  {
    id: '4',
    student_id: '4',
    job_id: '3',
    status: 'interviewed',
    applied_at: '2024-01-07T16:00:00Z',
    resume_url: '/resumes/neha-singh.pdf'
  },
  {
    id: '5',
    student_id: '5',
    job_id: '4',
    status: 'pending',
    applied_at: '2023-12-22T12:00:00Z',
    resume_url: '/resumes/vikram-verma.pdf'
  }
];

export const mockSystemActivities: SystemActivity[] = [
  {
    id: '1',
    action_type: 'login',
    entity_type: 'user',
    entity_id: '1',
    user_id: '1',
    details: { email: 'rahul.patel@example.com' },
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    action_type: 'job_posted',
    entity_type: 'job',
    entity_id: '3',
    user_id: '2',
    details: { title: 'Data Scientist', company: 'Amazon' },
    created_at: '2024-01-05T14:00:00Z'
  },
  {
    id: '3',
    action_type: 'application_submitted',
    entity_type: 'application',
    entity_id: '4',
    user_id: '4',
    details: { job: 'Data Scientist', student: 'Neha Singh' },
    created_at: '2024-01-07T16:00:00Z'
  },
  {
    id: '4',
    action_type: 'profile_updated',
    entity_type: 'user',
    entity_id: '5',
    user_id: '5',
    details: { name: 'Vikram Verma', skills: ['Chemical Processes', 'MATLAB', 'Python'] },
    created_at: '2023-12-25T09:00:00Z'
  },
  {
    id: '5',
    action_type: 'job_status_changed',
    entity_type: 'job',
    entity_id: '5',
    user_id: '3',
    details: { title: 'Systems Engineer', status: 'closed' },
    created_at: '2023-12-15T11:00:00Z'
  }
];

export const mockPlacementStats: PlacementStats = {
  totalStudents: 150,
  placedStudents: 120,
  averagePackage: 8.5,
  topPackage: 25.0
};

export const mockNotifications: Notification[] = [
  {
    id: '1',
    user_id: '1',
    title: 'New Job Posted',
    message: 'Google has posted a new Software Development Engineer position.',
    read: false,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    user_id: '2',
    title: 'Application Status Update',
    message: 'Your application for Software Development Engineer at Google has been approved.',
    read: false,
    created_at: '2024-01-17T14:00:00Z'
  },
  {
    id: '3',
    user_id: '3',
    title: 'Job Posting Expired',
    message: 'The deadline for the Data Scientist position at Amazon has passed.',
    read: true,
    created_at: '2024-01-05T14:00:00Z'
  },
  {
    id: '4',
    user_id: '4',
    title: 'Interview Scheduled',
    message: 'You have been scheduled for an interview for the Data Scientist position at Amazon.',
    read: false,
    created_at: '2024-01-07T16:00:00Z'
  },
  {
    id: '5',
    user_id: '5',
    title: 'Job Application Received',
    message: 'Your application for Assistant System Engineer at TCS has been received.',
    read: false,
    created_at: '2023-12-22T12:00:00Z'
  }
];
