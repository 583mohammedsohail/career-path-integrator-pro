import { CampusDrive, Company } from '@/types';

export const mockCampusDrives: CampusDrive[] = [
  {
    id: '1',
    title: 'Google India Campus Drive 2025',
    company_id: '1',
    company_name: 'Google',
    company_logo: 'https://logo.clearbit.com/google.com',
    company: {
      id: '1',
      name: 'Google',
      company_name: 'Google',
      logo: 'https://logo.clearbit.com/google.com',
      avatar_url: 'https://logo.clearbit.com/google.com',
      location: 'Hyderabad, Telangana',
      size: '5,000+',
      description: 'Multinational technology company specializing in Internet-related services and products'
    },
    location: 'Main Campus Auditorium',
    date: '2025-11-05',
    registrationDeadline: '2025-11-01',
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
    company_id: '2',
    company_name: 'Microsoft',
    company_logo: 'https://logo.clearbit.com/microsoft.com',
    company: {
      id: '2',
      name: 'Microsoft',
      company_name: 'Microsoft',
      logo: 'https://logo.clearbit.com/microsoft.com',
      avatar_url: 'https://logo.clearbit.com/microsoft.com',
      location: 'Hyderabad, Telangana',
      size: '1,200+',
      description: 'Multinational technology company specializing in computer software, consumer electronics, and personal computers'
    },
    location: 'Engineering Block',
    date: '2025-11-12',
    registrationDeadline: '2025-11-08',
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
    company_id: '3',
    company_name: 'Amazon',
    company_logo: 'https://logo.clearbit.com/amazon.com',
    company: {
      id: '3',
      name: 'Amazon',
      company_name: 'Amazon',
      logo: 'https://logo.clearbit.com/amazon.com',
      avatar_url: 'https://logo.clearbit.com/amazon.com',
      location: 'Hyderabad, Telangana',
      size: '3,500+',
      description: 'Multinational technology company specializing in e-commerce, cloud computing, and artificial intelligence'
    },
    location: 'Computer Center',
    date: '2025-11-22',
    registrationDeadline: '2025-11-18',
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
    company_id: '4',
    company_name: 'Tata Consultancy Services',
    company_logo: 'https://logo.clearbit.com/tcs.com',
    company: {
      id: '4',
      name: 'Tata Consultancy Services',
      company_name: 'Tata Consultancy Services',
      logo: 'https://logo.clearbit.com/tcs.com',
      avatar_url: 'https://logo.clearbit.com/tcs.com',
      location: 'Hyderabad, Telangana',
      size: '4,000+',
      description: 'Indian multinational information technology consulting and business solutions company'
    },
    location: 'Main Auditorium',
    date: '2025-11-15',
    registrationDeadline: '2025-11-11',
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
    company_id: '5',
    company_name: 'Infosys',
    company_logo: 'https://logo.clearbit.com/infosys.com',
    company: {
      id: '5',
      name: 'Infosys',
      company_name: 'Infosys',
      logo: 'https://logo.clearbit.com/infosys.com',
      avatar_url: 'https://logo.clearbit.com/infosys.com',
      location: 'Hyderabad, Telangana',
      size: '2,500+',
      description: 'Indian multinational information technology consulting and business solutions company'
    },
    location: 'Seminar Hall',
    date: '2025-11-28',
    registrationDeadline: '2025-11-24',
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
    company_id: '6',
    company_name: 'Wipro',
    company_logo: 'https://logo.clearbit.com/wipro.com',
    company: {
      id: '6',
      name: 'Wipro',
      company_name: 'Wipro',
      logo: 'https://logo.clearbit.com/wipro.com',
      avatar_url: 'https://logo.clearbit.com/wipro.com',
      location: 'Hyderabad, Telangana',
      size: '3,000+',
      description: 'Indian multinational information technology consulting and business solutions company'
    },
    location: 'Central Library',
    date: '2025-11-10',
    registrationDeadline: '2025-11-06',
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
    company_id: '7',
    company_name: 'Adobe',
    company_logo: 'https://logo.clearbit.com/adobe.com',
    company: {
      id: '7',
      name: 'Adobe',
      company_name: 'Adobe',
      logo: 'https://logo.clearbit.com/adobe.com',
      avatar_url: 'https://logo.clearbit.com/adobe.com',
      location: 'Hyderabad, Telangana',
      size: '1,500+',
      description: 'Multinational computer software company specializing in creative software products'
    },
    location: 'Innovation Lab',
    date: '2025-11-25',
    registrationDeadline: '2025-11-21',
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
    company_id: '8',
    company_name: 'Salesforce',
    company_logo: 'https://logo.clearbit.com/salesforce.com',
    company: {
      id: '8',
      name: 'Salesforce',
      company_name: 'Salesforce',
      logo: 'https://logo.clearbit.com/salesforce.com',
      avatar_url: 'https://logo.clearbit.com/salesforce.com',
      location: 'Hyderabad, Telangana',
      size: '2,000+',
      description: 'American cloud-based software company specializing in customer relationship management solutions'
    },
    location: 'Tech Hub',
    date: '2025-11-18',
    registrationDeadline: '2025-11-14',
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
    company_id: '9',
    company_name: 'Accenture',
    company_logo: 'https://logo.clearbit.com/accenture.com',
    company: {
      id: '9',
      name: 'Accenture',
      company_name: 'Accenture',
      logo: 'https://logo.clearbit.com/accenture.com',
      avatar_url: 'https://logo.clearbit.com/accenture.com',
      location: 'Hyderabad, Telangana',
      size: '4,500+',
      description: 'Multinational management consulting and professional services company'
    },
    location: 'Conference Hall',
    date: '2025-11-20',
    registrationDeadline: '2025-11-16',
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
    company_id: '10',
    company_name: 'JP Morgan Chase',
    company_logo: 'https://logo.clearbit.com/jpmorganchase.com',
    company: {
      id: '10',
      name: 'JP Morgan Chase',
      company_name: 'JP Morgan Chase',
      logo: 'https://logo.clearbit.com/jpmorganchase.com',
      avatar_url: 'https://logo.clearbit.com/jpmorganchase.com',
      location: 'Hyderabad, Telangana',
      size: '1,800+',
      description: 'American multinational investment bank and financial services company'
    },
    location: 'Finance Lab',
    date: '2025-11-12',
    registrationDeadline: '2025-11-08',
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
