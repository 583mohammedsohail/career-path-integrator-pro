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

-- Enable realtime for all relevant tables
ALTER TABLE public.job_applications REPLICA IDENTITY FULL;
ALTER TABLE public.campus_drive_applications REPLICA IDENTITY FULL;
ALTER TABLE public.jobs REPLICA IDENTITY FULL;
ALTER TABLE public.campus_drives REPLICA IDENTITY FULL;