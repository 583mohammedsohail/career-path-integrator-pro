
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Users, MapPin, Calendar, Building, CreditCard } from 'lucide-react';

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: {
    id: string;
    title: string;
    company_id: string;
    location?: string;
    salary?: string;
    description: string;
    requirements: string[];
    deadline?: string;
    applications: Array<{
      id: string;
      student: {
        id: string;
        name: string;
        avatar_url?: string;
        email: string;
      };
      status: string;
      applied_at: string;
    }>;
  };
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  isOpen,
  onClose,
  job,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>{job.title}</span>
            <Badge variant="outline" className="ml-2">
              {job.applications.length} Applications
            </Badge>
          </DialogTitle>
          <DialogDescription className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Company ID: {job.company_id}
            </div>
            {job.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {job.location}
              </div>
            )}
            {job.salary && (
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                {job.salary}
              </div>
            )}
            {job.deadline && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Deadline: {new Date(job.deadline).toLocaleDateString()}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="space-y-4 p-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {job.description}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                <ul className="list-disc list-inside space-y-1">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {req}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Applications</h3>
                  <Badge variant="secondary">
                    <Users className="h-4 w-4 mr-1" />
                    {job.applications.length} Applicants
                  </Badge>
                </div>
                <div className="space-y-4">
                  {job.applications.map((application) => (
                    <div key={application.id}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src={application.student.avatar_url} />
                            <AvatarFallback>
                              {application.student?.name?.charAt(0) || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{application.student.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {application.student.email}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              application.status === 'selected'
                                ? 'default'
                                : application.status === 'rejected'
                                ? 'destructive'
                                : 'secondary'
                            }
                          >
                            {application.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            Applied: {new Date(application.applied_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsModal;
