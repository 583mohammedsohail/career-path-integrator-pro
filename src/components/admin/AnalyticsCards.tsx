import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, Building, Briefcase, CheckCircle, 
  TrendingUp, Award, Clock, Calendar 
} from 'lucide-react';

interface AnalyticsCardsProps {
  stats: {
    totalStudents: number;
    totalCompanies: number;
    totalJobs: number;
    totalPlacements: number;
    placementRate: number;
    averageSalary: number;
    activeApplications: number;
    upcomingDeadlines: number;
  };
}

const AnalyticsCards: React.FC<AnalyticsCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: Users,
      description: 'Registered students',
      color: 'text-blue-600',
    },
    {
      title: 'Total Companies',
      value: stats.totalCompanies,
      icon: Building,
      description: 'Registered companies',
      color: 'text-purple-600',
    },
    {
      title: 'Active Jobs',
      value: stats.totalJobs,
      icon: Briefcase,
      description: 'Open positions',
      color: 'text-green-600',
    },
    {
      title: 'Placements',
      value: stats.totalPlacements,
      icon: CheckCircle,
      description: 'Successful placements',
      color: 'text-yellow-600',
    },
    {
      title: 'Placement Rate',
      value: `${stats.placementRate}%`,
      icon: TrendingUp,
      description: 'Success rate',
      color: 'text-pink-600',
    },
    {
      title: 'Average Package',
      value: `₹${stats.averageSalary.toLocaleString()}`,
      icon: Award,
      description: 'Annual CTC',
      color: 'text-indigo-600',
    },
    {
      title: 'Active Applications',
      value: stats.activeApplications,
      icon: Clock,
      description: 'Pending review',
      color: 'text-orange-600',
    },
    {
      title: 'Upcoming Deadlines',
      value: stats.upcomingDeadlines,
      icon: Calendar,
      description: 'Next 7 days',
      color: 'text-teal-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon className={`h-4 w-4 ${card.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AnalyticsCards; 