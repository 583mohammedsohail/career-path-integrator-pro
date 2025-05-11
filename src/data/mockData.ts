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
  },
  {
    id: '5',
    name: 'Priya Sharma',
    email: 'priya.sharma@college.edu',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?img=21',
    rollNumber: 'CS2021005',
    department: 'Computer Science',
    course: 'B.Tech',
    year: 4,
    cgpa: 9.4,
    skills: ['Java', 'Spring Boot', 'React', 'AWS', 'Docker'],
    resumeUrl: '/resumes/priya-sharma.pdf',
    applications: []
  },
  {
    id: '6',
    name: 'Rahul Patel',
    email: 'rahul.patel@college.edu',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?img=22',
    rollNumber: 'EC2021006',
    department: 'Electronics and Communication',
    course: 'B.Tech',
    year: 4,
    cgpa: 8.9,
    skills: ['VLSI Design', 'IoT', 'Arduino', 'Python', 'PCB Design'],
    resumeUrl: '/resumes/rahul-patel.pdf',
    applications: []
  },
  {
    id: '7',
    name: 'Anjali Gupta',
    email: 'anjali.gupta@college.edu',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?img=23',
    rollNumber: 'IT2021007',
    department: 'Information Technology',
    course: 'B.Tech',
    year: 4,
    cgpa: 9.1,
    skills: ['Full Stack Development', 'Angular', 'Node.js', 'MongoDB', 'TypeScript'],
    resumeUrl: '/resumes/anjali-gupta.pdf',
    applications: []
  },
  {
    id: '8',
    name: 'Arjun Kumar',
    email: 'arjun.kumar@college.edu',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?img=24',
    rollNumber: 'ME2021008',
    department: 'Mechanical Engineering',
    course: 'B.Tech',
    year: 4,
    cgpa: 8.7,
    skills: ['SolidWorks', 'AutoCAD', '3D Printing', 'Manufacturing Design', 'MATLAB'],
    resumeUrl: '/resumes/arjun-kumar.pdf',
    applications: []
  }
];

