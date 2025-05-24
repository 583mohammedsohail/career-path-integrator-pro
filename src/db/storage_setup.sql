-- Storage setup for resume uploads

-- Create the 'resumes' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES ('resumes', 'resumes', true, false, 10485760, '{"application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"}')
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for the resumes bucket
-- Allow students to upload their own resumes
CREATE POLICY "Students can upload their own resumes"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'resumes' AND
  (storage.foldername(name))[1] = 'applications' AND
  auth.uid()::text = SPLIT_PART(SPLIT_PART(name, '/', 2), '_', 1)
);

-- Allow students to view their own resumes
CREATE POLICY "Students can view their own resumes"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'resumes' AND
  (storage.foldername(name))[1] = 'applications' AND
  auth.uid()::text = SPLIT_PART(SPLIT_PART(name, '/', 2), '_', 1)
);

-- Allow companies to view resumes for applications to their jobs
CREATE POLICY "Companies can view resumes for their job applications"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'resumes' AND
  (storage.foldername(name))[1] = 'applications' AND
  EXISTS (
    SELECT 1 FROM job_applications ja
    JOIN jobs j ON ja.job_id = j.id
    WHERE j.company_id = auth.uid() AND
          ja.resume_url LIKE '%' || SPLIT_PART(name, '/', 2) || '%'
  )
);

-- Allow admins to view all resumes
CREATE POLICY "Admins can view all resumes"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'resumes' AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);
