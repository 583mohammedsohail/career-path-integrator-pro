-- Create campus drive applications table
CREATE TABLE IF NOT EXISTS public.campus_drive_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL,
  campus_drive_id UUID NOT NULL,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'shortlisted', 'rejected', 'accepted')),
  resume_url TEXT,
  cover_letter TEXT
);

-- Enable RLS on campus drive applications
ALTER TABLE public.campus_drive_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for campus drive applications
CREATE POLICY "Students can apply for campus drives" 
ON public.campus_drive_applications 
FOR INSERT 
WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can view their own campus drive applications" 
ON public.campus_drive_applications 
FOR SELECT 
USING (auth.uid() = student_id);

-- Create a view to get student applications with job and campus drive details
CREATE OR REPLACE VIEW public.student_applications AS
SELECT 
  'job' as application_type,
  ja.id,
  ja.student_id,
  ja.applied_at,
  ja.status,
  ja.resume_url,
  j.title,
  c.company_name as company,
  c.avatar_url as company_logo,
  j.location,
  j.salary
FROM job_applications ja
JOIN jobs j ON ja.job_id = j.id
JOIN companies c ON j.company_id = c.id
UNION ALL
SELECT 
  'campus_drive' as application_type,
  cda.id,
  cda.student_id,
  cda.applied_at,
  cda.status,
  cda.resume_url,
  cd.title,
  cd.company_name as company,
  cd.company_logo,
  cd.location,
  cd.salary
FROM campus_drive_applications cda
JOIN campus_drives cd ON cda.campus_drive_id = cd.id;

-- Enable realtime for all relevant tables
ALTER TABLE public.job_applications REPLICA IDENTITY FULL;
ALTER TABLE public.campus_drive_applications REPLICA IDENTITY FULL;
ALTER TABLE public.jobs REPLICA IDENTITY FULL;

-- Add tables to realtime publication
SELECT cron.schedule('add-tables-to-realtime', '* * * * *', 'SELECT 1');
INSERT INTO supabase_realtime.subscription (subscription_id, entity)
VALUES 
  (gen_random_uuid(), 'public:job_applications'),
  (gen_random_uuid(), 'public:campus_drive_applications'),
  (gen_random_uuid(), 'public:jobs');

-- Create campus drives table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.campus_drives (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company_id UUID,
  company_name TEXT,
  company_logo TEXT,
  location TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  registration_deadline TIMESTAMP WITH TIME ZONE,
  positions INTEGER NOT NULL DEFAULT 1,
  roles TEXT[] DEFAULT '{}',
  eligibility_criteria TEXT,
  salary TEXT,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed')),
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on campus drives
ALTER TABLE public.campus_drives ENABLE ROW LEVEL SECURITY;

-- Create policies for campus drives
CREATE POLICY "Campus drives are viewable by everyone" 
ON public.campus_drives 
FOR SELECT 
USING (true);

CREATE POLICY "Companies can create campus drives" 
ON public.campus_drives 
FOR INSERT 
WITH CHECK (auth.uid() = company_id OR auth.uid() IN (
  SELECT id FROM profiles WHERE role IN ('admin', 'management', 'superadmin')
));

CREATE POLICY "Companies can update their own campus drives" 
ON public.campus_drives 
FOR UPDATE 
USING (auth.uid() = company_id OR auth.uid() IN (
  SELECT id FROM profiles WHERE role IN ('admin', 'management', 'superadmin')
));