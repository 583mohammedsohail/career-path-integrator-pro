import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import StatCard from '../components/dashboard/StatCard';
import PlacementChart from '../components/dashboard/PlacementChart';
import RecentJobs from '../components/dashboard/RecentJobs';
import StudentPerformance from '../components/dashboard/StudentPerformance';
import DeveloperCredits from '../components/layout/DeveloperCredits';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  Users, 
  Building2, 
  Award, 
  Book, 
  ArrowRight,
  Calendar,
  FileText,
  Bell,
  TrendingUp,
  CheckCircle,
  Clock
} from 'lucide-react';
import { mockPlacementStats, mockJobs, mockStudents, mockCompanies } from '../data/mockData';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const FloatingImage = ({ src, alt, className }) => {
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

const FeatureCard = ({ icon: Icon, title, description }) => {
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
  const affiliatedColleges: { name: string; logo: string }[] = [
  { name: 'Ellenki College', logo: '/college-logos/ellenki.png' },
  { name: 'Bhilai Institute of Technology Durg', logo: '/college-logos/bit-durg.png' },
  { name: 'IIT Bombay', logo: '/college-logos/iit-bombay.png' },
  { name: 'IIT Delhi', logo: '/college-logos/iit-delhi.png' },
  { name: 'VIT', logo: '/college-logos/vit.png' },
  { name: 'BITS Pilani', logo: '/college-logos/bits-pilani.png' },
  { name: 'SRM University', logo: '/college-logos/srm.png' },
  { name: 'Manipal University', logo: '/college-logos/manipal.png' },
  { name: 'Amity University', logo: '/college-logos/amity.png' },
  { name: 'Christ University', logo: '/college-logos/christ.png' },
  { name: 'Shiv Nadar University', logo: '/college-logos/shiv-nadar.png' },
  { name: 'Lovely Professional University', logo: '/college-logos/lpu.png' },
];
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

        {/* Affiliated Colleges Animated Train */}
<section className="py-8 bg-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-6">
      <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 tracking-wide uppercase">
          Affiliated Colleges/University
        </h3>
    </div>
    <div className="w-full overflow-x-hidden py-2">
      <motion.div
        className="flex gap-8 min-w-full px-2"
        style={{ display: 'flex', alignItems: 'center' }}
        animate={{ x: [0, -1200] }}
        transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
      >
        {(affiliatedColleges.concat(affiliatedColleges) as { name: string; logo: string }[]).map((college, idx) => (
          <div
            key={college.name + '-' + idx}
            className="flex flex-col items-center justify-center h-20 w-36 mx-2 bg-gray-50 rounded shadow"
          >
            <img
              src={college.logo}
              alt={college.name}
              className="h-14 w-auto object-contain mb-1"
              style={{ maxWidth: 110 }}
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <span className="text-xs text-gray-700 font-semibold text-center truncate w-full" title={college.name}>{college.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </div>
</section>

{/* Testimonial Carousel */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <div className="flex flex-col items-center mb-8">
  <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 tracking-wide uppercase">Trusted by Companies</h3>
<div className="w-full overflow-x-hidden py-2">
  <motion.div
    className="flex gap-8 min-w-full px-2"
    style={{ display: 'flex', alignItems: 'center' }}
    animate={{ x: [0, -1000] }}
    transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
    onAnimationComplete={() => {}}
  >
    {[...mockCompanies, ...mockCompanies].map((company, idx) => (
      <div
        key={company.id + '-' + idx}
        className="flex items-center justify-center h-20 w-32 mx-2 bg-white rounded shadow"
      >
        <img
          src={company.logo_url}
          alt={company.company_name}
          className="h-16 w-auto object-contain"
          style={{ maxWidth: 100 }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>
    ))}
  </motion.div>
</div>
</div>
<h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
              <p className="mt-2 text-lg text-gray-600">
                Hear from students and companies who've found success with our platform
              </p>
            </div>
            
            <Carousel className="w-full max-w-4xl mx-auto">
              <CarouselContent>
                <CarouselItem>
                  <Card>
                    <CardContent className="flex flex-col items-center p-6">
                      <img
                          src="/review-avatars/ankit-sharma.jpg"
                          alt="Ankit Sharma profile photo"
                          className="w-20 h-20 rounded-full object-cover mb-4"
                        />
                      <p className="text-lg italic text-gray-700 text-center">
                        "I got placed at Infosys through my college's first ever virtual drive. The process was transparent and stress-free!"
                      </p>
                      <h4 className="mt-4 font-medium">Ankit Sharma</h4>
                      <p className="text-sm text-gray-500">B.Tech, VIT Vellore, 2024</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem>
                  <Card>
                    <CardContent className="flex flex-col items-center p-6">
                      <img
                          src="/review-avatars/priya-iyer.jpg"
                          alt="Priya Iyer profile photo"
                          className="w-20 h-20 rounded-full object-cover mb-4"
                        />
                      <p className="text-lg italic text-gray-700 text-center">
                        "The analytics dashboard helped our placement cell track every student's progress. We improved our placement rate by 30%!"
                      </p>
                      <h4 className="mt-4 font-medium">Priya Iyer</h4>
                      <p className="text-sm text-gray-500">Placement Officer, SRM University</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem>
                  <Card>
                    <CardContent className="flex flex-col items-center p-6">
                      <img
                          src="/review-avatars/rahul-verma.jpg"
                          alt="Rahul Verma profile photo"
                          className="w-20 h-20 rounded-full object-cover mb-4"
                        />
                      <p className="text-lg italic text-gray-700 text-center">
                        "Secured a core job at Tata Steel. The interview resources and notifications were a game changer!"
                      </p>
                      <h4 className="mt-4 font-medium">Rahul Verma</h4>
                      <p className="text-sm text-gray-500">B.Tech, IIT Bombay, 2023</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem>
                  <Card>
                    <CardContent className="flex flex-col items-center p-6">
                      <img
                          src="/review-avatars/sneha-patil.jpg"
                          alt="Sneha Patil profile photo"
                          className="w-20 h-20 rounded-full object-cover mb-4"
                          onError={e => { (e.target as HTMLImageElement).src = '/placeholder.svg'; (e.target as HTMLImageElement).alt = 'Sneha Patil profile photo'}}
                        />
                      <p className="text-lg italic text-gray-700 text-center">
                        "I got placed at Infosys through my college's first ever virtual drive. The process was transparent and stress-free!"
                      </p>
                      <h4 className="mt-4 font-medium">Sneha Patil</h4>
                      <p className="text-sm text-gray-500">B.Tech, VIT Vellore, 2024</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem>
                  <Card>
                    <CardContent className="flex flex-col items-center p-6">
                      <img
                          src="/review-avatars/aishwarya-menon.jpg"
                          alt="Aishwarya Menon profile photo"
                          className="w-20 h-20 rounded-full object-cover mb-4"
                          onError={e => { (e.target as HTMLImageElement).src = '/placeholder.svg'; (e.target as HTMLImageElement).alt = 'Aishwarya Menon profile photo'}}
                        />
                      <p className="text-lg italic text-gray-700 text-center">
                        "Secured a core job at Tata Steel. The interview resources and notifications were a game changer!"
                      </p>
                      <h4 className="mt-4 font-medium">Aishwarya Menon</h4>
                      <p className="text-sm text-gray-500">B.Tech, IIT Bombay, 2023</p>
                      <h4 className="mt-4 font-medium">Professor Emily Chen</h4>
                      <p className="text-sm text-gray-500">Placement Coordinator, Engineering College</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
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

        {/* Developer Credits */}
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
              <div className="text-2xl font-bold">{mockPlacementStats.totalApplications}</div>
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
              <div className="text-2xl font-bold">{mockPlacementStats.totalJobs}</div>
              <Progress value={60} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {mockJobs.filter(job => job.status === 'open').length} open positions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Placement Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((mockPlacementStats.totalPlacements / mockPlacementStats.totalStudents) * 100)}%
              </div>
              <Progress value={72} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {mockPlacementStats.totalPlacements} students placed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{mockPlacementStats.averageSalary}K</div>
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
                <CardDescription>Monthly placement statistics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <PlacementChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Job Postings</CardTitle>
                <CardDescription>Latest opportunities from top companies</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentJobs jobs={mockJobs} />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activity Feed and Quick Actions */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
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
                <CardDescription>Latest updates and notifications</CardDescription>
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

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Important dates and deadlines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    date: "June 15, 2024",
                    event: "TCS Campus Drive",
                    type: "Placement"
                  },
                  {
                    date: "June 20, 2024",
                    event: "Infosys Interview Preparation",
                    type: "Workshop"
                  },
                  {
                    date: "June 25, 2024",
                    event: "Resume Submission Deadline",
                    type: "Deadline"
                  }
                ].map((event, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{event.event}</p>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                      {event.type}
                    </span>
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
