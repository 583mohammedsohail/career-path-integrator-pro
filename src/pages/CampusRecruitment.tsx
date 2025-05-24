import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, MapPin, Building, Users, Search, Plus, Briefcase } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

// Import types
import { CampusDrive } from '@/types/database';

// Extended campus drive interface with company name
interface ExtendedCampusDrive extends CampusDrive {
  company_name?: string;
  company_logo?: string | null;
}

const CampusRecruitment = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [campusDrives, setCampusDrives] = useState<ExtendedCampusDrive[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDriveOpen, setIsCreateDriveOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Form state for creating a new campus drive
  const [driveForm, setDriveForm] = useState({
    title: '',
    location: '',
    date: '',
    description: '',
    eligibility_criteria: '',
    positions: 1
  });

  // Fetch campus drives from Supabase
  useEffect(() => {
    const fetchCampusDrives = async () => {
      try {
        setLoading(true);
        
        // Get campus drives from database
        const { data, error } = await supabase
          .from('campus_drives')
          .select('*')
          .order('date', { ascending: true });
        
        if (error) throw error;
        
        if (data) {
          // Fetch company details for each drive
          const drivesWithCompanyInfo = await Promise.all(
            data.map(async (drive) => {
              const { data: companyData } = await supabase
                .from('profiles')
                .select('name, avatar_url')
                .eq('id', drive.company_id)
                .single();
              
              return {
                ...drive,
                company_name: companyData?.name || 'Unknown Company',
                company_logo: companyData?.avatar_url
              };
            })
          );
          
          setCampusDrives(drivesWithCompanyInfo);
        }
      } catch (error) {
        console.error('Error fetching campus drives:', error);
        toast.error('Failed to load campus recruitment drives');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCampusDrives();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDriveForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Create a new campus drive
  const handleCreateDrive = async () => {
    if (!currentUser || currentUser.role !== 'company') {
      toast.error('Only companies can create campus recruitment drives');
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Validate form
      if (!driveForm.title || !driveForm.location || !driveForm.date || !driveForm.description) {
        throw new Error('Please fill in all required fields');
      }
      
      // Insert new campus drive into database
      const { data, error } = await supabase
        .from('campus_drives')
        .insert({
          title: driveForm.title,
          company_id: currentUser.id,
          location: driveForm.location,
          date: driveForm.date,
          description: driveForm.description,
          eligibility_criteria: driveForm.eligibility_criteria,
          positions: driveForm.positions,
          status: 'upcoming'
        })
        .select();
      
      if (error) throw error;
      
      // Add the new drive to the state
      if (data && data[0]) {
        const newDrive: ExtendedCampusDrive = {
          ...data[0],
          company_name: currentUser.name,
          eligibility_criteria: driveForm.eligibility_criteria || ''
        };
        setCampusDrives(prev => [newDrive, ...prev]);
      }
      
      toast.success('Campus recruitment drive created successfully');
      setIsCreateDriveOpen(false);
      
      // Reset form
      setDriveForm({
        title: '',
        location: '',
        date: '',
        description: '',
        eligibility_criteria: '',
        positions: 1
      });
    } catch (error) {
      console.error('Error creating campus drive:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create campus drive');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter campus drives based on search query and tab
  const filteredDrives = campusDrives.filter(drive => {
    const matchesSearch = 
      drive.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (drive.company_name && drive.company_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      drive.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = drive.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  // Apply for a campus drive
  const handleApplyForDrive = async (driveId: string) => {
    if (!currentUser || currentUser.role !== 'student') {
      toast.error('Only students can apply for campus recruitment drives');
      return;
    }
    
    try {
      // Check if already applied
      const { data: existingApplication } = await supabase
        .from('campus_applications')
        .select('*')
        .eq('drive_id', driveId)
        .eq('student_id', currentUser.id)
        .single();
      
      if (existingApplication) {
        toast.info('You have already applied for this campus drive');
        return;
      }
      
      // Create new application
      const { error } = await supabase
        .from('campus_applications')
        .insert({
          drive_id: driveId,
          student_id: currentUser.id,
          status: 'pending',
          applied_at: new Date().toISOString()
        });
      
      if (error) throw error;
      
      toast.success('Application submitted successfully');
    } catch (error) {
      console.error('Error applying for campus drive:', error);
      toast.error('Failed to submit application');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Campus Recruitment</h1>
            <p className="text-gray-600 mt-1">Browse upcoming campus recruitment drives</p>
          </div>
          <div className="w-full md:w-auto mt-4 md:mt-0 flex flex-col md:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search drives..."
                className="pl-8 w-full md:w-80"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {currentUser && currentUser.role === 'company' && (
              <Button onClick={() => setIsCreateDriveOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Drive
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab}>
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading campus drives...</p>
              </div>
            ) : filteredDrives.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDrives.map((drive) => (
                  <Card key={drive.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{drive.title}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <Building className="h-4 w-4 mr-1" />
                            {drive.company_name || 'Company'}
                          </CardDescription>
                        </div>
                        <Badge variant={
                          drive.status === 'upcoming' ? 'outline' :
                          drive.status === 'ongoing' ? 'default' : 'secondary'
                        }>
                          {drive.status.charAt(0).toUpperCase() + drive.status.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {drive.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {format(new Date(drive.date), 'PPP')}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          {drive.positions} {drive.positions === 1 ? 'position' : 'positions'} available
                        </div>
                        <p className="text-sm text-gray-700 line-clamp-2 mt-2">
                          {drive.description}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => navigate(`/campus-drive/${drive.id}`)}>
                        View Details
                      </Button>
                      {currentUser && currentUser.role === 'student' && drive.status !== 'completed' && (
                        <Button onClick={() => handleApplyForDrive(drive.id)}>
                          <Briefcase className="h-4 w-4 mr-2" />
                          Apply
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">
                  No {activeTab} campus drives found.
                </p>
                {searchQuery && (
                  <Button className="mt-4" onClick={() => setSearchQuery('')}>
                    Clear Search
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Create Campus Drive Dialog */}
      <Dialog open={isCreateDriveOpen} onOpenChange={setIsCreateDriveOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Campus Recruitment Drive</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new campus recruitment drive.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={driveForm.title}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="e.g., Summer Internship Drive 2025"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={driveForm.location}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="e.g., University Campus, Hyderabad"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={driveForm.date}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="positions" className="text-right">
                Positions
              </Label>
              <Input
                id="positions"
                name="positions"
                type="number"
                min="1"
                value={driveForm.positions}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={driveForm.description}
                onChange={handleInputChange}
                className="col-span-3"
                rows={4}
                placeholder="Provide details about the recruitment drive..."
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="eligibility_criteria" className="text-right pt-2">
                Eligibility
              </Label>
              <Textarea
                id="eligibility_criteria"
                name="eligibility_criteria"
                value={driveForm.eligibility_criteria}
                onChange={handleInputChange}
                className="col-span-3"
                rows={4}
                placeholder="Specify eligibility criteria for students..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDriveOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateDrive} disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Drive'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default CampusRecruitment;
