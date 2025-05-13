import React from 'react';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  CheckCircle, XCircle, Clock, MoreVertical, 
  Download, Eye, MessageSquare 
} from 'lucide-react';

interface Application {
  id: string;
  student: {
    id: string;
    name: string;
    avatar: string;
    email: string;
  };
  job: {
    id: string;
    title: string;
    company: {
      id: string;
      name: string;
      logo: string;
    };
  };
  status: 'pending' | 'selected' | 'rejected' | 'interviewing';
  appliedDate: string;
  resumeUrl: string;
}

interface ApplicationsTableProps {
  applications: Application[];
  onUpdateStatus: (applicationId: string, newStatus: string) => void;
  onViewDetails: (applicationId: string) => void;
  onDownloadResume: (resumeUrl: string) => void;
  onSendMessage: (studentId: string) => void;
}

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
  applications,
  onUpdateStatus,
  onViewDetails,
  onDownloadResume,
  onSendMessage,
}) => {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      selected: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle },
      interviewing: { color: 'bg-blue-100 text-blue-800', icon: MessageSquare },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        <span className="capitalize">{status}</span>
      </Badge>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead>Job</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Applied Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((application) => (
          <TableRow key={application.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={application.student.avatar} alt={application.student.name} />
                  <AvatarFallback>{application.student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{application.student.name}</p>
                  <p className="text-xs text-muted-foreground">{application.student.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>{application.job.title}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={application.job.company.logo} alt={application.job.company.name} />
                  <AvatarFallback>{application.job.company.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{application.job.company.name}</span>
              </div>
            </TableCell>
            <TableCell>{getStatusBadge(application.status)}</TableCell>
            <TableCell>{new Date(application.appliedDate).toLocaleDateString()}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onViewDetails(application.id)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDownloadResume(application.resumeUrl)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onSendMessage(application.student.id)}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message Student
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onUpdateStatus(application.id, 'selected')}>
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    Mark as Selected
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onUpdateStatus(application.id, 'rejected')}>
                    <XCircle className="mr-2 h-4 w-4 text-red-600" />
                    Mark as Rejected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ApplicationsTable; 