
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  change?: {
    value: number;
    positive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  change,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h4 className="text-2xl font-bold mt-1">{value}</h4>
            {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
            {change && (
              <div className="flex items-center mt-1">
                <span className={`text-xs ${change.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {change.positive ? '+' : '-'}{Math.abs(change.value)}%
                </span>
                <span className="text-xs text-muted-foreground ml-1">from last month</span>
              </div>
            )}
          </div>
          <div className="p-2 bg-primary/10 rounded-full">
            <Icon className="h-8 w-8 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
