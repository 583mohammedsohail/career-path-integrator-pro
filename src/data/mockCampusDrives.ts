import { CampusDrive } from '@/types';

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
      avatar_url: 'https://logo.clearbit.com/google.com'
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
      avatar_url: 'https://logo.clearbit.com/microsoft.com'
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
      avatar_url: 'https://logo.clearbit.com/amazon.com'
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
  }
];