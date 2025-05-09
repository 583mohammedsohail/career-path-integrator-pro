
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Job } from '@/types';
import { MapPin, Calendar, Briefcase, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={job.company.avatar} alt={job.company.companyName} />
              <AvatarFallback>{job.company.companyName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.company.companyName}</p>
            </div>
          </div>
          <Badge variant="outline" className={
            job.status === 'open' 
              ? 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200'
          }>
            {job.status === 'open' ? 'Open' : 'Closed'}
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{job.positions} positions</span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {job.requirements.slice(0, 2).map((req, index) => (
              <Badge key={index} variant="secondary" className="font-normal">
                {req.split(' ').slice(0, 3).join(' ')}...
              </Badge>
            ))}
            {job.requirements.length > 2 && (
              <Badge variant="secondary" className="font-normal">
                +{job.requirements.length - 2} more
              </Badge>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="font-medium">{job.salary}</p>
          <Button size="sm" asChild>
            <Link to={`/jobs/${job.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
