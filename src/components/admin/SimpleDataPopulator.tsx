import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { Database, Upload, CheckCircle, AlertCircle, Loader2, Copy } from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';

const SimpleDataPopulator: React.FC = () => {
  const [isPopulating, setIsPopulating] = useState(false);
  const [populationResult, setPopulationResult] = useState<any>(null);

  const populateBasicData = async () => {
    setIsPopulating(true);
    toast.info('Populating database with mock data...');
    
    try {
      // 1. Insert Companies
      const companies = [
        { id: 'comp-1', company_name: 'TechCorp Solutions', description: 'Leading technology solutions provider', industry: 'Technology', location: 'Bangalore', website: 'https://techcorp.com' },
        { id: 'comp-2', company_name: 'InnovateTech', description: 'Innovation-driven software company', industry: 'Software', location: 'Mumbai', website: 'https://innovatetech.com' },
        { id: 'comp-3', company_name: 'DataDriven Inc', description: 'Data analytics and AI solutions', industry: 'Analytics', location: 'Hyderabad', website: 'https://datadriven.com' },
        { id: 'comp-4', company_name: 'CloudTech Systems', description: 'Cloud infrastructure services', industry: 'Cloud Computing', location: 'Pune', website: 'https://cloudtech.com' },
        { id: 'comp-5', company_name: 'FinanceFlow', description: 'Financial technology solutions', industry: 'Fintech', location: 'Delhi', website: 'https://financeflow.com' }
      ];

      const { error: companiesError } = await supabase
        .from('companies')
        .upsert(companies, { onConflict: 'id' });

      if (companiesError) throw companiesError;

      // 2. Insert Students
      const students = [
        { id: 'student-1', name: 'Rahul Sharma', email: 'rahul.sharma@email.com', department: 'Computer Science', year: '2024', cgpa: '8.5' },
        { id: 'student-2', name: 'Priya Patel', email: 'priya.patel@email.com', department: 'Information Technology', year: '2024', cgpa: '9.1' },
        { id: 'student-3', name: 'Amit Kumar', email: 'amit.kumar@email.com', department: 'Electronics', year: '2024', cgpa: '7.8' },
        { id: 'student-4', name: 'Sneha Reddy', email: 'sneha.reddy@email.com', department: 'Computer Science', year: '2024', cgpa: '8.9' },
        { id: 'student-5', name: 'Vikram Singh', email: 'vikram.singh@email.com', department: 'Mechanical', year: '2024', cgpa: '8.2' }
      ];

      const { error: studentsError } = await supabase
        .from('students')
        .upsert(students, { onConflict: 'id' });

      if (studentsError) throw studentsError;

      // 3. Insert Jobs
      const jobs = [
        { id: 'job-1', title: 'Software Engineer', company_id: 'comp-1', description: 'Develop and maintain software applications', location: 'Bangalore', salary: '₹8-12 LPA' },
        { id: 'job-2', title: 'Frontend Developer', company_id: 'comp-2', description: 'Build responsive web applications', location: 'Mumbai', salary: '₹6-10 LPA' },
        { id: 'job-3', title: 'Data Analyst', company_id: 'comp-3', description: 'Analyze data and create insights', location: 'Hyderabad', salary: '₹7-11 LPA' },
        { id: 'job-4', title: 'Backend Developer', company_id: 'comp-4', description: 'Develop server-side applications', location: 'Pune', salary: '₹9-13 LPA' },
        { id: 'job-5', title: 'Full Stack Developer', company_id: 'comp-5', description: 'Work on both frontend and backend', location: 'Delhi', salary: '₹10-15 LPA' }
      ];

      const { error: jobsError } = await supabase
        .from('jobs')
        .upsert(jobs, { onConflict: 'id' });

      if (jobsError) throw jobsError;

      // 4. Insert Profiles
      const profiles = [
        { id: 'student-1', name: 'Rahul Sharma', email: 'rahul.sharma@email.com', role: 'student' },
        { id: 'student-2', name: 'Priya Patel', email: 'priya.patel@email.com', role: 'student' },
        { id: 'student-3', name: 'Amit Kumar', email: 'amit.kumar@email.com', role: 'student' },
        { id: 'student-4', name: 'Sneha Reddy', email: 'sneha.reddy@email.com', role: 'student' },
        { id: 'student-5', name: 'Vikram Singh', email: 'vikram.singh@email.com', role: 'student' },
        { id: 'comp-1', name: 'TechCorp Solutions', email: 'hr@techcorp.com', role: 'company' },
        { id: 'comp-2', name: 'InnovateTech', email: 'hr@innovatetech.com', role: 'company' },
        { id: 'admin-1', name: 'Admin User', email: 'admin@university.edu', role: 'admin' },
        { id: 'superadmin-1', name: 'Super Admin', email: 'superadmin@university.edu', role: 'superadmin' }
      ];

      const { error: profilesError } = await supabase
        .from('profiles')
        .upsert(profiles, { onConflict: 'id' });

      if (profilesError) throw profilesError;

      // 5. Insert Sample Job Applications
      const applications = [
        { id: 'app-1', student_id: 'student-1', job_id: 'job-1', status: 'pending', applied_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), resume_url: 'https://example.com/resume1.pdf' },
        { id: 'app-2', student_id: 'student-1', job_id: 'job-2', status: 'interviewed', applied_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), resume_url: 'https://example.com/resume2.pdf' },
        { id: 'app-3', student_id: 'student-2', job_id: 'job-1', status: 'approved', applied_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), resume_url: 'https://example.com/resume3.pdf' },
        { id: 'app-4', student_id: 'student-2', job_id: 'job-3', status: 'pending', applied_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), resume_url: 'https://example.com/resume4.pdf' },
        { id: 'app-5', student_id: 'student-3', job_id: 'job-4', status: 'rejected', applied_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), resume_url: 'https://example.com/resume5.pdf' }
      ];

      const { error: applicationsError } = await supabase
        .from('job_applications')
        .upsert(applications, { onConflict: 'id' });

      if (applicationsError) throw applicationsError;

      const result = {
        success: true,
        message: 'All mock data populated successfully!',
        counts: {
          companies: companies.length,
          students: students.length,
          jobs: jobs.length,
          profiles: profiles.length,
          applications: applications.length
        }
      };

      setPopulationResult(result);
      toast.success('🎉 Database populated successfully!');

    } catch (error: any) {
      console.error('Error populating database:', error);
      const result = {
        success: false,
        message: error.message || 'Failed to populate database',
        error
      };
      setPopulationResult(result);
      toast.error('Failed to populate database: ' + error.message);
    } finally {
      setIsPopulating(false);
    }
  };

  const copyTestCredentials = () => {
    const credentials = `Test Student Credentials:
Email: rahul.sharma@email.com
Password: test123

Email: priya.patel@email.com  
Password: test123

You can now login with these credentials and see real job applications!`;
    
    navigator.clipboard.writeText(credentials);
    toast.success('Test credentials copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Database Population Tool
          </CardTitle>
          <CardDescription>
            Populate your Supabase database with mock data to enable real-time functionality.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Button
              onClick={populateBasicData}
              disabled={isPopulating}
              className="flex items-center gap-2"
            >
              {isPopulating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {isPopulating ? 'Populating...' : 'Populate Database'}
            </Button>
            
            <Button
              onClick={copyTestCredentials}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy Test Credentials
            </Button>
          </div>

          {populationResult && (
            <div className="mt-4 p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                {populationResult.success ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <span className={`font-medium ${populationResult.success ? 'text-green-700' : 'text-red-700'}`}>
                  {populationResult.message}
                </span>
              </div>
              
              {populationResult.success && populationResult.counts && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
                  <Badge variant="secondary" className="justify-center">
                    Companies: {populationResult.counts.companies}
                  </Badge>
                  <Badge variant="secondary" className="justify-center">
                    Students: {populationResult.counts.students}
                  </Badge>
                  <Badge variant="secondary" className="justify-center">
                    Jobs: {populationResult.counts.jobs}
                  </Badge>
                  <Badge variant="secondary" className="justify-center">
                    Profiles: {populationResult.counts.profiles}
                  </Badge>
                  <Badge variant="secondary" className="justify-center">
                    Applications: {populationResult.counts.applications}
                  </Badge>
                </div>
              )}
            </div>
          )}

          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>What this will populate:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>5 Companies (TechCorp, InnovateTech, DataDriven, etc.)</li>
              <li>5 Students with profiles</li>
              <li>5 Job postings from different companies</li>
              <li>User profiles for authentication</li>
              <li>5 Sample job applications with different statuses</li>
            </ul>
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-medium">
                🎯 After populating, you can login as:
              </p>
              <p className="text-blue-700 text-sm mt-1">
                <strong>Email:</strong> rahul.sharma@email.com<br/>
                <strong>Password:</strong> test123
              </p>
              <p className="text-blue-600 text-xs mt-2">
                This student will have real job applications to view in the dashboard!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleDataPopulator;
