
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Goal {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
}

interface CareerGoalsProps {
  goals: Goal[];
}

const CareerGoals: React.FC<CareerGoalsProps> = ({ goals }) => {
  // Function to render appropriate badge for goal status
  const renderStatusBadge = (status: Goal['status']) => {
    switch (status) {
      case 'not-started':
        return <Badge variant="outline">Not Started</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Career Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map(goal => (
            <div key={goal.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{goal.name}</h3>
                {renderStatusBadge(goal.status)}
              </div>
              <p className="text-sm text-muted-foreground">{goal.description}</p>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} />
              </div>
            </div>
          ))}

          {goals.length === 0 && (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No career goals set. Add your first goal to start tracking your progress!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerGoals;
