-- Supabase Database Population Script
-- Run this in your Supabase SQL Editor to populate with mock data

-- Clear existing data (optional - uncomment if you want to start fresh)
-- DELETE FROM job_applications;
-- DELETE FROM jobs;
-- DELETE FROM students;
-- DELETE FROM companies;
-- DELETE FROM profiles;

-- Insert Companies
INSERT INTO companies (id, company_name, description, industry, location, website) VALUES
('comp-1', 'TechCorp Solutions', 'Leading technology solutions provider', 'Technology', 'Bangalore', 'https://techcorp.com'),
('comp-2', 'InnovateTech', 'Innovation-driven software company', 'Software', 'Mumbai', 'https://innovatetech.com'),
('comp-3', 'DataDriven Inc', 'Data analytics and AI solutions', 'Analytics', 'Hyderabad', 'https://datadriven.com'),
('comp-4', 'CloudTech Systems', 'Cloud infrastructure services', 'Cloud Computing', 'Pune', 'https://cloudtech.com'),
('comp-5', 'FinanceFlow', 'Financial technology solutions', 'Fintech', 'Delhi', 'https://financeflow.com')
ON CONFLICT (id) DO UPDATE SET
  company_name = EXCLUDED.company_name,
  description = EXCLUDED.description,
  industry = EXCLUDED.industry,
  location = EXCLUDED.location,
  website = EXCLUDED.website;

-- Insert Students
INSERT INTO students (id, name, email, department, year, cgpa) VALUES
('student-1', 'Rahul Sharma', 'rahul.sharma@email.com', 'Computer Science', '2024', '8.5'),
('student-2', 'Priya Patel', 'priya.patel@email.com', 'Information Technology', '2024', '9.1'),
('student-3', 'Amit Kumar', 'amit.kumar@email.com', 'Electronics', '2024', '7.8'),
('student-4', 'Sneha Reddy', 'sneha.reddy@email.com', 'Computer Science', '2024', '8.9'),
('student-5', 'Vikram Singh', 'vikram.singh@email.com', 'Mechanical', '2024', '8.2')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  department = EXCLUDED.department,
  year = EXCLUDED.year,
  cgpa = EXCLUDED.cgpa;

-- Insert Jobs
INSERT INTO jobs (id, title, company_id, description, location, salary) VALUES
('job-1', 'Software Engineer', 'comp-1', 'Develop and maintain software applications', 'Bangalore', '₹8-12 LPA'),
('job-2', 'Frontend Developer', 'comp-2', 'Build responsive web applications', 'Mumbai', '₹6-10 LPA'),
('job-3', 'Data Analyst', 'comp-3', 'Analyze data and create insights', 'Hyderabad', '₹7-11 LPA'),
('job-4', 'Backend Developer', 'comp-4', 'Develop server-side applications', 'Pune', '₹9-13 LPA'),
('job-5', 'Full Stack Developer', 'comp-5', 'Work on both frontend and backend', 'Delhi', '₹10-15 LPA')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  company_id = EXCLUDED.company_id,
  description = EXCLUDED.description,
  location = EXCLUDED.location,
  salary = EXCLUDED.salary;

-- Insert User Profiles for Authentication
INSERT INTO profiles (id, name, email, role) VALUES
('student-1', 'Rahul Sharma', 'rahul.sharma@email.com', 'student'),
('student-2', 'Priya Patel', 'priya.patel@email.com', 'student'),
('student-3', 'Amit Kumar', 'amit.kumar@email.com', 'student'),
('student-4', 'Sneha Reddy', 'sneha.reddy@email.com', 'student'),
('student-5', 'Vikram Singh', 'vikram.singh@email.com', 'student'),
('comp-1', 'TechCorp Solutions', 'hr@techcorp.com', 'company'),
('comp-2', 'InnovateTech', 'hr@innovatetech.com', 'company'),
('admin-1', 'Admin User', 'admin@university.edu', 'admin'),
('superadmin-1', 'Super Admin', 'superadmin@university.edu', 'superadmin')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  role = EXCLUDED.role;

-- Insert Sample Job Applications
INSERT INTO job_applications (id, student_id, job_id, status, applied_at, resume_url) VALUES
('app-1', 'student-1', 'job-1', 'pending', NOW() - INTERVAL '2 days', 'https://example.com/resume1.pdf'),
('app-2', 'student-1', 'job-2', 'interviewed', NOW() - INTERVAL '5 days', 'https://example.com/resume2.pdf'),
('app-3', 'student-2', 'job-1', 'approved', NOW() - INTERVAL '7 days', 'https://example.com/resume3.pdf'),
('app-4', 'student-2', 'job-3', 'pending', NOW() - INTERVAL '1 day', 'https://example.com/resume4.pdf'),
('app-5', 'student-3', 'job-4', 'rejected', NOW() - INTERVAL '10 days', 'https://example.com/resume5.pdf')
ON CONFLICT (id) DO UPDATE SET
  student_id = EXCLUDED.student_id,
  job_id = EXCLUDED.job_id,
  status = EXCLUDED.status,
  applied_at = EXCLUDED.applied_at,
  resume_url = EXCLUDED.resume_url;

-- Verify the data was inserted
SELECT 'Companies' as table_name, COUNT(*) as count FROM companies
UNION ALL
SELECT 'Students' as table_name, COUNT(*) as count FROM students
UNION ALL
SELECT 'Jobs' as table_name, COUNT(*) as count FROM jobs
UNION ALL
SELECT 'Profiles' as table_name, COUNT(*) as count FROM profiles
UNION ALL
SELECT 'Job Applications' as table_name, COUNT(*) as count FROM job_applications;

-- Show sample data
SELECT 'Sample Job Applications with Details:' as info;
SELECT 
  ja.id,
  s.name as student_name,
  j.title as job_title,
  c.company_name,
  ja.status,
  ja.applied_at
FROM job_applications ja
JOIN students s ON ja.student_id = s.id
JOIN jobs j ON ja.job_id = j.id
JOIN companies c ON j.company_id = c.id
ORDER BY ja.applied_at DESC;
