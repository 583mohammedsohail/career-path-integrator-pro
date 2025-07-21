
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { mockJobs } from '@/data/mockData';

const RecentJobs = () => {
  // Get the 5 most recent jobs
  const recentJobs = mockJobs
    .filter(job => job.status === 'active')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  const totalActiveJobs = mockJobs.filter(job => job.status === 'active').length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Recent Job Postings</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentJobs.map((job) => (
            <div key={job.id} className="flex items-center justify-between space-x-4">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{job.title}</p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>Company ID: {job.company_id}</span>
                  {job.location && (
                    <>
                      <span>•</span>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        {job.location}
                      </div>
                    </>
                  )}
                </div>
                {job.deadline && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    Deadline: {format(new Date(job.deadline), 'MMM dd, yyyy')}
                  </div>
                )}
              </div>
              <div className="text-right space-y-1">
                <Badge variant="outline" className="text-xs">
                  {job.status}
                </Badge>
                {job.positions && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Users className="mr-1 h-3 w-3" />
                    {job.positions} positions
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {recentJobs.length === 0 && (
          <p className="text-sm text-muted-foreground">No recent job postings</p>
        )}
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Active Jobs</span>
            <span className="text-sm font-medium">{totalActiveJobs}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentJobs;
