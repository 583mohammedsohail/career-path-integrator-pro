
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Mail, Phone, MapPin, Building2, User, Shield, Camera } from 'lucide-react';
import DeveloperCredits from '../components/layout/DeveloperCredits';
import { Navigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Define user profile data structure
interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar_url?: string;
  metadata?: {
    phone?: string;
    address?: string;
    about?: string;
  };
}

const Profile = () => {
  const { currentUser, isLoading } = useAuth();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    address: '',
    about: '',
    avatar: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <p>Loading profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Get profile information from user data or use defaults
  const userMetadata = currentUser?.user_metadata || {};
  const profileInfo = {
    phone: userMetadata.phone || '+91 98765 43210',
    address: userMetadata.address || 'Hyderabad, India',
    about: userMetadata.about || `Professional with a passion for ${currentUser?.role === 'student' ? 'learning and development' : 'industry advancement'}. Looking forward to ${currentUser?.role === 'student' ? 'career opportunities' : 'collaborating with talented individuals'}.`,
  };
  
  // Open edit profile dialog and initialize form with current values
  const handleEditProfile = () => {
    setProfileForm({
      name: currentUser?.name || '',
      phone: profileInfo.phone,
      address: profileInfo.address,
      about: profileInfo.about,
      avatar: currentUser?.avatar_url || ''
    });
    setIsEditProfileOpen(true);
  };
  
  // Handle profile form input changes
  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Save updated profile
  const handleSaveProfile = async () => {
    if (!currentUser?.id) return;
    
    setIsSubmitting(true);
    try {
      // Update user metadata in Supabase Auth
      const { error } = await supabase.auth.updateUser({
        data: {
          name: profileForm.name,
          phone: profileForm.phone,
          address: profileForm.address,
          about: profileForm.about
        }
      });
      
      if (error) throw error;
      
      // Update avatar in profiles table if needed
      if (profileForm.avatar && profileForm.avatar !== currentUser?.avatar_url) {
        const { error: avatarError } = await supabase
          .from('profiles')
          .update({
            avatar_url: profileForm.avatar
          })
          .eq('id', currentUser.id);
          
        if (avatarError) throw avatarError;
      }
      
      toast.success('Profile updated successfully');
      setIsEditProfileOpen(false);
      
      // Refresh the page to show updated profile
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render different content based on user role
  const renderRoleSpecificContent = () => {
    switch (currentUser.role) {
      case 'student':
        return (
          <>
            <TabsContent value="education">
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">B.Tech in Computer Science</h3>
                      </div>
                      <div className="ml-7">
                        <p className="text-gray-600">Great Learning University</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span>2021-2025</span>
                          <span>CGPA: 8.5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="applications">
              <Card>
                <CardHeader>
                  <CardTitle>Job Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Your recent job applications will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        );
      case 'company':
        return (
          <>
            <TabsContent value="company">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">{currentUser.name}</h3>
                    </div>
                    <p className="text-gray-600">
                      Leading technology company specializing in IT services and business solutions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="jobs">
              <Card>
                <CardHeader>
                  <CardTitle>Posted Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Your job postings will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        );
      case 'admin':
      case 'management':
      case 'superadmin':
        return (
          <>
            <TabsContent value="management">
              <Card>
                <CardHeader>
                  <CardTitle>Administrative Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">{currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}</h3>
                    </div>
                    <p className="text-gray-600">
                      Access to administrative functions and system management tools.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-16rem)]">
        {/* Header Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                <p className="text-gray-600 capitalize">{currentUser.role}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {currentUser.email}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {profileInfo.phone}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {profileInfo.address}
                  </Badge>
                </div>
              </div>
              <Button 
                className="flex items-center gap-2"
                onClick={handleEditProfile}
              >
                <User className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="about" className="space-y-4">
          <TabsList>
            <TabsTrigger value="about">About</TabsTrigger>
            {currentUser.role === 'student' && (
              <>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
              </>
            )}
            {currentUser.role === 'company' && (
              <>
                <TabsTrigger value="company">Company</TabsTrigger>
                <TabsTrigger value="jobs">Posted Jobs</TabsTrigger>
              </>
            )}
            {(currentUser.role === 'admin' || currentUser.role === 'management' || currentUser.role === 'superadmin') && (
              <TabsTrigger value="management">Administration</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{profileInfo.about}</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Role-specific content */}
          {renderRoleSpecificContent()}
        </Tabs>
        {/* Developer Credits */}
        <div className="mt-8">
          <DeveloperCredits />
        </div>
      </div>
      
      {/* Edit Profile Dialog */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-2 mb-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profileForm.avatar} alt={profileForm.name} />
                <AvatarFallback>{profileForm.name ? profileForm.name[0].toUpperCase() : 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2">
                <Label htmlFor="avatar" className="cursor-pointer text-sm text-primary flex items-center gap-1">
                  <Camera className="h-4 w-4" />
                  Change Photo
                </Label>
                <Input 
                  id="avatar" 
                  name="avatar" 
                  className="hidden" 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // For simplicity, we're just using a URL input instead of actual file upload
                      // In a real app, you would upload the file to storage and get the URL
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        if (event.target?.result) {
                          setProfileForm(prev => ({
                            ...prev,
                            avatar: event.target?.result as string
                          }));
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <Input
                  name="avatar"
                  placeholder="Or enter image URL"
                  value={profileForm.avatar}
                  onChange={handleProfileInputChange}
                  className="text-xs"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={profileForm.name}
                onChange={handleProfileInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={profileForm.phone}
                onChange={handleProfileInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Location
              </Label>
              <Input
                id="address"
                name="address"
                value={profileForm.address}
                onChange={handleProfileInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="about" className="text-right">
                About
              </Label>
              <Textarea
                id="about"
                name="about"
                value={profileForm.about}
                onChange={handleProfileInputChange}
                className="col-span-3"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditProfileOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveProfile} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <DeveloperCredits />
    </Layout>
  );
};

export default Profile;
