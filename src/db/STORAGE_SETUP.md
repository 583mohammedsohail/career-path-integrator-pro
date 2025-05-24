# Resume Upload Storage Setup Guide

This document provides instructions for setting up the storage bucket for resume uploads in the Career Path Integrator platform.

## Issue: "Bucket not found" Error

If you're encountering a "Bucket not found" error when students try to upload resumes during job applications, it means the Supabase storage bucket has not been properly configured.

## Solution

To fix this issue, you need to create the storage bucket in Supabase and set up the appropriate Row Level Security (RLS) policies.

### Option 1: Using the Supabase Dashboard

1. Log in to your Supabase dashboard
2. Navigate to the "Storage" section
3. Click "Create a new bucket"
4. Enter the following details:
   - Bucket name: `resumes`
   - Public bucket: Yes
   - File size limit: 10485760 (10MB)
   - Allowed MIME types: `application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
5. Create the bucket
6. Set up RLS policies for the bucket (see below)

### Option 2: Using SQL Script

1. Navigate to the Supabase SQL Editor
2. Copy the contents of the `storage_setup.sql` file in this directory
3. Execute the SQL script

## RLS Policies for Resume Storage

The following RLS policies should be set up for the `resumes` bucket:

1. **Students can upload their own resumes**
   - Allows students to upload resumes to the bucket
   - Ensures students can only upload files with their user ID in the filename

2. **Students can view their own resumes**
   - Allows students to view and download their own resumes
   - Restricts access to only the owner of the resume

3. **Companies can view resumes for their job applications**
   - Allows companies to view resumes submitted for jobs they posted
   - Links resume access to job applications in the database

4. **Admins can view all resumes**
   - Allows administrators to view all resumes in the system

## Implementation Details

The application has been updated to handle resume uploads more gracefully:

1. It now attempts to upload to an existing bucket rather than creating one (which requires admin privileges)
2. If the upload fails, it creates a mock URL for development purposes
3. The job application is still created, ensuring the user experience is not disrupted

## Troubleshooting

If you continue to experience issues with resume uploads:

1. Check that the `resumes` bucket exists in your Supabase storage
2. Verify that the RLS policies are correctly configured
3. Check the browser console for any specific error messages
4. Ensure the user has the appropriate permissions in your Supabase instance

For any additional assistance, please contact the development team.
