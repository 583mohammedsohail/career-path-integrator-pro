
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Job } from '@/types';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Users } from 'lucide-react';
import { mockJobs } from '@/data/mockData';

interface RecentJobsProps {
  jobs?: Job[];
}

const RecentJobs: React.FC<RecentJobsProps> = ({ jobs = mockJobs }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Recent Job Postings</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/jobs" className="flex items-center gap-1">
            <span>View all</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {jobs.slice(0, 5).map((job) => (
            <div key={job.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-lg">{job.title}</h3>
                <Badge variant="outline" className={
                  job.status === 'open' 
                    ? 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200'
                }>
                  {job.status === 'open' ? 'Open' : 'Closed'}
                </Badge>
              </div>
              
              <div className="mt-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{job.company.companyName}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{job.positions} positions</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">{job.salary}</span>
                </div>
                <Button size="sm" asChild>
                  <Link to={`/jobs/${job.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentJobs;
