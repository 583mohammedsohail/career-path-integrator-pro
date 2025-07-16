import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import PostCampusDriveModal from '../components/campus/PostCampusDriveModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Calendar, Users, Building, Search, Filter, Clock, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockCampusDrives } from '@/data/mockCampusDrives';
import { useAuth } from '@/contexts/AuthContext';
import { CampusDrive } from '@/types';

const CampusRecruitment = () => {
  const { currentUser } = useAuth();
  const [drives] = useState<CampusDrive[]>(mockCampusDrives);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isPostDriveModalOpen, setIsPostDriveModalOpen] = useState(false);

  // Update current date every minute for real-time display
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Filter drives based on search and status
  const filteredDrives = drives.filter(drive => {
    const matchesSearch = drive.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (drive.company?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || drive.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (driveDate: string, status: string) => {
    const today = currentDate.toISOString().split('T')[0];
    const drive = new Date(driveDate);
    const now = new Date(today);
    
    if (status === 'completed') {
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

  const canPostDrives = currentUser && ['company', 'admin', 'management', 'superadmin'].includes(currentUser.role);

  const handleDrivePosted = () => {
    // Refresh the drives list - in a real app, this would fetch from the database
    console.log('Campus drive posted successfully');
    setIsPostDriveModalOpen(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">Campus Recruitment 2025</h1>
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Live</span>
              </div>
            </div>
            
            {canPostDrives && (
              <Button onClick={() => setIsPostDriveModalOpen(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Post Campus Drive
              </Button>
            )}
          </div>
          
          <p className="text-gray-600">
            Current Date: {currentDate.toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              weekday: 'long'
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
            <Card key={drive.id} className="hover:shadow-lg transition-shadow relative overflow-hidden">
              <div className="absolute top-4 right-4 z-10">
                {getStatusBadge(drive.date, drive.status)}
              </div>
              
              <CardHeader className="pb-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={drive.company?.logo} alt={drive.company?.name} />
                      <AvatarFallback>{drive.company?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Link 
                      to={`/companies/${drive.company?.id}`}
                      className="font-medium hover:underline"
                      onClick={() => console.log('Company ID:', drive.company?.id, 'Name:', drive.company?.name)}
                    >
                      {drive.company?.name}
                    </Link>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{drive.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(drive.date).toLocaleDateString('en-IN')} ({getDaysUntil(drive.date)})</span>
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
                    
                    {drive.applicationCount && (
                      <div className="flex items-center gap-2 text-xs text-green-600 mb-3">
                        <Users className="h-3 w-3" />
                        <span>{drive.applicationCount} students applied</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        Registration deadline: {new Date(drive.registrationDeadline ?? '').toLocaleDateString('en-IN')}
                        {new Date(drive.registrationDeadline ?? '').getTime() - currentDate.getTime() < 30 * 24 * 60 * 60 * 1000 && (
                          <span className="ml-1 text-yellow-600 font-medium">(Closing soon)</span>
                        )}
                      </span>
                      <Button size="sm" asChild>
                        <Link to={`/campus-drive/${drive.id}`}>
                          View Details
                        </Link>
                      </Button>
                      <Button size="sm" onClick={() => {
                        // Logic to handle application
                        alert(`Application for ${drive.title} will be processed`);
                      }}>
                        Apply Now
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
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <p className="text-lg text-gray-600 mb-2">No campus drives found matching your criteria.</p>
            <p className="text-sm text-gray-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>

      {/* Post Campus Drive Modal */}
      <PostCampusDriveModal
        isOpen={isPostDriveModalOpen}
        onClose={() => setIsPostDriveModalOpen(false)}
        onDrivePosted={handleDrivePosted}
      />
    </Layout>
  );
};

export default CampusRecruitment;
