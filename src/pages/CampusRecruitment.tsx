
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Calendar, Users, Building, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

// Updated mock data with 2025 dates
const mockCampusDrives = [
  {
    id: '1',
    title: 'Tech Giants Campus Drive 2025',
    company: {
      id: 'google',
      name: 'Google',
      logo: '/placeholder.svg'
    },
    location: 'Main Campus Auditorium',
    date: '2025-02-15',
    registrationDeadline: '2025-02-10',
    positions: 25,
    roles: ['Software Engineer', 'Product Manager', 'Data Scientist'],
    eligibility: 'B.Tech/M.Tech CSE, IT, ECE',
    salary: '₹18-25 LPA',
    status: 'upcoming',
    description: 'Join Google for an exciting campus recruitment drive. We are looking for talented engineers to join our teams across various products.',
    requirements: [
      'Strong programming skills in Python, Java, or C++',
      'Problem-solving abilities',
      'Good communication skills',
      'CGPA > 8.0'
    ]
  },
  {
    id: '2',
    title: 'Microsoft Campus Recruitment',
    company: {
      id: 'microsoft',
      name: 'Microsoft',
      logo: '/placeholder.svg'
    },
    location: 'Engineering Block',
    date: '2025-02-20',
    registrationDeadline: '2025-02-15',
    positions: 30,
    roles: ['Software Development Engineer', 'Program Manager'],
    eligibility: 'All Engineering Branches',
    salary: '₹16-22 LPA',
    status: 'upcoming',
    description: 'Microsoft is conducting campus recruitment for fresh graduates. Join us to build technology that empowers every person and organization on the planet.',
    requirements: [
      'Programming proficiency',
      'System design knowledge',
      'Leadership qualities',
      'CGPA > 7.5'
    ]
  },
  {
    id: '3',
    title: 'Amazon Campus Drive',
    company: {
      id: 'amazon',
      name: 'Amazon',
      logo: '/placeholder.svg'
    },
    location: 'Computer Center',
    date: '2025-02-25',
    registrationDeadline: '2025-02-20',
    positions: 40,
    roles: ['SDE I', 'Support Engineer', 'Business Analyst'],
    eligibility: 'B.Tech/M.Tech/MCA',
    salary: '₹15-20 LPA',
    status: 'upcoming',
    description: 'Amazon is looking for passionate individuals to join our team. We offer exciting opportunities to work on cutting-edge technology.',
    requirements: [
      'Strong coding skills',
      'Data structures and algorithms',
      'Customer obsession',
      'CGPA > 7.0'
    ]
  },
  {
    id: '4',
    title: 'TCS Campus Recruitment',
    company: {
      id: 'tcs',
      name: 'Tata Consultancy Services',
      logo: '/placeholder.svg'
    },
    location: 'Main Auditorium',
    date: '2025-03-05',
    registrationDeadline: '2025-02-28',
    positions: 100,
    roles: ['Assistant System Engineer', 'Digital Analyst'],
    eligibility: 'All Branches',
    salary: '₹7-9 LPA',
    status: 'upcoming',
    description: 'TCS is conducting mass recruitment for fresh graduates. Join India\'s largest IT services company.',
    requirements: [
      'Basic programming knowledge',
      'Good communication skills',
      'Willingness to learn',
      'CGPA > 6.0'
    ]
  },
  {
    id: '5',
    title: 'Infosys Campus Connect',
    company: {
      id: 'infosys',
      name: 'Infosys',
      logo: '/placeholder.svg'
    },
    location: 'Seminar Hall',
    date: '2025-03-10',
    registrationDeadline: '2025-03-05',
    positions: 80,
    roles: ['Systems Engineer', 'Technology Analyst'],
    eligibility: 'B.Tech/B.E/M.Tech/MCA',
    salary: '₹8-12 LPA',
    status: 'upcoming',
    description: 'Infosys invites bright minds to join our global team. Experience innovation and growth opportunities.',
    requirements: [
      'Programming fundamentals',
      'Analytical thinking',
      'Team collaboration',
      'CGPA > 6.5'
    ]
  }
];

const CampusRecruitment = () => {
  const [drives] = useState(mockCampusDrives);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Update current date every minute for real-time display
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Filter drives based on search and status
  const filteredDrives = drives.filter(drive => {
    const matchesSearch = drive.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drive.company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || drive.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (driveDate: string) => {
    const today = currentDate.toISOString().split('T')[0];
    const drive = new Date(driveDate);
    const now = new Date(today);
    
    if (drive < now) {
      return <Badge variant="outline" className="bg-gray-100 text-gray-800">Completed</Badge>;
    } else if (drive.getTime() === now.getTime()) {
      return <Badge variant="outline" className="bg-blue-100 text-blue-800">Today</Badge>;
    } else {
      return <Badge variant="outline" className="bg-green-100 text-green-800">Upcoming</Badge>;
    }
  };

  const getDaysUntil = (dateString: string) => {
    const targetDate = new Date(dateString);
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Completed';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Campus Recruitment 2025</h1>
          <p className="text-gray-600">
            Current Date: {currentDate.toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-gray-600">
            Discover upcoming campus drives and placement opportunities
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by company or drive name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Drives</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Campus Drives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrives.map((drive) => (
            <Card key={drive.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={drive.company.logo} alt={drive.company.name} />
                      <AvatarFallback>{drive.company.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{drive.title}</CardTitle>
                      <CardDescription>{drive.company.name}</CardDescription>
                    </div>
                  </div>
                  {getStatusBadge(drive.date)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(drive.date).toLocaleDateString()} ({getDaysUntil(drive.date)})</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{drive.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{drive.positions} positions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Building className="h-4 w-4" />
                    <span>{drive.salary}</span>
                  </div>

                  <div className="pt-2">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Eligibility:</strong> {drive.eligibility}
                    </p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {drive.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {drive.roles.slice(0, 2).map((role, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                      {drive.roles.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{drive.roles.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        Registration deadline: {new Date(drive.registrationDeadline).toLocaleDateString()}
                      </span>
                      <Button size="sm" asChild>
                        <Link to={`/campus-drive/${drive.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDrives.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No campus drives found matching your criteria.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CampusRecruitment;
