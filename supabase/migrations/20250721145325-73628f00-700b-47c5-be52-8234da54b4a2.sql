-- Update Supabase types to include the functions we created
-- This ensures the TypeScript client recognizes our custom functions

-- Make sure the functions return proper types that TypeScript can understand
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

-- Update the other functions to be more TypeScript friendly
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