import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import PlacementChart from '@/components/dashboard/PlacementChart';
import RecentJobs from '@/components/dashboard/RecentJobs';
import DeveloperCredits from '@/components/layout/DeveloperCredits';
import { 
  ArrowRight, 
  Users, 
  Briefcase, 
  TrendingUp,
  GraduationCap,
  Building2,
  Star,
  CheckCircle,
  Clock,
  Target,
  FileText,
  Bell,
  Award,
  Book
} from 'lucide-react';
import { mockJobs } from '@/data/mockData';
import { PlacementStats } from '@/types/placement';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

// Mock statistics
const mockStats: PlacementStats = {
  totalStudents: 847,
  totalJobs: 156,
  totalPlacements: 665,
  placementRate: 78.5
};

const FloatingImage = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={`rounded-lg shadow-lg ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6 }
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.2 }
      }}
    />
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const Index = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // If not logged in, show landing page
  if (!currentUser) {
    return (
      <Layout>
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    College Placement Management System
                  </h1>
                  <p className="mt-4 text-lg text-gray-600">
                    Streamline the campus recruitment process and connect students 
                    with their dream careers. A comprehensive platform for students, 
                    companies, and placement administrators.
                  </p>
                  <div className="mt-8 space-x-4">
                    <Button size="lg" onClick={() => navigate('/login')}>
                      Get Started
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => navigate('/register')}>
                      Learn More
                    </Button>
                  </div>
                </motion.div>
              </div>
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Students in discussion"
                    className="rounded-lg shadow-lg w-full z-10 relative"
                  />
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl z-0"></div>
                  <div className="absolute -top-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-xl z-0"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                  Our platform offers comprehensive tools to make the placement process seamless for all stakeholders.
                </p>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={Users}
                title="Student Profiles"
                description="Create detailed profiles showcasing academic achievements, skills, and upload resumes for companies to view."
              />
              <FeatureCard 
                icon={Briefcase}
                title="Job Listings"
                description="Browse available job opportunities, filter by criteria, and apply directly through the platform."
              />
              <FeatureCard 
                icon={Building2}
                title="Company Management"
                description="Companies can post jobs, review applications, and communicate with candidates all in one place."
              />
              <FeatureCard 
                icon={Book}
                title="Resources"
                description="Access interview tips, resume templates, and career guidance materials to help prepare for job applications."
              />
              <FeatureCard 
                icon={Award}
                title="Analytics"
                description="Track placement statistics, trends, and performance metrics to measure success and identify areas for improvement."
              />
              <FeatureCard 
                icon={ArrowRight}
                title="Seamless Process"
                description="From application to offer, manage the entire recruitment process with automated notifications and status tracking."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
              <p className="mt-4 text-lg text-primary-foreground max-w-2xl mx-auto">
                Join our platform today and take the first step towards your career success.
              </p>
              <div className="mt-8">
                <Button size="lg" variant="secondary" onClick={() => navigate('/register')}>
                  Create an Account
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <DeveloperCredits />
      </Layout>
    );
  }
  
  // Dashboard for logged-in users
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {currentUser.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your placement activities
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(mockJobs.length * 45).toLocaleString()}</div>
              <Progress value={75} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                +20% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalJobs}</div>
              <Progress value={60} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {mockJobs.filter(job => job.status === 'active').length} currently open
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Placement Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.placementRate}%</div>
              <Progress value={mockStats.placementRate} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {mockStats.totalPlacements} students placed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹8.5L</div>
              <Progress value={85} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                +15% from last year
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts and Stats */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Placement Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <PlacementChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Job Postings</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentJobs />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activity Feed and Quick Actions */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/jobs')}>
                  <Briefcase className="mr-2 h-4 w-4" />
                  Browse Jobs
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/companies')}>
                  <Building2 className="mr-2 h-4 w-4" />
                  View Companies
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/students')}>
                  <Users className="mr-2 h-4 w-4" />
                  Student Directory
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/profile')}>
                  <FileText className="mr-2 h-4 w-4" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
                    text: "New placement recorded for Sarah Williams",
                    time: "2 hours ago"
                  },
                  {
                    icon: <Bell className="h-4 w-4 text-blue-500" />,
                    text: "TCS posted 3 new job openings",
                    time: "4 hours ago"
                  },
                  {
                    icon: <Clock className="h-4 w-4 text-orange-500" />,
                    text: "Upcoming placement drive: Infosys",
                    time: "1 day ago"
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="mt-1">{activity.icon}</div>
                    <div>
                      <p className="text-sm font-medium">{activity.text}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;