// Generate mock companies
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'HR Manager',
    email: 'hr@tcs.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/tcs.com',
    companyName: 'Tata Consultancy Services',
    description: "TCS is a global leader in IT services, consulting, and business solutions. We partner with the world's leading businesses in their transformation journeys, helping them adapt to the digital age and make a real difference to their customers and communities.\n\nWith over 500,000 employees across 46 countries, we are one of the largest IT services companies in the world. Our commitment to innovation and excellence has made us a trusted partner for businesses across industries.",
    website: 'https://www.tcs.com',
    location: 'Mumbai, Maharashtra',
    industry: 'Information Technology',
    postedJobs: []
  },
  {
    id: '2',
    name: 'HR Manager',
    email: 'hr@infosys.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/infosys.com',
    companyName: 'Infosys',
    description: "Infosys is a global leader in next-generation digital services and consulting. We enable clients in 46 countries to navigate their digital transformation.\n\nWith over three decades of experience in managing the systems and workings of global enterprises, we expertly steer our clients through their digital journey. We do it by enabling the enterprise with an AI-powered core that helps prioritize the execution of change.",
    website: 'https://www.infosys.com',
    location: 'Bangalore, Karnataka',
    industry: 'Information Technology',
    postedJobs: []
  },
  {
    id: '3',
    name: 'HR Manager',
    email: 'hr@wipro.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/wipro.com',
    companyName: 'Wipro',
    description: "Wipro Limited is a leading global information technology, consulting and business process services company. We harness the power of cognitive computing, hyper-automation, robotics, cloud, analytics and emerging technologies to help our clients adapt to the digital world and make them successful.\n\nA company recognized globally for its comprehensive portfolio of services, strong commitment to sustainability and good corporate citizenship.",
    website: 'https://www.wipro.com',
    location: 'Bangalore, Karnataka',
    industry: 'Information Technology',
    postedJobs: []
  },
  {
    id: '4',
    name: 'HR Manager',
    email: 'hr@hcl.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/hcl.com',
    companyName: 'HCL Technologies',
    description: `HCL Technologies is a next-generation global technology company that helps enterprises reimagine their businesses for the digital age. Our technology products, services, and engineering are built on four decades of innovation, with a world-renowned management philosophy, a strong culture of invention and risk-taking, and a relentless focus on customer relationships.

With a worldwide network of R&D, innovation labs and delivery centers, and 187,000+ Ideapreneurs working in 50 countries, HCL delivers holistic services across industry verticals to leading enterprises.`,
    website: 'https://www.hcl.com',
    location: 'Noida, Uttar Pradesh',
    industry: 'Information Technology',
    postedJobs: []
  },
  {
    id: '5',
    name: 'HR Manager',
    email: 'hr@techmahindra.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/techmahindra.com',
    companyName: 'Tech Mahindra',
    description: "Tech Mahindra represents the connected world, offering innovative and customer-centric information technology experiences, enabling Enterprises, Associates and the Society to Rise™. We are a USD 5.2 billion company with 158,000+ professionals across 90 countries, helping 1262 global customers including Fortune 500 companies.",
    website: 'https://www.techmahindra.com',
    location: 'Pune, Maharashtra',
    industry: 'Information Technology',
    postedJobs: []
  },
  {
    id: '6',
    name: 'HR Manager',
    email: 'hr@larsentoubro.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/larsentoubro.com',
    companyName: 'Larsen & Toubro',
    description: "Larsen & Toubro is an Indian multinational engaged in EPC Projects, Hi-Tech Manufacturing and Services. It operates in over 50 countries worldwide. A strong, customer-focused approach and the constant quest for top-class quality have enabled L&T to attain and sustain leadership in its major lines of business for over eight decades.",
    website: 'https://www.larsentoubro.com',
    location: 'Mumbai, Maharashtra',
    industry: 'Engineering & Construction',
    postedJobs: []
  },
  {
    id: '7',
    name: 'HR Manager',
    email: 'hr@tataelxsi.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/tataelxsi.com',
    companyName: 'Tata Elxsi',
    description: "Tata Elxsi is amongst the world's leading providers of design and technology services for product engineering and solutions across industries including Automotive, Broadcast, Communications, Healthcare, and Transportation.",
    website: 'https://www.tataelxsi.com',
    location: 'Bangalore, Karnataka',
    industry: 'Engineering & Design',
    postedJobs: []
  },
  {
    id: '8',
    name: 'HR Manager',
    email: 'hr@mindtree.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/mindtree.com',
    companyName: 'Mindtree',
    description: "Mindtree is a global technology consulting and services company that enables enterprises across industries to drive superior competitive advantage. We accelerate business transformation by partnering with more than 275 of the world's most innovative enterprises.",
    website: 'https://www.mindtree.com',
    location: 'Bangalore, Karnataka',
    industry: 'Information Technology',
    postedJobs: []
  },
  {
    id: '9',
    name: 'HR Manager',
    email: 'hr@cothonsolutions.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/cothonsolutions.com',
    companyName: 'Cothon Solutions',
    description: "Cothon Solutions is a leading technology company specializing in innovative software solutions and digital transformation services. We help businesses leverage cutting-edge technologies to drive growth and efficiency. Our team of experts delivers customized solutions across various domains including cloud computing, artificial intelligence, and enterprise software development.",
    website: 'https://www.cothonsolutions.com',
    location: 'Hyderabad, Telangana',
    industry: 'Information Technology',
    postedJobs: []
  },
  {
    id: '10',
    name: 'HR Manager',
    email: 'hr@capgemini.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/capgemini.com',
    companyName: 'Capgemini',
    description: "Capgemini is a global leader in consulting, digital transformation, technology and engineering services. We are at the forefront of innovation to address the entire breadth of clients' opportunities in the evolving world of cloud, digital and platforms.",
    website: 'https://www.capgemini.com',
    location: 'Mumbai, Maharashtra',
    industry: 'Information Technology',
    postedJobs: []
  },
  {
    id: '11',
    name: 'HR Manager',
    email: 'hr@cognizant.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/cognizant.com',
    companyName: 'Cognizant',
    description: "Cognizant is one of the world's leading professional services companies, transforming clients' business, operating and technology models for the digital era. Our unique industry-based, consultative approach helps clients envision, build and run more innovative and efficient businesses.",
    website: 'https://www.cognizant.com',
    location: 'Chennai, Tamil Nadu',
    industry: 'Information Technology',
    postedJobs: []
  },
  {
    id: '12',
    name: 'HR Manager',
    email: 'hr@accenture.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/accenture.com',
    companyName: 'Accenture',
    description: "Accenture is a global professional services company with leading capabilities in digital, cloud and security. Combining unmatched experience and specialized skills across more than 40 industries, we offer Strategy and Consulting, Interactive, Technology and Operations services.",
    website: 'https://www.accenture.com',
    location: 'Bangalore, Karnataka',
    industry: 'Information Technology',
    postedJobs: []
  },
  {
    id: '13',
    name: 'HR Manager',
    email: 'hr@ibm.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/ibm.com',
    companyName: 'IBM India',
    description: "IBM is a leading cloud platform and cognitive solutions company. We help clients apply technology to solve some of the world's most challenging problems. IBM's unique ability to bring together deep industry expertise, leading-edge technology and an ecosystem of partners enables us to deliver solutions that create real business value.",
    website: 'https://www.ibm.com/in-en',
    location: 'Bangalore, Karnataka',
    industry: 'Information Technology',
    postedJobs: []
  },
  {
    id: '14',
    name: 'HR Manager',
    email: 'hr@oracle.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/oracle.com',
    companyName: 'Oracle India',
    description: "Oracle is a global technology company that provides a comprehensive and fully integrated stack of cloud applications and platform services. We help organizations of all sizes accelerate their digital transformation and drive innovation.",
    website: 'https://www.oracle.com/in',
    location: 'Bangalore, Karnataka',
    industry: 'Information Technology',
    postedJobs: []
  },
  {
    id: '15',
    name: 'HR Manager',
    email: 'hr@microsoft.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/microsoft.com',
    companyName: 'Microsoft India',
    description: "Microsoft is a technology company that develops and supports software, services, devices and solutions. Our mission is to empower every person and every organization on the planet to achieve more.",
    website: 'https://www.microsoft.com/en-in',
    location: 'Hyderabad, Telangana',
    industry: 'Information Technology',
    postedJobs: []
  },
  {
    id: '16',
    name: 'HR Manager',
    email: 'hr@amazon.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/amazon.com',
    companyName: 'Amazon India',
    description: "Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking. We are driven by the excitement of building technologies, inventing products, and providing services that change lives.",
    website: 'https://www.amazon.in',
    location: 'Bangalore, Karnataka',
    industry: 'E-commerce & Technology',
    postedJobs: []
  },
  {
    id: '17',
    name: 'HR Manager',
    email: 'hr@google.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/google.com',
    companyName: 'Google India',
    description: "Google's mission is to organize the world's information and make it universally accessible and useful. Through our products and platforms, we help billions of people every day to find information, connect with others, and get things done.",
    website: 'https://www.google.co.in',
    location: 'Hyderabad, Telangana',
    industry: 'Technology',
    postedJobs: []
  },
  {
    id: '18',
    name: 'HR Manager',
    email: 'hr@flipkart.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/flipkart.com',
    companyName: 'Flipkart',
    description: "Flipkart is India's leading e-commerce marketplace, offering over 80 million products across 80+ categories. We are known for pioneering services such as Cash on Delivery, No Cost EMI and easy returns.",
    website: 'https://www.flipkart.com',
    location: 'Bangalore, Karnataka',
    industry: 'E-commerce',
    postedJobs: []
  },
  {
    id: '19',
    name: 'HR Manager',
    email: 'hr@paytm.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/paytm.com',
    companyName: 'Paytm',
    description: "Paytm is India's leading digital payments and financial services company, which offers full-stack payments & financial solutions to consumers, offline merchants and online platforms.",
    website: 'https://www.paytm.com',
    location: 'Noida, Uttar Pradesh',
    industry: 'FinTech',
    postedJobs: []
  },
  {
    id: '20',
    name: 'HR Manager',
    email: 'hr@razorpay.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/razorpay.com',
    companyName: 'Razorpay',
    description: "Razorpay is a full-stack financial services company helping businesses accept, process and disburse payments via its product suite. With transparent pricing, instant settlements, 24x7 support and best-in-class technology, Razorpay is the preferred payments partner for businesses.",
    website: 'https://www.razorpay.com',
    location: 'Bangalore, Karnataka',
    industry: 'FinTech',
    postedJobs: []
  },
  {
    id: '21',
    name: 'HR Manager',
    email: 'hr@swiggy.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/swiggy.com',
    companyName: 'Swiggy',
    description: "Swiggy is India's leading on-demand delivery platform with a vision to elevate the quality of life for the urban consumer by offering unparalleled convenience. We connect consumers to over 150,000 restaurant partners and stores across 500+ cities.",
    website: 'https://www.swiggy.com',
    location: 'Bangalore, Karnataka',
    industry: 'Food Delivery',
    postedJobs: []
  },
  {
    id: '22',
    name: 'HR Manager',
    email: 'hr@zomato.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/zomato.com',
    companyName: 'Zomato',
    description: "Zomato is an Indian multinational restaurant aggregator and food delivery company. We provide information, menus and user-reviews of restaurants, and also food delivery options from partner restaurants in select cities.",
    website: 'https://www.zomato.com',
    location: 'Gurgaon, Haryana',
    industry: 'Food Delivery',
    postedJobs: []
  },
  {
    id: '23',
    name: 'HR Manager',
    email: 'hr@ola.com',
    role: 'company',
    avatar: 'https://logo.clearbit.com/olacabs.com',
    companyName: 'Ola',
    description: "Ola is India's largest mobility platform and one of the world's largest ride-hailing companies. We serve 250+ cities across India, Australia, New Zealand, and the UK with our ride-hailing services.",
    website: 'https://www.olacabs.com',
    location: 'Bangalore, Karnataka',
    industry: 'Transportation',
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

// Generate mock management users
export const mockManagement: Management[] = [
  {
    id: '1',
    name: 'David Morgan',
    email: 'david.morgan@college.edu',
    role: 'management',
    avatar: 'https://i.pravatar.cc/150?img=15',
    department: 'College Management',
    position: 'Director of Operations',
    managementLevel: 'executive'
  },
  {
    id: '2',
    name: 'Laura Chen',
    email: 'laura.chen@college.edu',
    role: 'management',
    avatar: 'https://i.pravatar.cc/150?img=16',
    department: 'Finance Department',
    position: 'Financial Controller',
    managementLevel: 'senior'
  }
];

// Generate mock superadmin
export const mockSuperAdmin: SuperAdmin[] = [
  {
    id: '1',
    name: 'System Administrator',
    email: 'sysadmin@college.edu',
    role: 'superadmin',
    avatar: 'https://i.pravatar.cc/150?img=20',
    accessLevel: 'full',
    lastLogin: '2025-05-08T10:30:00'
  }
];

// Generate mock jobs
export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Software Engineer',
    company: mockCompanies[0],
    description: 'We are looking for a talented Software Engineer to join our team to develop high-quality web applications and contribute to our digital transformation initiatives.',
    requirements: [
      'B.Tech/M.Tech in Computer Science or related field',
      'Proficiency in Java, Spring Boot, and React',
      'Minimum CGPA of 7.5',
      'Strong problem-solving skills and knowledge of data structures'
    ],
    location: 'Mumbai, Maharashtra (Hybrid)',
    salary: '₹8,00,000 - ₹12,00,000 per annum',
    positions: 5,
    deadline: '2024-06-15',
    status: 'open',
    createdAt: '2024-05-01',
    applications: []
  },
  {
    id: '2',
    title: 'Data Scientist',
    company: mockCompanies[1],
    description: 'We are seeking a Data Scientist to analyze complex data and provide insights for business decision-making. The ideal candidate will work on cutting-edge AI/ML projects.',
    requirements: [
      'B.Tech/M.Tech in Computer Science, Statistics, or Mathematics',
      'Experience with Python, R, and SQL',
      'Knowledge of machine learning algorithms and deep learning frameworks',
      'Minimum CGPA of 8.0'
    ],
    location: 'Bangalore, Karnataka',
    salary: '₹12,00,000 - ₹18,00,000 per annum',
    positions: 3,
    deadline: '2024-06-20',
    status: 'open',
    createdAt: '2024-05-03',
    applications: []
  },
  {
    id: '3',
    title: 'Cloud Solutions Architect',
    company: mockCompanies[2],
    description: 'Looking for a Cloud Solutions Architect to design and implement cloud-based solutions using AWS, Azure, or GCP. The role involves working with enterprise clients on their cloud migration and digital transformation projects.',
    requirements: [
      'B.Tech/M.Tech in Computer Science or related field',
      'AWS/Azure/GCP certification',
      'Experience with cloud architecture and microservices',
      'Minimum CGPA of 7.5'
    ],
    location: 'Bangalore, Karnataka (Hybrid)',
    salary: '₹15,00,000 - ₹25,00,000 per annum',
    positions: 2,
    deadline: '2024-06-25',
    status: 'open',
    createdAt: '2024-05-05',
    applications: []
  },
  {
    id: '4',
    title: 'Full Stack Developer',
    company: mockCompanies[3],
    description: 'We are looking for a Full Stack Developer to join our digital transformation team. The role involves developing end-to-end solutions using modern web technologies.',
    requirements: [
      'B.Tech/M.Tech in Computer Science or related field',
      'Experience with Node.js, React, and MongoDB',
      'Knowledge of cloud platforms and DevOps practices',
      'Minimum CGPA of 7.5'
    ],
    location: 'Noida, Uttar Pradesh',
    salary: '₹10,00,000 - ₹15,00,000 per annum',
    positions: 4,
    deadline: '2024-06-30',
    status: 'open',
    createdAt: '2024-05-07',
    applications: []
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: mockCompanies[4],
    description: 'Seeking a DevOps Engineer to automate and streamline our operations and processes. The ideal candidate will build and maintain tools for deployment, monitoring, and operations.',
    requirements: [
      'B.Tech/M.Tech in Computer Science or related field',
      'Experience with Docker, Kubernetes, and CI/CD tools',
      'Knowledge of cloud platforms and infrastructure as code',
      'Minimum CGPA of 7.5'
    ],
    location: 'Pune, Maharashtra (Hybrid)',
    salary: '₹12,00,000 - ₹18,00,000 per annum',
    positions: 3,
    deadline: '2024-07-05',
    status: 'open',
    createdAt: '2024-05-10',
    applications: []
  },
  {
    id: '6',
    title: 'Civil Engineer',
    company: mockCompanies[5],
    description: 'Looking for a Civil Engineer to work on large-scale infrastructure projects. The role involves planning, designing, and overseeing construction projects.',
    requirements: [
      'B.Tech/M.Tech in Civil Engineering',
      'Experience with AutoCAD and project management tools',
      'Knowledge of construction methods and materials',
      'Minimum CGPA of 7.0'
    ],
    location: 'Mumbai, Maharashtra',
    salary: '₹8,00,000 - ₹12,00,000 per annum',
    positions: 4,
    deadline: '2024-07-10',
    status: 'open',
    createdAt: '2024-05-12',
    applications: []
  },
  {
    id: '7',
    title: 'Embedded Systems Engineer',
    company: mockCompanies[6],
    description: 'We are seeking an Embedded Systems Engineer to design and develop embedded software solutions for automotive and IoT applications.',
    requirements: [
      'B.Tech/M.Tech in Electronics/Computer Science',
      'Experience with C/C++, RTOS, and microcontrollers',
      'Knowledge of automotive protocols and standards',
      'Minimum CGPA of 7.5'
    ],
    location: 'Bangalore, Karnataka',
    salary: '₹10,00,000 - ₹15,00,000 per annum',
    positions: 3,
    deadline: '2024-07-15',
    status: 'open',
    createdAt: '2024-05-15',
    applications: []
  },
  {
    id: '8',
    title: 'UI/UX Designer',
    company: mockCompanies[7],
    description: 'Looking for a UI/UX Designer to create beautiful and intuitive user interfaces for our digital products.',
    requirements: [
      'B.Tech/M.Tech in Design or related field',
      'Experience with Figma, Adobe XD, and design systems',
      'Strong portfolio showcasing UI/UX work',
      'Minimum CGPA of 7.0'
    ],
    location: 'Bangalore, Karnataka (Hybrid)',
    salary: '₹8,00,000 - ₹12,00,000 per annum',
    positions: 2,
    deadline: '2024-07-20',
    status: 'open',
    createdAt: '2024-05-18',
    applications: []
  },
  {
    id: '9',
    title: 'Machine Learning Engineer',
    company: mockCompanies[0],
    description: 'We are looking for a Machine Learning Engineer to develop and deploy ML models for various business applications.',
    requirements: [
      'B.Tech/M.Tech in Computer Science or related field',
      'Experience with TensorFlow/PyTorch and ML frameworks',
      'Strong background in mathematics and statistics',
      'Minimum CGPA of 8.0'
    ],
    location: 'Mumbai, Maharashtra (Hybrid)',
    salary: '₹15,00,000 - ₹20,00,000 per annum',
    positions: 2,
    deadline: '2024-07-25',
    status: 'open',
    createdAt: '2024-05-20',
    applications: []
  },
  {
    id: '10',
    title: 'Cybersecurity Analyst',
    company: mockCompanies[1],
    description: 'Seeking a Cybersecurity Analyst to protect our systems and data from cyber threats.',
    requirements: [
      'B.Tech/M.Tech in Computer Science or related field',
      'Experience with security tools and protocols',
      'Knowledge of network security and ethical hacking',
      'Minimum CGPA of 7.5'
    ],
    location: 'Bangalore, Karnataka',
    salary: '₹12,00,000 - ₹18,00,000 per annum',
    positions: 3,
    deadline: '2024-07-30',
    status: 'open',
    createdAt: '2024-05-22',
    applications: []
  },
  {
    id: '11',
    title: 'Mobile App Developer',
    company: mockCompanies[2],
    description: 'Looking for a Mobile App Developer to create innovative mobile applications for iOS and Android platforms.',
    requirements: [
      'B.Tech/M.Tech in Computer Science or related field',
      'Experience with React Native/Flutter',
      'Knowledge of mobile app architecture and design patterns',
      'Minimum CGPA of 7.5'
    ],
    location: 'Bangalore, Karnataka (Hybrid)',
    salary: '₹10,00,000 - ₹15,00,000 per annum',
    positions: 4,
    deadline: '2024-08-05',
    status: 'open',
    createdAt: '2024-05-25',
    applications: []
  },
  {
    id: '12',
    title: 'Database Administrator',
    company: mockCompanies[3],
    description: 'We are seeking a Database Administrator to manage and optimize our database systems.',
    requirements: [
      'B.Tech/M.Tech in Computer Science or related field',
      'Experience with SQL and NoSQL databases',
      'Knowledge of database optimization and security',
      'Minimum CGPA of 7.5'
    ],
    location: 'Noida, Uttar Pradesh',
    salary: '₹12,00,000 - ₹18,00,000 per annum',
    positions: 3,
    deadline: '2024-08-10',
    status: 'open',
    createdAt: '2024-05-28',
    applications: []
  }
];

