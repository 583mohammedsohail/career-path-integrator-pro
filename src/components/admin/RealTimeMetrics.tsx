import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Users, Briefcase, TrendingUp, DollarSign, GraduationCap, Building2 } from 'lucide-react';

interface Metrics {
  totalStudents: number;
  totalJobs: number;
  placementRate: number;
  averageSalary: number;
  activeApplications: number;
  companiesRegistered: number;
}

const RealTimeMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    totalStudents: 0,
    totalJobs: 0,
    placementRate: 0,
    averageSalary: 0,
    activeApplications: 0,
    companiesRegistered: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate real-time data updates with mock data
    const updateMetrics = () => {
      setMetrics({
        totalStudents: 847,
        totalJobs: 156,
        placementRate: 78.5,
        averageSalary: 650000,
        activeApplications: 1234,
        companiesRegistered: 45
      });
      setLoading(false);
    };

    updateMetrics();
    
    // Update every 30 seconds to simulate real-time
    const interval = setInterval(updateMetrics, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ title, value, icon: Icon, trend, color = "primary" }: {
    title: string;
    value: string | number;
    icon: any;
    trend?: number;
    color?: string;
  }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h4 className="text-2xl font-bold mt-1">{value}</h4>
            {trend && (
              <div className="flex items-center mt-2">
                <Badge variant={trend > 0 ? "default" : "secondary"} className="text-xs">
                  {trend > 0 ? "+" : ""}{trend}% from last month
                </Badge>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full bg-${color}/10`}>
            <Icon className={`h-6 w-6 text-${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-8 bg-muted rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Students"
          value={metrics.totalStudents.toLocaleString()}
          icon={Users}
          trend={12}
          color="blue"
        />
        <StatCard
          title="Active Jobs"
          value={metrics.totalJobs}
          icon={Briefcase}
          trend={8}
          color="green"
        />
        <StatCard
          title="Placement Rate"
          value={`${metrics.placementRate}%`}
          icon={TrendingUp}
          trend={5}
          color="purple"
        />
        <StatCard
          title="Average Salary"
          value={`₹${(metrics.averageSalary / 100000).toFixed(1)}L`}
          icon={DollarSign}
          trend={15}
          color="orange"
        />
        <StatCard
          title="Active Applications"
          value={metrics.activeApplications.toLocaleString()}
          icon={GraduationCap}
          trend={-3}
          color="pink"
        />
        <StatCard
          title="Companies"
          value={metrics.companiesRegistered}
          icon={Building2}
          trend={22}
          color="indigo"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Placement Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Placement Rate</span>
                  <span>{metrics.placementRate}%</span>
                </div>
                <Progress value={metrics.placementRate} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Applications Processed</span>
                  <span>89%</span>
                </div>
                <Progress value={89} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Interview Completion</span>
                  <span>73%</span>
                </div>
                <Progress value={73} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Live Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <span className="text-sm">Students Online</span>
                <Badge variant="secondary">127</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <span className="text-sm">Recruiters Active</span>
                <Badge variant="secondary">23</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <span className="text-sm">Applications Today</span>
                <Badge variant="secondary">89</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <span className="text-sm">Interviews Scheduled</span>
                <Badge variant="secondary">34</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealTimeMetrics;