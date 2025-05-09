
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import StatCard from '../components/dashboard/StatCard';
import PlacementChart from '../components/dashboard/PlacementChart';
import RecentJobs from '../components/dashboard/RecentJobs';
import StudentPerformance from '../components/dashboard/StudentPerformance';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, Building2, Award, Book, ArrowRight } from 'lucide-react';
import { mockPlacementStats, mockJobs, mockStudents } from '../data/mockData';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

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

        {/* Testimonial Carousel */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
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
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
                        alt="Student profile"
                        className="w-20 h-20 rounded-full object-cover mb-4"
                      />
                      <p className="text-lg italic text-gray-700 text-center">
                        "Thanks to this platform, I secured my dream job at Google. The process was seamless and I received multiple offers!"
                      </p>
                      <h4 className="mt-4 font-medium">Sarah Johnson</h4>
                      <p className="text-sm text-gray-500">Computer Science Graduate, 2024</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem>
                  <Card>
                    <CardContent className="flex flex-col items-center p-6">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
                        alt="Corporate profile"
                        className="w-20 h-20 rounded-full object-cover mb-4"
                      />
                      <p className="text-lg italic text-gray-700 text-center">
                        "As a hiring manager, this platform has simplified our campus recruitment efforts. We found top talent quickly and efficiently."
                      </p>
                      <h4 className="mt-4 font-medium">David Williams</h4>
                      <p className="text-sm text-gray-500">HR Director, Tech Innovations Inc.</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem>
                  <Card>
                    <CardContent className="flex flex-col items-center p-6">
                      <img
                        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
                        alt="Faculty profile"
                        className="w-20 h-20 rounded-full object-cover mb-4"
                      />
                      <p className="text-lg italic text-gray-700 text-center">
                        "Managing campus placements used to be a nightmare. This system has transformed our process completely!"
                      </p>
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
      </Layout>
    );
  }
  
  // Dashboard for logged in users
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold">Welcome, {currentUser.name}!</h1>
          <p className="text-gray-600 mt-1">Here's what's happening with placements</p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <StatCard 
              title="Total Students" 
              value={mockPlacementStats.totalStudents} 
              icon={Users}
              change={{ value: 12, positive: true }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <StatCard 
              title="Companies" 
              value={mockPlacementStats.totalCompanies} 
              icon={Building2}
              change={{ value: 8, positive: true }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <StatCard 
              title="Job Openings" 
              value={mockPlacementStats.totalJobs} 
              icon={Briefcase}
              change={{ value: 5, positive: true }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <StatCard 
              title="Placements" 
              value={mockPlacementStats.totalPlacements} 
              icon={Award}
              description={`Avg. Salary: $${mockPlacementStats.averageSalary.toLocaleString()}`}
              change={{ value: 15, positive: true }}
            />
          </motion.div>
        </div>

        {/* Floating Images Section */}
        <div className="relative mt-8 mb-8 py-6 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-50 to-purple-50 opacity-50 rounded-xl"></div>
          
          <div className="relative z-10 flex justify-center">
            <div className="grid grid-cols-3 gap-4 max-w-4xl">
              <FloatingImage 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Students collaborating"
                className="col-span-1"
              />
              <FloatingImage 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Business meeting"
                className="col-span-2"
              />
              <FloatingImage 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Corporate workspace"
                className="col-span-2"
              />
              <FloatingImage 
                src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Student interview"
                className="col-span-1"
              />
            </div>
          </div>
        </div>

        {/* Charts & Tables */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-3"
          >
            <PlacementChart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-3"
          >
            <RecentJobs jobs={mockJobs} />
          </motion.div>
        </div>

        {/* Student Performance */}
        <div className="mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <StudentPerformance students={mockStudents} />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
