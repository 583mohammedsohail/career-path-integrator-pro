import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, MapPin, Calendar, Users, Building, User, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';

// Import types
import { CampusDrive, CampusApplication } from '@/types/database';

// Extended campus drive interface with company info
interface ExtendedCampusDrive extends CampusDrive {
  company_name?: string;
  company_logo?: string | null;
}

// Extended application interface with student info
interface ExtendedApplication extends CampusApplication {
  student?: {
    name: string;
    email: string;
    avatar_url?: string | null;
    user_metadata?: any;
  };
}

const CampusDriveDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [drive, setDrive] = useState<ExtendedCampusDrive | null>(null);
  const [applications, setApplications] = useState<ExtendedApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applicationNote, setApplicationNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [userApplication, setUserApplication] = useState<ExtendedApplication | null>(null);

  // Fetch campus drive details
  useEffect(() => {
    const fetchDriveDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Get campus drive details
        const { data: driveData, error: driveError } = await supabase
          .from('campus_drives')
          .select('*')
          .eq('id', id)
          .single();
        
        if (driveError) throw driveError;
        
        if (!driveData) {
          toast.error('Campus drive not found');
          navigate('/campus-recruitment');
          return;
        }
        
        // Get company details
        const { data: companyData } = await supabase
          .from('profiles')
          .select('name, avatar_url')
          .eq('id', driveData.company_id)
          .single();
        
        // Process drive data
        const processedDrive: ExtendedCampusDrive = {
          ...driveData,
          company_name: companyData?.name || 'Unknown Company',
          company_logo: companyData?.avatar_url
        };
        
        setDrive(processedDrive);
        
        // If user is a company and owns this drive, fetch applications
        if (currentUser && currentUser.role === 'company' && currentUser.id === driveData.company_id) {
          const { data: applicationsData, error: applicationsError } = await supabase
            .from('campus_applications')
            .select('*')
            .eq('drive_id', id);
          
          if (applicationsError) throw applicationsError;
          
          if (applicationsData) {
            // Fetch student details for each application
            const appsWithStudentInfo = await Promise.all(
              applicationsData.map(async (app) => {
                const { data: studentData } = await supabase
                  .from('profiles')
                  .select('name, email, avatar_url')
                  .eq('id', app.student_id)
                  .single();
                
                return {
                  ...app,
                  student: studentData ? {
                    name: studentData.name,
                    email: studentData.email,
                    avatar_url: studentData.avatar_url,
                    user_metadata: {}
                  } : undefined
                };
              })
            );
            
            setApplications(appsWithStudentInfo);
          }
        }
        
        // If user is a student, check if they've already applied
        if (currentUser && currentUser.role === 'student') {
          const { data: applicationData } = await supabase
            .from('campus_applications')
            .select('*')
            .eq('drive_id', id)
            .eq('student_id', currentUser.id)
            .single();
          
          if (applicationData) {
            setHasApplied(true);
            setUserApplication(applicationData);
          }
        }
      } catch (error) {
        console.error('Error fetching campus drive details:', error);
        toast.error('Failed to load campus drive details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDriveDetails();
  }, [id, navigate, currentUser]);

  // Apply for campus drive
  const handleApply = async () => {
    if (!currentUser || currentUser.role !== 'student' || !drive) {
      toast.error('Only students can apply for campus recruitment drives');
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Create new application
      const { data, error } = await supabase
        .from('campus_applications')
        .insert({
          drive_id: drive.id,
          student_id: currentUser.id,
          status: 'pending',
          applied_at: new Date().toISOString(),
          note: applicationNote
        })
        .select();
      
      if (error) throw error;
      
      setHasApplied(true);
      if (data && data[0]) {
        setUserApplication(data[0] as ExtendedApplication);
      }
      
      toast.success('Application submitted successfully');
      setIsApplyModalOpen(false);
    } catch (error) {
      console.error('Error applying for campus drive:', error);
      toast.error('Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update application status (for company users)
  const updateApplicationStatus = async (applicationId: string, status: 'pending' | 'shortlisted' | 'rejected' | 'interview' | 'selected') => {
    if (!currentUser || currentUser.role !== 'company' || !drive) {
      toast.error('Only the company that posted this drive can update application status');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('campus_applications')
        .update({ status })
        .eq('id', applicationId);
      
      if (error) throw error;
      
      // Update local state
      setApplications(prev => 
        prev.map(app => 
          app.id === applicationId ? { ...app, status } : app
        )
      );
      
      toast.success(`Applicant ${status === 'shortlisted' ? 'shortlisted' : status === 'selected' ? 'selected' : status === 'interview' ? 'scheduled for interview' : 'rejected'}`);
    } catch (error) {
      console.error('Error updating application status:', error);
      toast.error('Failed to update application status');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600">Loading campus drive details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!drive) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-lg text-gray-600">Campus drive not found.</p>
            <Button className="mt-4" onClick={() => navigate('/campus-recruitment')}>
              Back to Campus Recruitment
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={drive.company_logo || undefined} alt={drive.company_name} />
                <AvatarFallback>{drive.company_name ? drive.company_name[0].toUpperCase() : 'C'}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h1 className="text-2xl font-bold">{drive.title}</h1>
                    <p className="text-gray-600 flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {drive.company_name || 'Company'}
                    </p>
                  </div>
                  <Badge variant={
                    drive.status === 'upcoming' ? 'outline' :
                    drive.status === 'ongoing' ? 'default' : 'secondary'
                  } className="text-sm">
                    {drive.status.charAt(0).toUpperCase() + drive.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4 mt-3">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {drive.location}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(drive.date), 'PPP')}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    {drive.positions} {drive.positions === 1 ? 'position' : 'positions'} available
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    Posted {format(new Date(drive.created_at), 'PP')}
                  </div>
                </div>
              </div>
              {currentUser && currentUser.role === 'student' && drive.status !== 'completed' && (
                <div>
                  {hasApplied ? (
                    <div className="flex flex-col items-center gap-2">
                      <Badge variant={
                        userApplication?.status === 'selected' ? 'default' :
                        userApplication?.status === 'shortlisted' ? 'outline' :
                        userApplication?.status === 'rejected' ? 'destructive' :
                        'secondary'
                      } className="px-3 py-1">
                        {userApplication?.status === 'selected' ? 'Selected' :
                         userApplication?.status === 'shortlisted' ? 'Shortlisted' :
                         userApplication?.status === 'rejected' ? 'Not Selected' :
                         userApplication?.status === 'interview' ? 'Interview Scheduled' :
                         'Application Pending'}
                      </Badge>
                      <p className="text-xs text-gray-500">Applied on {userApplication?.applied_at ? format(new Date(userApplication.applied_at), 'PP') : 'N/A'}</p>
                    </div>
                  ) : (
                    <Button onClick={() => setIsApplyModalOpen(true)}>
                      <Briefcase className="h-4 w-4 mr-2" />
                      Apply Now
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>About This Campus Drive</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700 whitespace-pre-line">{drive.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Eligibility Criteria</h3>
                  <p className="text-gray-700 whitespace-pre-line">{drive.eligibility_criteria}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={drive.company_logo || undefined} alt={drive.company_name} />
                    <AvatarFallback>{drive.company_name ? drive.company_name[0].toUpperCase() : 'C'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{drive.company_name}</h3>
                    <p className="text-sm text-gray-600">Recruiter</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full" onClick={() => navigate(`/companies/${drive.company_id}`)}>
                  View Company Profile
                </Button>
              </CardContent>
            </Card>
            
            {currentUser && currentUser.role === 'company' && currentUser.id === drive.company_id && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Manage Drive</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full" onClick={() => {
                    // Update drive status logic
                    const newStatus = drive.status === 'upcoming' ? 'ongoing' : 
                                     drive.status === 'ongoing' ? 'completed' : 'upcoming';
                    
                    supabase
                      .from('campus_drives')
                      .update({ status: newStatus })
                      .eq('id', drive.id)
                      .then(({ error }) => {
                        if (error) {
                          toast.error('Failed to update drive status');
                          return;
                        }
                        
                        setDrive(prev => prev ? { ...prev, status: newStatus } : null);
                        toast.success(`Drive marked as ${newStatus}`);
                      });
                  }}>
                    Mark as {drive.status === 'upcoming' ? 'Ongoing' : 
                            drive.status === 'ongoing' ? 'Completed' : 'Upcoming'}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        {/* Applications Section (for company users) */}
        {currentUser && currentUser.role === 'company' && currentUser.id === drive.company_id && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Applications ({applications.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <p className="text-gray-600 text-center py-4">No applications received yet.</p>
              ) : (
                <div className="space-y-4">
                  {applications.map((application) => (
                    <Card key={application.id} className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={application.student?.avatar_url || undefined} alt={application.student?.name} />
                            <AvatarFallback>{application.student?.name ? application.student.name[0].toUpperCase() : 'S'}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{application.student?.name}</h3>
                            <p className="text-sm text-gray-600">{application.student?.email}</p>
                            <p className="text-xs text-gray-500">Applied on {format(new Date(application.applied_at), 'PP')}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant={
                            application.status === 'selected' ? 'default' :
                            application.status === 'shortlisted' ? 'outline' :
                            application.status === 'rejected' ? 'destructive' :
                            application.status === 'interview' ? 'secondary' :
                            'secondary'
                          }>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </Badge>
                          <div className="flex gap-2 mt-2 md:mt-0">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => navigate(`/students/${application.student_id}`)}
                            >
                              <User className="h-4 w-4 mr-1" />
                              Profile
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateApplicationStatus(application.id, 'shortlisted')}
                              disabled={application.status === 'shortlisted'}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Shortlist
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateApplicationStatus(application.id, 'interview')}
                              disabled={application.status === 'interview'}
                            >
                              Schedule Interview
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateApplicationStatus(application.id, 'selected')}
                              disabled={application.status === 'selected'}
                            >
                              Select
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateApplicationStatus(application.id, 'rejected')}
                              disabled={application.status === 'rejected'}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Apply Modal */}
      <Dialog open={isApplyModalOpen} onOpenChange={setIsApplyModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Apply for {drive.title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="note" className="mb-2 block">
                Application Note (Optional)
              </Label>
              <Textarea
                id="note"
                value={applicationNote}
                onChange={(e) => setApplicationNote(e.target.value)}
                placeholder="Add any additional information you'd like to include with your application..."
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApplyModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApply} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default CampusDriveDetails;
