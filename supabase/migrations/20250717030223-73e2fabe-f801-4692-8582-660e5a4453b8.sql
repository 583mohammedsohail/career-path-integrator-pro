-- Create attendance tracking table
CREATE TABLE IF NOT EXISTS public.student_attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late', 'excused')),
  marked_by UUID REFERENCES profiles(id),
  marked_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  notes TEXT,
  UNIQUE(student_id, date)
);

-- Create user sessions table for real-time tracking
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  session_start TIMESTAMP WITH TIME ZONE DEFAULT now(),
  session_end TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  ip_address INET,
  user_agent TEXT,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create system notifications table
CREATE TABLE IF NOT EXISTS public.system_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'warning', 'error', 'success')),
  target_users TEXT[] DEFAULT '{}', -- empty array means all users
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true
);

-- Enable RLS on all new tables
ALTER TABLE public.student_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for attendance
CREATE POLICY "Admin can manage all attendance" 
ON public.student_attendance 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'superadmin', 'management')
  )
);

CREATE POLICY "Students can view their own attendance" 
ON public.student_attendance 
FOR SELECT 
USING (auth.uid() = student_id);

-- Create policies for user sessions
CREATE POLICY "Admin can view all sessions" 
ON public.user_sessions 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'superadmin', 'management')
  )
);

CREATE POLICY "Users can view their own sessions" 
ON public.user_sessions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions" 
ON public.user_sessions 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for system notifications
CREATE POLICY "Everyone can view active notifications" 
ON public.system_notifications 
FOR SELECT 
USING (is_active = true AND (expires_at IS NULL OR expires_at > now()));

CREATE POLICY "Admin can manage all notifications" 
ON public.system_notifications 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'superadmin', 'management')
  )
);

-- Enable realtime for new tables
ALTER TABLE public.student_attendance REPLICA IDENTITY FULL;
ALTER TABLE public.user_sessions REPLICA IDENTITY FULL;
ALTER TABLE public.system_notifications REPLICA IDENTITY FULL;

-- Create function to update user session activity
CREATE OR REPLACE FUNCTION public.update_user_activity()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.user_sessions 
  SET last_activity = now()
  WHERE user_id = auth.uid() 
  AND is_active = true;
  
  IF NOT FOUND THEN
    INSERT INTO public.user_sessions (user_id, session_start, last_activity, is_active)
    VALUES (auth.uid(), now(), now(), true);
  END IF;
END;
$$;

-- Create function to get active users count
CREATE OR REPLACE FUNCTION public.get_active_users_realtime()
RETURNS TABLE(
  total_users bigint,
  active_now bigint,
  active_today bigint,
  students_online bigint,
  companies_online bigint
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    (SELECT COUNT(*) FROM profiles) as total_users,
    (SELECT COUNT(DISTINCT user_id) FROM user_sessions WHERE is_active = true AND last_activity > now() - interval '5 minutes') as active_now,
    (SELECT COUNT(DISTINCT user_id) FROM user_sessions WHERE session_start::date = CURRENT_DATE) as active_today,
    (SELECT COUNT(DISTINCT us.user_id) FROM user_sessions us JOIN profiles p ON us.user_id = p.id WHERE us.is_active = true AND us.last_activity > now() - interval '5 minutes' AND p.role = 'student') as students_online,
    (SELECT COUNT(DISTINCT us.user_id) FROM user_sessions us JOIN profiles p ON us.user_id = p.id WHERE us.is_active = true AND us.last_activity > now() - interval '5 minutes' AND p.role = 'company') as companies_online;
$$;