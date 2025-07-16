import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, MapPin, Calendar, Users, Building, User, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';

// Import types
import { mockCampusDrives } from '@/data/mockCampusDrives';

// Define the company structure as it appears in the mock data
interface MockCompany {
  id: string;
  name?: string;
  company_name?: string;
  logo?: string;
  avatar_url?: string;
  location?: string;
  size?: string;
  description?: string;
}

// Define the structure of the mock campus drive data
interface MockCampusDrive {
  id: string;
  title: string;
  company: MockCompany;
  location: string;
  date: string;
  registrationDeadline: string;
  positions: number;
  roles: string[];
  eligibility: string;
  salary: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  description: string;
  requirements: string[];
  applicationCount?: number;
  registeredStudents?: string[];
}

// Extended campus drive interface for our component
interface ExtendedCampusDrive {
  id: string;
  title: string;
  company_id?: string;
  company_name?: string;
  company_logo?: string | null;
  location: string;
  date: string;
  registration_deadline?: string;
  registrationDeadline?: string;
  positions: number;
  roles: string[];
  eligibility_criteria?: string;
  eligibility?: string;
  salary: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  description: string;
  requirements: string[];
  application_count?: number;
  applicationCount?: number;
  registered_students?: string[];
  registeredStudents?: string[];
  created_at?: string;
  company?: MockCompany;
}

// Extended application interface with student info
interface ExtendedApplication {
  id: string;
  drive_id: string;
  student_id: string;
  status: 'pending' | 'shortlisted' | 'rejected' | 'interview' | 'selected';
  note?: string | null;
  resume_url?: string | null;
  applied_at: string;
  updated_at?: string; // Make optional since it might be missing in some data
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
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [resumePreview, setResumePreview] = useState<string | null>(null);

