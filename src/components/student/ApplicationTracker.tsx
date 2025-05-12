
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, FileText, Building, AlertCircle } from 'lucide-react';

interface JobApplication {
  id: string;
  job_id: string;
  student_id: string;
  applied_at: string;
  resume_url: string | null;
  status: 'pending' | 'shortlisted' | 'interviewed' | 'rejected' | 'accepted';
  job: {
    id: string;
    title: string;
    company_id: string;
    deadline: string;
    status: string;
    company: {
      id: string;
      company_name: string;
    };
  };
}

interface ApplicationTrackerProps {
  applications: JobApplication[];
  loading: boolean;
}

const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({ applications, loading }) => {
  const navigate = useNavigate();
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Pending</Badge>;
      case 'shortlisted':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Shortlisted</Badge>;
      case 'interviewed':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800">Interviewed</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Rejected</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Accepted</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Applications</CardTitle>
          <CardDescription>Track the status of your job applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col space-y-3 p-4 border rounded-md">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (applications.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Applications</CardTitle>
          <CardDescription>Track the status of your job applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mb-3" />
            <h3 className="text-lg font-medium mb-1">No applications yet</h3>
            <p className="text-sm text-gray-500 mb-4">You haven't applied to any jobs yet</p>
            <Button onClick={() => navigate('/jobs')}>Browse Jobs</Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Applications</CardTitle>
        <CardDescription>Track the status of your job applications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.map((application) => (
            <div key={application.id} className="border rounded-md overflow-hidden">
              <div className="flex flex-col p-4 gap-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium">{application.job.title}</h3>
                  {getStatusBadge(application.status)}
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Building className="h-4 w-4 mr-1" />
                  <span>{application.job.company.company_name}</span>
                </div>
                
                <div className="flex flex-wrap gap-4 mt-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                    <span>Applied: {new Date(application.applied_at).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                    <span>Deadline: {new Date(application.job.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex justify-between mt-4">
                  {application.resume_url ? (
                    <Button variant="outline" size="sm" asChild>
                      <a href={application.resume_url} target="_blank" rel="noopener noreferrer">
                        <FileText className="h-4 w-4 mr-2" />
                        View Resume
                      </a>
                    </Button>
                  ) : null}
                  
                  <Button variant="outline" size="sm" onClick={() => navigate(`/jobs/${application.job_id}`)}>
                    View Job
                  </Button>
                </div>
              </div>
              
              {application.status === 'pending' && (
                <div className="bg-gray-50 px-4 py-2 border-t">
                  <p className="text-sm text-gray-700 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Your application is under review. You will be notified of any updates.
                  </p>
                </div>
              )}
              
              {application.status === 'shortlisted' && (
                <div className="bg-blue-50 px-4 py-2 border-t">
                  <p className="text-sm text-blue-700 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    You've been shortlisted! Prepare for a potential interview soon.
                  </p>
                </div>
              )}
              
              {application.status === 'interviewed' && (
                <div className="bg-purple-50 px-4 py-2 border-t">
                  <p className="text-sm text-purple-700 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Interview completed. We'll notify you of the decision soon.
                  </p>
                </div>
              )}
              
              {application.status === 'accepted' && (
                <div className="bg-green-50 px-4 py-2 border-t">
                  <p className="text-sm text-green-700 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Congratulations! Your application has been accepted.
                  </p>
                </div>
              )}
              
              {application.status === 'rejected' && (
                <div className="bg-red-50 px-4 py-2 border-t">
                  <p className="text-sm text-red-700 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Your application was not selected. Keep trying!
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationTracker;
