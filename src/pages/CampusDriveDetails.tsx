
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
import { toast } from 'sonner';
import { format } from 'date-fns';
import { CampusDrive, CampusApplication } from '@/types/index';
import { mockCampusDrives } from '@/data/mockCampusDrives';

const CampusDriveDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [drive, setDrive] = useState<CampusDrive | null>(null);
  const [applications, setApplications] = useState<CampusApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applicationNote, setApplicationNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [userApplication, setUserApplication] = useState<CampusApplication | null>(null);

  // Fetch campus drive details
  useEffect(() => {
    const fetchDriveDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Find the drive from mock data
        const foundDrive = mockCampusDrives.find(d => d.id === id);
        
        if (!foundDrive) {
          toast.error('Campus drive not found');
          navigate('/campus-recruitment');
          return;
        }
        
        setDrive(foundDrive);
        
        // Mock applications data for company users
        if (currentUser && currentUser.role === 'company') {
          const mockApplications: CampusApplication[] = [
            {
              id: '1',
              student_id: '1',
              drive_id: id,
              status: 'pending',
              applied_at: new Date().toISOString(),
              note: 'Interested in this position',
            }
          ];
          setApplications(mockApplications);
        }
        
        // Check if current user has applied (mock check)
        if (currentUser && currentUser.role === 'student') {
          setHasApplied(false);
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
      // Mock application creation
      const newApplication: CampusApplication = {
        id: Math.random().toString(36).substr(2, 9),
        drive_id: drive.id,
        student_id: currentUser.id,
        status: 'pending',
        applied_at: new Date().toISOString(),
        note: applicationNote
      };
      
      setHasApplied(true);
      setUserApplication(newApplication);
      
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
                <AvatarImage src={drive.company.logo} alt={drive.company.name} />
                <AvatarFallback>{drive.company.name[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h1 className="text-2xl font-bold">{drive.title}</h1>
                    <p className="text-gray-600 flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {drive.company.name}
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

                <div>
                  <h3 className="text-lg font-semibold mb-2">Roles Available</h3>
                  <div className="flex flex-wrap gap-2">
                    {drive.roles.map((role, index) => (
                      <Badge key={index} variant="secondary">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {drive.requirements.map((req, index) => (
                      <li key={index} className="text-gray-700">{req}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Drive Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Salary Package</h4>
                  <p className="text-gray-600">{drive.salary}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Registration Deadline</h4>
                  <p className="text-gray-600">{format(new Date(drive.registration_deadline), 'PPP')}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Positions Available</h4>
                  <p className="text-gray-600">{drive.positions}</p>
                </div>
                {drive.application_count && (
                  <div>
                    <h4 className="font-semibold">Applications Received</h4>
                    <p className="text-gray-600">{drive.application_count}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
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
