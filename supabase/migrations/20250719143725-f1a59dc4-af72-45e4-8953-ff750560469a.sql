
-- Create function to handle attendance marking
CREATE OR REPLACE FUNCTION public.mark_student_attendance(
  _student_id uuid,
  _status text DEFAULT 'present'
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  attendance_id uuid;
BEGIN
  -- Insert or update attendance for today
  INSERT INTO public.student_attendance (student_id, date, status, marked_by, marked_at)
  VALUES (_student_id, CURRENT_DATE, _status, _student_id, now())
  ON CONFLICT (student_id, date) 
  DO UPDATE SET 
    status = EXCLUDED.status,
    marked_at = now()
  RETURNING id INTO attendance_id;
  
  RETURN attendance_id;
END;
$$;

-- Create function to get today's attendance stats
CREATE OR REPLACE FUNCTION public.get_attendance_stats()
RETURNS TABLE(
  total_students bigint,
  present_today bigint,
  absent_today bigint,
  late_today bigint,
  attendance_rate numeric
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    (SELECT COUNT(*) FROM profiles WHERE role = 'student') as total_students,
    (SELECT COUNT(*) FROM student_attendance WHERE date = CURRENT_DATE AND status = 'present') as present_today,
    (SELECT COUNT(*) FROM student_attendance WHERE date = CURRENT_DATE AND status = 'absent') as absent_today,
    (SELECT COUNT(*) FROM student_attendance WHERE date = CURRENT_DATE AND status = 'late') as late_today,
    CASE 
      WHEN (SELECT COUNT(*) FROM profiles WHERE role = 'student') > 0 
      THEN ROUND(
        (SELECT COUNT(*) FROM student_attendance WHERE date = CURRENT_DATE AND status = 'present')::numeric / 
        (SELECT COUNT(*) FROM profiles WHERE role = 'student')::numeric * 100, 
        2
      )
      ELSE 0
    END as attendance_rate;
$$;

-- Create function to get recent attendance records
CREATE OR REPLACE FUNCTION public.get_recent_attendance()
RETURNS TABLE(
  id uuid,
  student_id uuid,
  student_name text,
  student_email text,
  date date,
  status text,
  marked_at timestamp with time zone
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    sa.id,
    sa.student_id,
    p.name as student_name,
    p.email as student_email,
    sa.date,
    sa.status,
    sa.marked_at
  FROM student_attendance sa
  JOIN profiles p ON sa.student_id = p.id
  WHERE sa.date >= CURRENT_DATE - INTERVAL '7 days'
  ORDER BY sa.marked_at DESC
  LIMIT 50;
$$;

-- Enable realtime for student_attendance table
ALTER TABLE public.student_attendance REPLICA IDENTITY FULL;

-- Grant execute permissions on functions
GRANT EXECUTE ON FUNCTION public.mark_student_attendance(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_attendance_stats() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_recent_attendance() TO authenticated;

-- Create policy for students to mark their own attendance
CREATE POLICY "Students can mark their own attendance" 
ON public.student_attendance 
FOR INSERT 
WITH CHECK (auth.uid() = student_id);

-- Create policy for students to update their own attendance
CREATE POLICY "Students can update their own attendance" 
ON public.student_attendance 
FOR UPDATE 
USING (auth.uid() = student_id);
