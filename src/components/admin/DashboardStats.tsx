
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Briefcase, FileText, TrendingUp } from 'lucide-react';

const DashboardStats = () => {
  // Hardcoded demo stats
  const stats = {
    totalApplications: '33,000',
    totalJobs: '10,000',
    placementRate: '57%',
    averageSalary: '7 LPA',
    highestPackage: '1 Cr'
  };

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
