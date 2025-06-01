
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Job } from '@/types';
import { MapPin, Calendar, Users } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
            <p className="text-sm text-muted-foreground">Company ID: {job.company_id}</p>
          </div>
          <Badge 
            variant="outline" 
            className={
              job.status === 'active' 
                ? 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200'
                : job.status === 'closed'
                ? 'bg-red-100 text-red-800 hover:bg-red-100 border-red-200'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200'
            }
          >
            {job.status === 'active' ? 'Open' : job.status === 'closed' ? 'Closed' : 'Draft'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
          {job.location && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
          )}
          {job.deadline && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
            </div>
          )}
          {job.positions && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{job.positions} positions</span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {job.requirements.slice(0, 2).map((req, index) => (
              <Badge key={index} variant="secondary" className="font-normal text-xs">
                {req.length > 20 ? req.substring(0, 20) + '...' : req}
              </Badge>
            ))}
            {job.requirements.length > 2 && (
              <Badge variant="secondary" className="font-normal text-xs">
                +{job.requirements.length - 2} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          {job.salary && (
            <p className="font-medium text-sm">{job.salary}</p>
          )}
          <Button size="sm" asChild>
            <Link to={`/jobs/${job.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