  // Fetch campus drive details
  useEffect(() => {
    const fetchDriveDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Find the drive from mock data
        const foundDrive = mockCampusDrives.find(d => d.id === id) as unknown as MockCampusDrive;
        
        if (foundDrive) {
          // Create extended drive with company info
          const extendedDrive: ExtendedCampusDrive = {
            ...foundDrive,
            company_name: foundDrive.company?.name || '',
            company_logo: foundDrive.company?.logo || null,
            company: foundDrive.company
          };
          
          setDrive(extendedDrive);
        } else {
          toast.error('Campus drive not found');
          navigate('/campus-recruitment');
          return;
        }
        
        // Mock applications data for company users
        if (currentUser && currentUser.role === 'company') {
          // Add some mock applications
          const mockApplications = [
            {
              id: '1',
              student_id: '1',
              drive_id: id,
              status: 'pending' as const,
              applied_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              note: 'Interested in this position',
              student: {
                name: 'John Doe',
                email: 'john@example.com',
                avatar_url: null,
                user_metadata: {}
              }
            },
            {
              id: '2',
              student_id: '2',
              drive_id: id,
              status: 'shortlisted' as const,
              applied_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
              updated_at: new Date().toISOString(),
              note: 'Strong candidate with good skills',
              student: {
                name: 'Jane Smith',
                email: 'jane@example.com',
                avatar_url: 'https://ui-avatars.com/api/?name=Jane+Smith',
                user_metadata: {}
              }
            }
          ];
          setApplications(mockApplications);
        }
        
        // Check if current user has applied (mock check)
        if (currentUser && currentUser.role === 'student') {
          // For demo purposes, assume no application exists
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // File validation
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        toast.error('Please upload a PDF or Word document');
        return;
      }
      
      setResumeFile(file);
      
      // Generate preview for PDF
      if (file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = (e) => {
          setResumePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        // For Word docs, we'll show a generic preview
        setResumePreview(null);
      }
    }
  };

  const handleApply = async () => {
    if (!resumeFile) {
      toast.error('Please upload your resume');
      return;
    }

    setIsSubmitting(true);
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('driveId', id || '');
      formData.append('note', applicationNote);
      
      let token = '';
      if (currentUser) {
        // For Firebase:
        // token = await currentUser.getIdToken();
        // For custom JWT:
        // token = currentUser.token;
        // For demo purposes:
        token = 'demo-token';
      }

      const response = await fetch('/api/applications/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Upload failed');
      
      toast.success('Application submitted successfully!');
      setIsApplyModalOpen(false);
      setResumeFile(null);
      setApplicationNote('');
      setHasApplied(true);
    } catch (error) {
      console.error('Error applying:', error);
      toast.error('Failed to submit application');
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
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
                <AvatarImage 
                  src={drive.company?.avatar_url || drive.company?.logo || drive.company_logo || undefined} 
                  alt={drive.company?.company_name || drive.company?.name || drive.company_name || 'Company'} 
                />
                <AvatarFallback>
                  {(drive.company?.company_name || drive.company?.name || drive.company_name || 'C')[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h1 className="text-2xl font-bold">{drive.title}</h1>
                    <p className="text-gray-600 flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {drive.company?.company_name || drive.company?.name || drive.company_name || 'Company'}
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
                    {drive.date ? format(new Date(drive.date), 'PPP') : 'Date not specified'}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    {drive.positions} {drive.positions === 1 ? 'position' : 'positions'} available
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    Posted {drive.created_at ? format(new Date(drive.created_at), 'PP') : 'Unknown date'}
                  </div>
                </div>
              </div>
              {currentUser && currentUser.role === 'student' && drive.status !== 'completed' && (
                <div>
                  {hasApplied ? (
                    <div className="flex flex-col items-center gap-2">
                      <Badge variant={
                        'secondary'
                      } className="px-3 py-1">
                        Application Pending
                      </Badge>
                      <p className="text-xs text-gray-500">Applied on {new Date().toISOString()}</p>
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
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{drive.company?.name}</h3>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{drive.company?.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{drive.company?.size} employees</span>
                  </div>
                  <p className="text-sm text-gray-600">{drive.company?.description}</p>
                </div>
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
                            <p className="text-xs text-gray-500">Applied on {application.applied_at ? format(new Date(application.applied_at), 'PP') : 'Unknown date'}</p>
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
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Submit Your Application</DialogTitle>
            <DialogDescription>
              Complete your application by uploading your resume and adding any notes.
              <span className="text-red-500 block mt-1">* Resume (PDF or Word) is required</span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="resume" className="block">
                Upload Resume *
                <span className="text-sm font-normal text-gray-500 block">
                  PDF or Word document (max 5MB)
                </span>
              </Label>
              <input
                type="file"
                id="resume"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
              {resumeFile && (
                <p className="text-sm text-green-600 mt-1">
                  Selected: {resumeFile.name}
                </p>
              )}
            </div>
            {resumePreview && (
              <div className="mt-4 border rounded-md p-4 bg-gray-50">
                <h4 className="text-sm font-medium mb-2">Resume Preview</h4>
                <iframe 
                  src={resumePreview} 
                  className="w-full h-64 border rounded"
                  title="Resume Preview"
                />
              </div>
            )}
            
            {resumeFile && !resumePreview && (
              <div className="mt-4 border rounded-md p-4 bg-gray-50">
                <h4 className="text-sm font-medium mb-2">Resume Uploaded</h4>
                <p className="text-sm text-gray-600">
                  Preview not available for Word documents. File ready for submission.
                </p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="note">Additional Notes (Optional)</Label>
              <Textarea
                id="note"
                value={applicationNote}
                onChange={(e) => setApplicationNote(e.target.value)}
                placeholder="Add any additional information for the recruiter..."
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApplyModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleApply} 
              disabled={isSubmitting || isUploading || !resumeFile}
            >
              {isSubmitting || isUploading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </span>
              ) : 'Submit Application'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default CampusDriveDetails;