// Generate mock notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    user: { id: '1', name: 'Alex Johnson' },
    message: 'You have been shortlisted for TCS interview.',
    isRead: false,
    createdAt: '2024-05-10T09:30:00'
  },
  {
    id: '2',
    user: { id: '1', name: 'Alex Johnson' },
    message: 'New job posting from Google matches your profile.',
    isRead: true,
    createdAt: '2024-05-09T14:20:00'
  },
  {
    id: '3',
    user: { id: '2', name: 'Sarah Williams' },
    message: 'Your application for Software Engineer at TCS has been received.',
    isRead: false,
    createdAt: '2024-05-08T11:45:00'
  },
  {
    id: '4',
    user: { id: '3', name: 'Michael Brown' },
    message: 'Upcoming placement drive by Infosys on June 20, 2024.',
    isRead: true,
    createdAt: '2024-05-07T16:30:00'
  },
  {
    id: '5',
    user: { id: '4', name: 'Emily Davis' },
    message: 'Resume submission deadline for Amazon is approaching.',
    isRead: false,
    createdAt: '2024-05-06T10:15:00'
  }
];

// Generate mock placement stats
export const mockPlacementStats: PlacementStats = {
  totalStudents: 120,
  totalCompanies: 25,
  totalJobs: 48,
  totalApplications: 346,
  totalPlacements: 88,
  averageSalary: 850,
  highestSalary: 2400,
  placementRate: 73.33
};

// For job applications
for (const job of mockJobs) {
  // Make sure company exists before assigning
  const companyIndex = mockCompanies.findIndex(c => c.id === job.company.id);
  if (companyIndex >= 0 && companyIndex < mockCompanies.length) {
    if (!mockCompanies[companyIndex].postedJobs) {
      mockCompanies[companyIndex].postedJobs = [];
    }
    mockCompanies[companyIndex].postedJobs.push(job);
  }
}
