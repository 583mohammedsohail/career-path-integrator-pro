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
  },
  {
    id: '4',
    title: 'Tata Consultancy Services Campus Drive',
    company_id: '4',
    company_name: 'TCS',
    company_logo: 'https://logo.clearbit.com/tcs.com',
    company: {
      id: '4',
      name: 'TCS',
      company_name: 'Tata Consultancy Services',
      avatar_url: 'https://logo.clearbit.com/tcs.com'
    },
    location: 'Convention Hall',
    date: '2025-12-01',
    registrationDeadline: '2025-11-28',
    positions: 60,
    roles: ['Graduate Trainee', 'Systems Engineer'],
    eligibility: 'B.E/B.Tech/MCA with CGPA > 6.5',
    salary: '₹4-8 LPA',
    status: 'upcoming',
    description: 'TCS is hiring freshers for multiple roles across India. Don’t miss this opportunity to join a global IT leader.',
    requirements: [
      'Good academic record',
      'Basic programming skills',
      'Team player',
      'CGPA > 6.5'
    ],
    applicationCount: 410,
    registeredStudents: []
  },
  {
    id: '5',
    title: 'Infosys Campus Drive',
    company_id: '5',
    company_name: 'Infosys',
    company_logo: 'https://logo.clearbit.com/infosys.com',
    company: {
      id: '5',
      name: 'Infosys',
      company_name: 'Infosys',
      avatar_url: 'https://logo.clearbit.com/infosys.com'
    },
    location: 'Seminar Hall',
    date: '2025-12-10',
    registrationDeadline: '2025-12-05',
    positions: 35,
    roles: ['System Engineer', 'Operations Executive'],
    eligibility: 'B.E/B.Tech (All Branches)',
    salary: '₹3.6-5 LPA',
    status: 'upcoming',
    description: 'Infosys is conducting campus recruitment for technical and non-technical roles.',
    requirements: [
      'Analytical skills',
      'Communication skills',
      'Adaptability',
      'B.E/B.Tech degree'
    ],
    applicationCount: 295,
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
      avatar_url: 'https://logo.clearbit.com/wipro.com'
    },
    location: 'Auditorium',
    date: '2025-12-15',
    registrationDeadline: '2025-12-10',
    positions: 50,
    roles: ['Project Engineer'],
    eligibility: 'B.E/B.Tech 2025 batch',
    salary: '₹3.5-6 LPA',
    status: 'upcoming',
    description: 'Wipro is inviting applications for its flagship Elite NTH program.',
    requirements: [
      'Good coding skills',
      'Problem-solving attitude',
      'Willingness to learn',
      'B.E/B.Tech degree'
    ],
    applicationCount: 380,
    registeredStudents: []
  },
  {
    id: '7',
    title: 'Accenture Innovation Challenge',
    company_id: '7',
    company_name: 'Accenture',
    company_logo: 'https://logo.clearbit.com/accenture.com',
    company: {
      id: '7',
      name: 'Accenture',
      company_name: 'Accenture',
      avatar_url: 'https://logo.clearbit.com/accenture.com'
    },
    location: 'Innovation Lab',
    date: '2025-12-20',
    registrationDeadline: '2025-12-16',
    positions: 45,
    roles: ['Associate Software Engineer', 'Business Analyst'],
    eligibility: 'All graduates (2025 batch)',
    salary: '₹4-7 LPA',
    status: 'upcoming',
    description: 'Showcase your skills and join Accenture through the Innovation Challenge.',
    requirements: [
      'Creative thinking',
      'Teamwork',
      'Technical aptitude',
      'Bachelor’s degree'
    ],
    applicationCount: 260,
    registeredStudents: []
  },
  {
    id: '8',
    title: 'IBM CodeKnack Drive',
    company_id: '8',
    company_name: 'IBM',
    company_logo: 'https://logo.clearbit.com/ibm.com',
    company: {
      id: '8',
      name: 'IBM',
      company_name: 'IBM',
      avatar_url: 'https://logo.clearbit.com/ibm.com'
    },
    location: 'Tech Park',
    date: '2026-01-10',
    registrationDeadline: '2026-01-05',
    positions: 20,
    roles: ['Software Developer', 'Data Engineer'],
    eligibility: 'B.E/B.Tech/M.Tech/MCA',
    salary: '₹5-10 LPA',
    status: 'upcoming',
    description: 'IBM is looking for problem solvers and innovators for its CodeKnack hiring drive.',
    requirements: [
      'Logical reasoning',
      'Coding skills',
      'Academic excellence',
      'Relevant degree'
    ],
    applicationCount: 180,
    registeredStudents: []
  },
  {
    id: '8',
    title: 'Oracle Campus Drive',
    company_id: '8',
    company_name: 'Oracle',
    company_logo: 'https://logo.clearbit.com/oracle.com',
    company: {
      id: '8',
      name: 'Oracle',
      company_name: 'Oracle',
      avatar_url: 'https://logo.clearbit.com/oracle.com'
    },
    location: 'Bangalore',
    date: '2026-01-15',
    registrationDeadline: '2026-01-10',
    positions: 25,
    roles: ['Software Engineer', 'Database Administrator'],
    eligibility: 'B.E/B.Tech/M.Tech/MCA',
    salary: '₹6-12 LPA',
    status: 'upcoming',
    description: 'Oracle is hiring freshers for multiple roles across India.',
    requirements: [
      'Strong coding skills',
      'Database knowledge',
      'Team player',
      'Relevant degree'
    ],
    applicationCount: 200,
    registeredStudents: []
  },
  {
    id: '9',
    title: 'Apple Global Talent Drive',
    company_id: '9',
    company_name: 'Apple',
    company_logo: 'https://logo.clearbit.com/apple.com',
    company: {
      id: '9',
      name: 'Apple',
      company_name: 'Apple',
      avatar_url: 'https://logo.clearbit.com/apple.com'
    },
    location: 'Cupertino, USA',
    date: '2026-02-05',
    registrationDeadline: '2026-02-01',
    positions: 15,
    roles: ['iOS Developer', 'Hardware Engineer', 'Product Designer'],
    eligibility: 'B.Tech/M.Tech in CS, EE, Design',
    salary: '₹25-40 LPA',
    status: 'upcoming',
    description: 'Join Apple and work on products that change the world. We seek creative and passionate minds.',
    requirements: [
      'Strong portfolio',
      'Experience with Apple ecosystem',
      'Excellent communication'
    ],
    applicationCount: 95,
    registeredStudents: []
  },
  {
    id: '10',
    title: 'Meta Future Leaders Program',
    company_id: '10',
    company_name: 'Meta',
    company_logo: 'https://logo.clearbit.com/meta.com',
    company: {
      id: '10',
      name: 'Meta',
      company_name: 'Meta',
      avatar_url: 'https://logo.clearbit.com/meta.com'
    },
    location: 'Menlo Park, USA',
    date: '2026-03-12',
    registrationDeadline: '2026-03-05',
    positions: 20,
    roles: ['Software Engineer', 'AI Researcher', 'Product Manager'],
    eligibility: 'B.Tech/M.Tech/PhD',
    salary: '₹30-45 LPA',
    status: 'upcoming',
    description: 'Meta is looking for innovators to shape the future of social technology and AI.',
    requirements: [
      'AI/ML experience',
      'Leadership skills',
      'Passion for social impact'
    ],
    applicationCount: 110,
    registeredStudents: []
  },
  {
    id: '11',
    title: 'Samsung NextGen Campus Drive',
    company_id: '11',
    company_name: 'Samsung',
    company_logo: 'https://logo.clearbit.com/samsung.com',
    company: {
      id: '11',
      name: 'Samsung',
      company_name: 'Samsung',
      avatar_url: 'https://logo.clearbit.com/samsung.com'
    },
    location: 'Seoul, South Korea',
    date: '2026-04-10',
    registrationDeadline: '2026-04-01',
    positions: 30,
    roles: ['Embedded Engineer', 'Mobile App Developer', 'R&D Specialist'],
    eligibility: 'B.E/B.Tech/M.Tech (ECE, CSE, EE)',
    salary: '₹18-28 LPA',
    status: 'upcoming',
    description: 'Samsung invites you to join its global innovation teams in hardware and software.',
    requirements: [
      'Embedded systems knowledge',
      'Teamwork',
      'Strong technical skills'
    ],
    applicationCount: 85,
    registeredStudents: []
  },
  {
    id: '12',
    title: 'Siemens Global Engineering Drive',
    company_id: '12',
    company_name: 'Siemens',
    company_logo: 'https://logo.clearbit.com/siemens.com',
    company: {
      id: '12',
      name: 'Siemens',
      company_name: 'Siemens',
      avatar_url: 'https://logo.clearbit.com/siemens.com'
    },
    location: 'Munich, Germany',
    date: '2026-05-18',
    registrationDeadline: '2026-05-10',
    positions: 22,
    roles: ['Automation Engineer', 'Data Scientist', 'Control Systems Engineer'],
    eligibility: 'B.E/B.Tech/M.Tech (EE, ME, CS)',
    salary: '₹20-30 LPA',
    status: 'upcoming',
    description: 'Siemens is hiring engineers for its global digital transformation projects.',
    requirements: [
      'Automation experience',
      'Data analytics skills',
      'Problem-solving attitude'
    ],
    applicationCount: 70,
    registeredStudents: []
  },
  {
    id: '13',
    title: 'SAP International Talent Hunt',
    company_id: '13',
    company_name: 'SAP',
    company_logo: 'https://logo.clearbit.com/sap.com',
    company: {
      id: '13',
      name: 'SAP',
      company_name: 'SAP',
      avatar_url: 'https://logo.clearbit.com/sap.com'
    },
    location: 'Walldorf, Germany',
    date: '2026-06-15',
    registrationDeadline: '2026-06-05',
    positions: 18,
    roles: ['Cloud Engineer', 'Business Analyst', 'UI/UX Designer'],
    eligibility: 'B.Tech/M.Tech/MBA',
    salary: '₹22-32 LPA',
    status: 'upcoming',
    description: 'SAP is looking for creative minds to join its international product teams.',
    requirements: [
      'Cloud computing',
      'Business analysis',
      'Design skills'
    ],
    applicationCount: 60,
    registeredStudents: []
  },
  {
    id: '14',
    title: 'Tesla Innovators Campus Drive',
    company_id: '14',
    company_name: 'Tesla',
    company_logo: 'https://logo.clearbit.com/tesla.com',
    company: {
      id: '14',
      name: 'Tesla',
      company_name: 'Tesla',
      avatar_url: 'https://logo.clearbit.com/tesla.com'
    },
    location: 'Palo Alto, USA',
    date: '2026-08-01',
    registrationDeadline: '2026-07-25',
    positions: 12,
    roles: ['Mechanical Engineer', 'Battery Scientist', 'Autopilot Developer'],
    eligibility: 'B.E/B.Tech/M.Tech/PhD',
    salary: '₹35-50 LPA',
    status: 'upcoming',
    description: 'Join Tesla to work on cutting-edge electric vehicles and AI.',
    requirements: [
      'Mechanical or electrical background',
      'AI/ML knowledge',
      'Innovation mindset'
    ],
    applicationCount: 50,
    registeredStudents: []
  }
];