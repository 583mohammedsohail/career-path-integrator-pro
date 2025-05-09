
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockMonthlyData = [
  { name: 'Jan', placements: 5 },
  { name: 'Feb', placements: 8 },
  { name: 'Mar', placements: 12 },
  { name: 'Apr', placements: 15 },
  { name: 'May', placements: 10 },
  { name: 'Jun', placements: 25 },
  { name: 'Jul', placements: 18 },
  { name: 'Aug', placements: 22 },
  { name: 'Sep', placements: 30 },
  { name: 'Oct', placements: 29 },
  { name: 'Nov', placements: 32 },
  { name: 'Dec', placements: 27 },
];

const PlacementChart: React.FC = () => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Monthly Placements</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockMonthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar 
              dataKey="placements" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]} 
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PlacementChart;
