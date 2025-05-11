
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Mail, Phone, MapPin, Building2, User, Shield } from 'lucide-react';
import DeveloperCredits from '../components/layout/DeveloperCredits';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser, isLoading } = useAuth();

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

  // Mock additional profile information
  const profileInfo = {
    phone: '+91 98765 43210',
    address: 'Hyderabad, India',
    about: `Professional with a passion for ${currentUser.role === 'student' ? 'learning and development' : 'industry advancement'}. Looking forward to ${currentUser.role === 'student' ? 'career opportunities' : 'collaborating with talented individuals'}.`,
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
              <Button className="flex items-center gap-2">
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
    </Layout>
  );
};

export default Profile;
