# Campus Recruitment Feature - Setup Guide

This document provides instructions for setting up the Campus Recruitment feature in the Career Path Integrator platform.

## Overview

The Campus Recruitment feature allows:
- Companies to create and manage campus recruitment drives
- Students to browse and apply for campus recruitment opportunities
- Companies to shortlist candidates, schedule interviews, and select students

## Database Setup

To set up the necessary database tables and policies in Supabase:

1. Navigate to the Supabase dashboard for your project
2. Go to the SQL Editor
3. Copy the contents of the `campus_recruitment_schema.sql` file in this directory
4. Execute the SQL script in the Supabase SQL Editor

The script will:
- Create the `campus_drives` table for storing recruitment drive information
- Create the `campus_applications` table for storing student applications
- Set up Row Level Security (RLS) policies to ensure data security
- Create necessary indexes for performance optimization

## Feature Usage

### For Companies:
1. Navigate to the "Campus Recruitment" page from the main navigation
2. Click "Create Drive" to set up a new campus recruitment drive
3. Fill in all required details including title, location, date, and description
4. View applications from the drive details page
5. Shortlist candidates, schedule interviews, and select students

### For Students:
1. Browse available campus recruitment drives on the "Campus Recruitment" page
2. View detailed information about each drive
3. Apply for drives with optional application notes
4. Track application status (pending, shortlisted, interview, selected, rejected)

## Implementation Details

The feature consists of:
- Database tables and security policies
- React components for viewing and interacting with campus drives
- Integration with the existing authentication and user profile system

## Troubleshooting

If you encounter issues with the campus recruitment feature:

1. Ensure the SQL script has been executed successfully in Supabase
2. Check that users have the appropriate roles (company or student)
3. Verify that the Supabase client is properly configured
4. Check browser console for any JavaScript errors

For any additional assistance, please contact the development team.
