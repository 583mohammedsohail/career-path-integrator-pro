
import { CampusDrive } from '@/types';

export const mockCampusDrives: CampusDrive[] = [
  {
    id: '1',
    title: 'Google India Campus Drive 2025',
    company: {
      id: 'google',
      company_name: 'Google',
      name: 'Google',
      avatar_url: 'https://logo.clearbit.com/google.com',
      logo: 'https://logo.clearbit.com/google.com'
    },
    location: 'Main Campus Auditorium',
    date: '2025-06-15',
    registrationDeadline: '2025-06-10',
    positions: 25,
    roles: ['Software Engineer', 'Product Manager', 'Data Scientist'],
    eligibility: 'B.Tech/M.Tech CSE, IT, ECE with CGPA > 8.0',
    salary: '₹18-25 LPA',
    status: 'upcoming',
    description: 'Join Google for an exciting campus recruitment drive. We are looking for talented engineers to join our teams across various products.',
    requirements: [
      'Strong programming skills in Python, Java, or C++',
      'Problem-solving abilities',
      'Good communication skills',
      'CGPA > 8.0'
    ],
    applicationCount: 142,
    registeredStudents: []
  },
  {
    id: '2',
    title: 'Microsoft Campus Recruitment 2025',
    company: {
      id: 'microsoft',
      name: 'Microsoft',
      logo: 'https://logo.clearbit.com/microsoft.com'
    },
    location: 'Engineering Block',
    date: '2025-06-20',
    registrationDeadline: '2025-06-15',
    positions: 30,
    roles: ['Software Development Engineer', 'Program Manager', 'Cloud Solutions Architect'],
    eligibility: 'All Engineering Branches with CGPA > 7.5',
    salary: '₹16-22 LPA',
    status: 'upcoming',
    description: 'Microsoft is conducting campus recruitment for fresh graduates. Join us to build technology that empowers every person and organization on the planet.',
    requirements: [
      'Programming proficiency in C#, Java, or Python',
      'System design knowledge',
      'Leadership qualities',
      'CGPA > 7.5'
    ],
    applicationCount: 218,
    registeredStudents: []
  },
  {
    id: '3',
    title: 'Amazon Web Services Campus Drive',
    company: {
      id: 'amazon',
      name: 'Amazon',
      logo: 'https://logo.clearbit.com/amazon.com'
    },
    location: 'Computer Center',
    date: '2025-06-25',
    registrationDeadline: '2025-06-20',
    positions: 40,
    roles: ['SDE I', 'Cloud Support Engineer', 'Business Analyst'],
    eligibility: 'B.Tech/M.Tech/MCA with CGPA > 7.0',
    salary: '₹15-20 LPA',
    status: 'upcoming',
    description: 'Amazon is looking for passionate individuals to join our team. We offer exciting opportunities to work on cutting-edge cloud technology.',
    requirements: [
      'Strong coding skills',
      'Data structures and algorithms',
      'Customer obsession mindset',
      'CGPA > 7.0'
    ],
    applicationCount: 305,
    registeredStudents: []
  },
  {
    id: '4',
    title: 'TCS National Qualifier Test 2025',
    company: {
      id: 'tcs',
      name: 'Tata Consultancy Services',
      logo: 'https://logo.clearbit.com/tcs.com'
    },
    location: 'Main Auditorium',
    date: '2025-07-05',
    registrationDeadline: '2025-06-28',
    positions: 100,
    roles: ['Assistant System Engineer', 'Digital Analyst', 'Business Analyst'],
    eligibility: 'All Branches with CGPA > 6.0',
    salary: '₹7-9 LPA',
    status: 'upcoming',
    description: 'TCS is conducting mass recruitment for fresh graduates. Join India\'s largest IT services company and kickstart your career.',
    requirements: [
      'Basic programming knowledge',
      'Good communication skills',
      'Willingness to learn',
      'CGPA > 6.0'
    ],
    applicationCount: 456,
    registeredStudents: []
  },
  {
    id: '5',
    title: 'Infosys Campus Connect 2025',
    company: {
      id: 'infosys',
      name: 'Infosys',
      logo: 'https://logo.clearbit.com/infosys.com'
    },
    location: 'Seminar Hall',
    date: '2025-07-10',
    registrationDeadline: '2025-07-05',
    positions: 80,
    roles: ['Systems Engineer', 'Technology Analyst', 'Digital Specialist'],
    eligibility: 'B.Tech/B.E/M.Tech/MCA with CGPA > 6.5',
    salary: '₹8-12 LPA',
    status: 'upcoming',
    description: 'Infosys invites bright minds to join our global team. Experience innovation and growth opportunities.',
    requirements: [
      'Programming fundamentals',
      'Analytical thinking',
      'Team collaboration',
      'CGPA > 6.5'
    ],
    applicationCount: 321,
    registeredStudents: []
  },
  {
    id: '6',
    title: 'Wipro Elite National Talent Hunt',
    company: {
      id: 'wipro',
      name: 'Wipro',
      logo: 'https://logo.clearbit.com/wipro.com'
    },
    location: 'Central Library',
    date: '2025-07-15',
    registrationDeadline: '2025-07-10',
    positions: 60,
    roles: ['Project Engineer', 'Senior Software Engineer', 'Technical Lead'],
    eligibility: 'Engineering graduates with CGPA > 7.0',
    salary: '₹6-10 LPA',
    status: 'upcoming',
    description: 'Wipro Elite program designed to identify and nurture top talent. Join us for accelerated career growth.',
    requirements: [
      'Strong technical foundation',
      'Problem-solving skills',
      'Leadership potential',
      'CGPA > 7.0'
    ],
    applicationCount: 198,
    registeredStudents: []
  },
  {
    id: '7',
    title: 'Adobe Campus Recruitment Drive',
    company: {
      id: 'adobe',
      name: 'Adobe',
      logo: 'https://logo.clearbit.com/adobe.com'
    },
    location: 'Innovation Lab',
    date: '2025-07-20',
    registrationDeadline: '2025-07-15',
    positions: 15,
    roles: ['Software Engineer', 'UX Designer', 'Product Manager'],
    eligibility: 'B.Tech/M.Tech with CGPA > 8.5',
    salary: '₹20-28 LPA',
    status: 'upcoming',
    description: 'Adobe is seeking creative and technical talent to join our mission of changing the world through digital experiences.',
    requirements: [
      'Exceptional programming skills',
      'Creative problem solving',
      'Portfolio of projects',
      'CGPA > 8.5'
    ],
    applicationCount: 89,
    registeredStudents: []
  },
  {
    id: '8',
    title: 'Salesforce Developer Program',
    company: {
      id: 'salesforce',
      name: 'Salesforce',
      logo: 'https://logo.clearbit.com/salesforce.com'
    },
    location: 'Tech Hub',
    date: '2025-07-25',
    registrationDeadline: '2025-07-20',
    positions: 20,
    roles: ['Software Engineer', 'Cloud Developer', 'Solutions Engineer'],
    eligibility: 'CSE/IT with CGPA > 8.0',
    salary: '₹16-24 LPA',
    status: 'upcoming',
    description: 'Join Salesforce and help companies connect with their customers in entirely new ways using cloud, mobile, social, and AI technologies.',
    requirements: [
      'Cloud platform knowledge',
      'Full-stack development',
      'API integration skills',
      'CGPA > 8.0'
    ],
    applicationCount: 156,
    registeredStudents: []
  },
  {
    id: '9',
    title: 'Accenture Technology Consulting',
    company: {
      id: 'accenture',
      name: 'Accenture',
      logo: 'https://logo.clearbit.com/accenture.com'
    },
    location: 'Conference Hall',
    date: '2025-08-01',
    registrationDeadline: '2025-07-27',
    positions: 50,
    roles: ['Technology Analyst', 'Application Developer', 'Testing Specialist'],
    eligibility: 'All branches with CGPA > 6.5',
    salary: '₹8-14 LPA',
    status: 'upcoming',
    description: 'Accenture Technology powers innovation for leading companies. Join us to solve complex business challenges.',
    requirements: [
      'Technology consulting mindset',
      'Client interaction skills',
      'Adaptability',
      'CGPA > 6.5'
    ],
    applicationCount: 387,
    registeredStudents: []
  },
  {
    id: '10',
    title: 'JP Morgan Technology Program',
    company: {
      id: 'jpmorgan',
      name: 'JP Morgan Chase',
      logo: 'https://logo.clearbit.com/jpmorganchase.com'
    },
    location: 'Finance Lab',
    date: '2025-08-05',
    registrationDeadline: '2025-07-30',
    positions: 12,
    roles: ['Software Engineer', 'Quantitative Analyst', 'Technology Analyst'],
    eligibility: 'CSE/IT/ECE with CGPA > 8.5',
    salary: '₹22-30 LPA',
    status: 'upcoming',
    description: 'Join JP Morgan\'s technology team and help shape the future of financial services with cutting-edge solutions.',
    requirements: [
      'Strong algorithmic skills',
      'Financial domain interest',
      'High-performance computing',
      'CGPA > 8.5'
    ],
    applicationCount: 67,
    registeredStudents: []
  }
];
