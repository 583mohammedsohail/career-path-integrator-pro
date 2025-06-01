
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Briefcase, 
  Calendar, 
  CheckCircle, 
  Clock, 
  GraduationCap, 
  Target,
  TrendingUp,
  Users,
  Award,
  Bell,
  RefreshCw
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for real-time updates
const mockApplications = [
  {
    id: '1',
    jobTitle: 'Software Engineer',
    company: 'Google',
    appliedDate: '2025-06-01',
    status: 'pending',
    salary: '₹18-25 LPA',
    location: 'Bangalore'
  },
  {
    id: '2',
    jobTitle: 'Full Stack Developer',
    company: 'Microsoft',
    appliedDate: '2025-05-28',
    status: 'interviewed',
    salary: '₹16-22 LPA',
    location: 'Hyderabad'
  },
  {
    id: '3',
    jobTitle: 'Data Scientist',
    company: 'Amazon',
    appliedDate: '2025-05-25',
    status: 'approved',
    salary: '₹15-20 LPA',
    location: 'Mumbai'
  }
];

const mockRecommendations = [
  {
    id: '1',
    title: 'Frontend Developer - React',
    company: 'Flipkart',
    match: 95,
    salary: '₹12-18 LPA',
    location: 'Bangalore'
  },
  {
    id: '2',
    title: 'DevOps Engineer',
    company: 'Paytm',
    match: 87,
    salary: '₹14-20 LPA',
    location: 'Noida'
  },
  {
    id: '3',
    title: 'Mobile App Developer',
    company: 'Zomato',
    match: 82,
    salary: '₹10-16 LPA',
    location: 'Gurgaon'
  }
];

const StudentDashboard = () => {
  const { currentUser, isLoading } = useAuth();
  const [applications, setApplications] = useState(mockApplications);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate status updates
      setApplications(prev => 
        prev.map(app => {
          if (Math.random() < 0.1) { // 10% chance of status change
            const statuses = ['pending', 'interviewed', 'approved', 'rejected'];
            const currentIndex = statuses.indexOf(app.status);
            const nextStatus = statuses[Math.min(currentIndex + 1, statuses.length - 1)];
            return { ...app, status: nextStatus };
          }
          return app;
        })
      );
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-md w-3/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-md"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!currentUser || currentUser.role !== 'student') {
    return <Navigate to="/login" replace />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'interviewed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'interviewed':
        return <Users className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const approvedCount = applications.filter(app => app.status === 'approved').length;
  const interviewedCount = applications.filter(app => app.status === 'interviewed').length;
  const pendingCount = applications.filter(app => app.status === 'pending').length;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {currentUser.name}!</h1>
            <p className="text-gray-600 mt-1">
              {currentUser.course} in {currentUser.department} • Year {currentUser.year}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 text-sm text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live Updates
              </div>
              <span className="text-xs text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          </div>
          <Button
            onClick={refreshData}
            disabled={isRefreshing}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interviews</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{interviewedCount}</div>
              <p className="text-xs text-muted-foreground">
                +1 this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Offers Received</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedCount}</div>
              <p className="text-xs text-muted-foreground">
                Success rate: {Math.round((approvedCount / applications.length) * 100)}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CGPA</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentUser.cgpa}</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(currentUser.cgpa || 0) * 10}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="applications" className="space-y-4">
          <TabsList>
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              My Applications
              {pendingCount > 0 && (
                <Badge variant="secondary" className="ml-1">{pendingCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Recommendations
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Job Applications
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Real-time
                      </div>
                    </CardTitle>
                    <CardDescription>Track your job application status in real-time</CardDescription>
                  </div>
                  <Bell className="h-5 w-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                {applications.length > 0 ? (
                  <div className="space-y-4">
                    {applications.map((application) => (
                      <div key={application.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">{application.jobTitle}</h3>
                              <Badge className={getStatusColor(application.status)}>
                                <div className="flex items-center gap-1">
                                  {getStatusIcon(application.status)}
                                  {application.status}
                                </div>
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-1">{application.company}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>📍 {application.location}</span>
                              <span>💰 {application.salary}</span>
                              <span>📅 Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Briefcase className="mx-auto h-12 w-12 mb-4" />
                    <p>No applications yet. Start applying to jobs to see them here!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Recommended Jobs
                </CardTitle>
                <CardDescription>Jobs that match your skills and profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecommendations.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                          <p className="text-gray-600 mb-2">{job.company}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <span>📍 {job.location}</span>
                            <span>💰 {job.salary}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Match:</span>
                            <Progress value={job.match} className="w-20 h-2" />
                            <span className="text-sm text-green-600 font-medium">{job.match}%</span>
                          </div>
                        </div>
                        <Button size="sm">Apply Now</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Academic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Course</label>
                    <p className="text-lg">{currentUser.course}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Department</label>
                    <p className="text-lg">{currentUser.department}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Year</label>
                    <p className="text-lg">{currentUser.year}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">CGPA</label>
                    <p className="text-lg">{currentUser.cgpa}/10</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.skills?.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    )) || <p className="text-gray-500">No skills added yet</p>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
