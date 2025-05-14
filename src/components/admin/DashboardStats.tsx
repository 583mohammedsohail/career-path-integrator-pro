
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/dashboard/StatCard';
import { Users, Building, Briefcase, CheckCircle, FileText, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const DashboardStats = () => {
  const fetchStats = async () => {
    // Get count of users by role
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('role');
    
    if (profilesError) throw profilesError;
    
    const students = profiles.filter(p => p.role === 'student').length;
    const companies = profiles.filter(p => p.role === 'company').length;
    
    // Get count of jobs
    const { count: jobsCount, error: jobsError } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true });
    
    if (jobsError) throw jobsError;
    
    // Get count of applications
    const { count: applicationsCount, error: applicationsError } = await supabase
      .from('job_applications')
      .select('*', { count: 'exact', head: true });
    
    if (applicationsError) throw applicationsError;
    
    // Get count of placements
    const { count: placementsCount, error: placementsError } = await supabase
      .from('job_applications')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'selected');
    
    if (placementsError) throw placementsError;
    
    // Get active user counts
    const { data: activeUsers, error: activeUsersError } = await supabase
      .rpc('get_active_user_count');
    
    if (activeUsersError) throw activeUsersError;
    
    // Get upcoming deadlines
    const now = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(now.getDate() + 7);
    
    const { count: upcomingDeadlinesCount, error: deadlinesError } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'open')
      .gte('deadline', now.toISOString())
      .lte('deadline', sevenDaysLater.toISOString());
    
    if (deadlinesError) throw deadlinesError;
    
    return {
      totalStudents: students || 0,
      totalCompanies: companies || 0,
      totalJobs: jobsCount || 0,
      totalApplications: applicationsCount || 0,
      totalPlacements: placementsCount || 0,
      activeUsers: activeUsers?.[0] || { total_count: 0, active_last_day: 0, active_last_week: 0, active_last_month: 0 },
      upcomingDeadlines: upcomingDeadlinesCount || 0
    };
  };

  const { data: stats = {
    totalStudents: 0,
    totalCompanies: 0,
    totalJobs: 0,
    totalApplications: 0,
    totalPlacements: 0,
    activeUsers: { total_count: 0, active_last_day: 0, active_last_week: 0, active_last_month: 0 },
    upcomingDeadlines: 0
  }, isLoading } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: fetchStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Calculate placement rate
  const placementRate = stats.totalStudents > 0 
    ? Math.round((stats.totalPlacements / stats.totalStudents) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Total Students"
        value={isLoading ? "Loading..." : stats.totalStudents.toString()}
        icon={Users}
      />
      <StatCard
        title="Total Companies"
        value={isLoading ? "Loading..." : stats.totalCompanies.toString()}
        icon={Building}
      />
      <StatCard
        title="Active Jobs"
        value={isLoading ? "Loading..." : stats.totalJobs.toString()}
        icon={Briefcase}
      />
      <StatCard
        title="Applications"
        value={isLoading ? "Loading..." : stats.totalApplications.toString()}
        icon={FileText}
      />
      <StatCard
        title="Placements"
        value={isLoading ? "Loading..." : stats.totalPlacements.toString()}
        icon={CheckCircle}
      />
      <StatCard
        title="Placement Rate"
        value={isLoading ? "Loading..." : `${placementRate}%`}
        icon={CheckCircle}
      />
      <StatCard
        title="Active Users (24h)"
        value={isLoading ? "Loading..." : stats.activeUsers.active_last_day.toString()}
        description={`${stats.activeUsers.active_last_week} users active this week`}
        icon={Users}
      />
      <StatCard
        title="Upcoming Deadlines"
        value={isLoading ? "Loading..." : stats.upcomingDeadlines.toString()}
        description="Jobs closing in next 7 days"
        icon={Calendar}
      />
    </div>
  );
};

export default DashboardStats;
