
-- This SQL will be executed to create the storage bucket for student resumes
INSERT INTO storage.buckets (id, name, public)
VALUES ('students', 'Students Files', true);

-- Create policy to allow authenticated users to upload their resumes
CREATE POLICY "Students can upload their own resumes"
ON storage.objects
FOR INSERT
WITH CHECK (
  auth.uid() = (storage.foldername(name))[1]::uuid
  AND bucket_id = 'students'
);

-- Create policy to allow anyone to read files
CREATE POLICY "Anyone can read student files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'students');
