import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, isAfter, isBefore, addDays } from 'date-fns';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useApplications } from '@/contexts/ApplicationContext';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Clock, CheckCircle, XCircle, MapPin, Calendar, Briefcase, Plus, Search, Users } from 'lucide-react';

// Types
type DriveStatus = 'upcoming' | 'ongoing' | 'completed';

interface ExtendedCampusDrive {
  id: string;
  title: string;
  company_id: string;
  company_name: string;
  company_logo?: string;
  location: string;
  date: string;
  description: string;
  eligibility_criteria: string;
  positions: number;
  status: DriveStatus;
  registration_deadline: string;
  roles: string[];
  applied?: boolean;
  created_at?: string;
  updated_at?: string;
}

interface DriveFormData {
  title: string;
  location: string;
  date: string;
  description: string;
  eligibility_criteria: string;
  positions: number;
  registration_deadline: string;
  roles: string;
}

// Mock data for campus drives
const MOCK_CAMPUS_DRIVES: ExtendedCampusDrive[] = [
  {
    id: '1',
    title: 'Summer Internship 2024',
    company_id: 'company-1',
    company_name: 'Tech Corp',
    company_logo: 'https://via.placeholder.com/50',
    location: 'Virtual',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    description: 'Join our summer internship program for hands-on experience in software development.',
    eligibility_criteria: 'Currently enrolled in a Computer Science program',
    positions: 10,
    status: 'upcoming',
    registration_deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    roles: ['Software Engineer Intern', 'Data Science Intern'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Campus Recruitment Drive',
    company_id: 'company-2',
    company_name: 'Data Systems Inc',
    company_logo: 'https://via.placeholder.com/50',
    location: 'Main Campus, Building A',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    description: 'Full-time positions available for fresh graduates in various technical roles.',
    eligibility_criteria: 'B.Tech/BE in CS/IT/ECE, 2024 batch',
    positions: 15,
    status: 'ongoing',
    registration_deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    roles: ['Associate Software Engineer', 'QA Engineer'],
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Winter Internship Program',
    company_id: 'company-3',
    company_name: 'Cloud Solutions',
    company_logo: 'https://via.placeholder.com/50',
    location: 'Remote',
    date: new Date('2023-12-15T10:00:00Z').toISOString(),
    description: '4-week intensive winter internship program for 3rd year students.',
    eligibility_criteria: '3rd or 4th year students in CS/IT',
    positions: 8,
    status: 'completed',
    registration_deadline: new Date('2023-12-01T23:59:59Z').toISOString(),
    roles: ['Cloud Intern', 'DevOps Intern'],
    created_at: new Date('2023-10-15T00:00:00Z').toISOString(),
    updated_at: new Date('2023-12-16T00:00:00Z').toISOString(),
  },
];

const CampusRecruitment: React.FC = () => {
  const { currentUser } = useAuth();
  const { addCampusDriveApplication } = useApplications();
  const navigate = useNavigate();
  const [campusDrives, setCampusDrives] = useState<ExtendedCampusDrive[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDriveOpen, setIsCreateDriveOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<DriveStatus>('upcoming');
  const [selectedDrive, setSelectedDrive] = useState<ExtendedCampusDrive | null>(null);

  // Form state for creating a new campus drive
  const [driveForm, setDriveForm] = useState<DriveFormData>({
    title: '',
    location: '',
    date: '',
    description: '',
    eligibility_criteria: '',
    positions: 1,
    registration_deadline: '',
    roles: ''
  });

  // Check if user is logged in and redirect if not
  useEffect(() => {
    if (!currentUser) {
      toast.error('Please login to access campus recruitment');
      navigate('/login', { state: { from: '/campus-recruitment' } });
    }
  }, [currentUser, navigate]);

  // Initialize with mock data and filter
  useEffect(() => {
    const fetchCampusDrives = async () => {
      try {
        setLoading(true);
        // In a real app, fetch from your API
        // const { data, error } = await supabase
        //   .from('campus_drives')
        //   .select('*')
        //   .order('date', { ascending: true });
        // if (error) throw error;
        // setCampusDrives(data);
        
        // Ensure all required fields are present in the mock data
        const drivesWithRequiredFields = MOCK_CAMPUS_DRIVES.map(drive => ({
          ...drive,
          registration_deadline: drive.registration_deadline || new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          roles: drive.roles || [],
          company_logo: drive.company_logo || 'https://via.placeholder.com/50',
          created_at: drive.created_at || new Date().toISOString(),
          updated_at: drive.updated_at || new Date().toISOString()
        }));
        
        setCampusDrives(drivesWithRequiredFields);
      } catch (error) {
        console.error('Error fetching campus drives:', error);
        toast.error('Failed to load campus drives');
      } finally {
        setLoading(false);
      }
    };
    
    if (currentUser) {
      fetchCampusDrives();
    }
  }, [currentUser]);

  // Handle view drive details
  const handleViewDetails = (drive: ExtendedCampusDrive) => {
    setSelectedDrive(drive);
  };
  
  // Handle close details dialog
  const handleCloseDetails = () => {
    setSelectedDrive(null);
  };
  
  // Handle apply for drive
  const handleApply = async (driveId: string) => {
    if (!currentUser) {
      toast.error('Please login to apply for this drive');
      navigate('/login', { state: { from: '/campus-recruitment' } });
      return;
    }
    
    try {
      // Find the drive in our state
      const drive = campusDrives.find(d => d.id === driveId);
      if (!drive) {
        throw new Error('Drive not found');
      }
      
      // In a real app, submit application to your backend
      // await supabase
      //   .from('drive_applications')
      //   .insert([
      //     { 
      //       drive_id: driveId, 
      //       student_id: currentUser.id,
      //       status: 'applied',
      //     },
      //   ]);
      
      // Update local state to reflect the application
      setCampusDrives(prevDrives => 
        prevDrives.map(d => 
          d.id === driveId 
            ? { ...d, applied: true }
            : d
        )
      );
      
      // Add to application context
      addCampusDriveApplication({
        drive_id: drive.id,
        drive_title: drive.title,
        company_name: drive.company_name || 'Unknown Company',
        company_logo: drive.company_logo
      });
      
      toast.success('Successfully applied to the drive!');
    } catch (error) {
      console.error('Error applying to drive:', error);
      toast.error('Failed to apply to the drive');
    }
  };
  
  // Format date for display
  const formatDriveDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy hh:mm a');
  };
  
  // Get status badge component
  const renderStatusBadge = (status: DriveStatus) => {
    switch (status) {
      case 'upcoming':
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            Upcoming
          </Badge>
        );
      case 'ongoing':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Ongoing
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <XCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      default:
        return null;
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDriveForm(prev => ({
      ...prev,
      [name]: name === 'positions' ? parseInt(value) || 1 : value
    }));
  };

  // Filter drives based on search query and active tab
  const filteredDrives = useMemo(() => {
    const now = new Date();
    return campusDrives.filter(drive => {
      // Filter by search query
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        drive.title.toLowerCase().includes(searchLower) ||
        (drive.company_name?.toLowerCase().includes(searchLower) ?? false) ||
        drive.location.toLowerCase().includes(searchLower) ||
        drive.description.toLowerCase().includes(searchLower);
      
      // Filter by status
      const driveDate = new Date(drive.date);
      const isUpcoming = isAfter(driveDate, now);
      const isOngoing = isBefore(driveDate, now) && isAfter(driveDate, addDays(now, -1));
      
      // Use the drive's status if available, otherwise determine from date
      const statusMatches = 
        (activeTab === 'upcoming' && (drive.status === 'upcoming' || isUpcoming)) ||
        (activeTab === 'ongoing' && (drive.status === 'ongoing' || isOngoing)) ||
        (activeTab === 'completed' && (drive.status === 'completed' || isBefore(driveDate, addDays(now, -1))));
      
      return matchesSearch && statusMatches;
    });
  }, [campusDrives, searchQuery, activeTab]);

  // Handle create drive form submission
  const handleCreateDrive = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast.error('Please login to create a campus drive');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // In a real app, you would submit this to your backend
      const newDrive: ExtendedCampusDrive = {
        id: `drive-${Date.now()}`,
        title: driveForm.title,
        company_id: currentUser.id,
        company_name: currentUser.email?.split('@')[0] || 'Your Company',
        location: driveForm.location,
        date: driveForm.date,
        description: driveForm.description,
        eligibility_criteria: driveForm.eligibility_criteria,
        positions: driveForm.positions,
        status: 'upcoming',
        registration_deadline: driveForm.registration_deadline,
        roles: driveForm.roles.split(',').map(r => r.trim()).filter(Boolean),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setCampusDrives(prev => [newDrive, ...prev]);
      setIsCreateDriveOpen(false);
      toast.success('Campus drive created successfully!');
      
      // Reset form
      setDriveForm({
        title: '',
        location: '',
        date: '',
        description: '',
        eligibility_criteria: '',
        positions: 1,
        registration_deadline: '',
        roles: ''
      });
    } catch (error) {
      console.error('Error creating drive:', error);
      toast.error('Failed to create campus drive');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Campus Recruitment</h1>
            <p className="text-muted-foreground">Find and apply to campus recruitment drives</p>
          </div>
          {currentUser?.role === 'company' && (
            <Button onClick={() => setIsCreateDriveOpen(true)} className="mt-4 md:mt-0">
              <Plus className="mr-2 h-4 w-4" />
              Create Drive
            </Button>
          )}
        </div>

        {/* Search and filter */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search drives..."
              className="pl-10 w-full md:w-96"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as DriveStatus)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : filteredDrives.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No {activeTab} drives found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? 'Try adjusting your search' : 'Check back later for new opportunities'}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredDrives.map((drive) => (
                  <Card key={drive.id} className="h-full flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{drive.title}</CardTitle>
                        {renderStatusBadge(drive.status)}
                      </div>
                      <CardDescription>{drive.company_name}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{drive.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{formatDriveDate(drive.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{drive.positions} position{drive.positions !== 1 ? 's' : ''} available</span>
                        </div>
                        <p className="line-clamp-3 text-muted-foreground">{drive.description}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewDetails(drive)}
                      >
                        View Details
                      </Button>
                      {currentUser?.role === 'student' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleApply(drive.id)}
                          disabled={drive.applied}
                        >
                          {drive.applied ? 'Applied' : 'Apply Now'}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Create Drive Dialog */}
        <Dialog open={isCreateDriveOpen} onOpenChange={setIsCreateDriveOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Campus Drive</DialogTitle>
              <DialogDescription>
                Fill in the details below to create a new campus recruitment drive.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateDrive} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Drive Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={driveForm.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Summer Internship 2024"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    name="location"
                    value={driveForm.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Campus Auditorium"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Drive Date & Time *</Label>
                  <Input
                    type="datetime-local"
                    id="date"
                    name="date"
                    value={driveForm.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registration_deadline">Registration Deadline *</Label>
                  <Input
                    type="datetime-local"
                    id="registration_deadline"
                    name="registration_deadline"
                    value={driveForm.registration_deadline}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={driveForm.description}
                  onChange={handleInputChange}
                  placeholder="Provide details about the drive, requirements, and what candidates can expect..."
                  rows={3}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="eligibility_criteria">Eligibility Criteria *</Label>
                <Textarea
                  id="eligibility_criteria"
                  name="eligibility_criteria"
                  value={driveForm.eligibility_criteria}
                  onChange={handleInputChange}
                  placeholder="List the eligibility criteria for applicants..."
                  rows={2}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="positions">Number of Positions *</Label>
                  <Input
                    type="number"
                    id="positions"
                    name="positions"
                    min="1"
                    value={driveForm.positions}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roles">Roles (comma separated) *</Label>
                  <Input
                    id="roles"
                    name="roles"
                    value={driveForm.roles}
                    onChange={handleInputChange}
                    placeholder="e.g., Software Developer, Data Analyst"
                    required
                  />
                </div>
              </div>
              
              <DialogFooter className="pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsCreateDriveOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Create Drive'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Drive Details Dialog */}
        <Dialog open={!!selectedDrive} onOpenChange={(open) => !open && setSelectedDrive(null)}>
          <DialogContent className="sm:max-w-[600px]">
            {selectedDrive && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedDrive.title}</DialogTitle>
                  <div className="flex items-center space-x-2 pt-1">
                    <span className="text-sm text-muted-foreground">
                      {selectedDrive.company_name}
                    </span>
                    {renderStatusBadge(selectedDrive.status)}
                  </div>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Drive Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Date & Time</p>
                        <p>{formatDriveDate(selectedDrive.date)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Location</p>
                        <p>{selectedDrive.location}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Positions Available</p>
                        <p>{selectedDrive.positions}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Registration Deadline</p>
                        <p>{formatDriveDate(selectedDrive.registration_deadline)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Eligibility Criteria</h4>
                    <p className="text-sm">{selectedDrive.eligibility_criteria}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Available Roles</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDrive.roles?.map((role, index) => (
                        <Badge key={index} variant="secondary">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Description</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedDrive.description}
                    </p>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedDrive(null)}
                  >
                    Close
                  </Button>
                  {currentUser?.role === 'student' && (
                    <Button 
                      onClick={() => {
                        handleApply(selectedDrive.id);
                        setSelectedDrive(null);
                      }}
                      disabled={selectedDrive.applied}
                    >
                      {selectedDrive.applied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                  )}
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default CampusRecruitment;