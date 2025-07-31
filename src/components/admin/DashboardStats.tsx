
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Briefcase, FileText, TrendingUp } from 'lucide-react';

const DashboardStats = () => {
  // Real-time stats using mockPlacementStats
  const [stats, setStats] = useState({
    totalApplications: 0,
    totalJobs: 0,
    placementRate: '0%',
    averageSalary: '0 LPA',
    highestPackage: '0'
  });

  useEffect(() => {
    function fetchStats() {
      // Import dynamically to always get latest mock data
      import('@/data/mockData').then(({ mockPlacementStats, mockJobs }) => {
        setStats({
          totalApplications: mockJobs.length,
          totalJobs: mockJobs.filter(j => j.status === 'active').length,
          placementRate: mockPlacementStats.placementPercentage + '%',
          averageSalary: mockPlacementStats.averagePackage,
          highestPackage: mockPlacementStats.highestPackage
        });
      });
    }
    fetchStats();
    const interval = setInterval(fetchStats, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalApplications}</div>
          <p className="text-xs text-muted-foreground">+20% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalJobs}</div>
          <p className="text-xs text-muted-foreground">open positions</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Placement Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.placementRate}</div>
          <p className="text-xs text-muted-foreground">students placed</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.averageSalary}</div>
          <p className="text-xs text-muted-foreground">per annum</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Highest Package</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.highestPackage}</div>
          <p className="text-xs text-muted-foreground">offered</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
