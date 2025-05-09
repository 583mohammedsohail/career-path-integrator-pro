
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
              </div>
              <div className="lg:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Students in discussion"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform offers comprehensive tools to make the placement process seamless for all stakeholders.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Student Profiles</h3>
                <p className="text-gray-600">
                  Create detailed profiles showcasing academic achievements, skills, and upload resumes 
                  for companies to view.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Job Listings</h3>
                <p className="text-gray-600">
                  Browse available job opportunities, filter by criteria, and apply directly 
                  through the platform.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Company Management</h3>
                <p className="text-gray-600">
                  Companies can post jobs, review applications, and communicate with candidates 
                  all in one place.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Book className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Resources</h3>
                <p className="text-gray-600">
                  Access interview tips, resume templates, and career guidance materials
                  to help prepare for job applications.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Analytics</h3>
                <p className="text-gray-600">
                  Track placement statistics, trends, and performance metrics to measure
                  success and identify areas for improvement.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Seamless Process</h3>
                <p className="text-gray-600">
                  From application to offer, manage the entire recruitment process with
                  automated notifications and status tracking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
            <p className="mt-4 text-lg text-primary-foreground max-w-2xl mx-auto">
              Join our platform today and take the first step towards your career success.
            </p>
            <div className="mt-8">
              <Button size="lg" variant="secondary" onClick={() => navigate('/register')}>
                Create an Account
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
  
  // Dashboard for logged in users
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Welcome, {currentUser.name}!</h1>
        <p className="text-gray-600 mt-1">Here's what's happening with placements</p>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <StatCard 
            title="Total Students" 
            value={mockPlacementStats.totalStudents} 
            icon={Users}
            change={{ value: 12, positive: true }}
          />
          <StatCard 
            title="Companies" 
            value={mockPlacementStats.totalCompanies} 
            icon={Building2}
            change={{ value: 8, positive: true }}
          />
          <StatCard 
            title="Job Openings" 
            value={mockPlacementStats.totalJobs} 
            icon={Briefcase}
            change={{ value: 5, positive: true }}
          />
          <StatCard 
            title="Placements" 
            value={mockPlacementStats.totalPlacements} 
            icon={Award}
            description={`Avg. Salary: $${mockPlacementStats.averageSalary.toLocaleString()}`}
            change={{ value: 15, positive: true }}
          />
        </div>

        {/* Charts & Tables */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <PlacementChart />
          <RecentJobs jobs={mockJobs} />
        </div>

        {/* Student Performance */}
        <div className="mt-8">
          <StudentPerformance students={mockStudents} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
