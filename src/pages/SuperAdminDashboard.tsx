
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { mockStudents, mockCompanies, mockJobs } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2, UserPlus, Building, Briefcase } from 'lucide-react';

const SuperAdminDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Redirect if not a super admin
  if (currentUser?.role !== 'superadmin') {
    navigate('/');
    toast.error("You don't have permission to access this page.");
    return null;
  }

  // Filter function for all data based on search query
  const filterData = (data: any[], fields: string[]) => {
    if (!searchQuery) return data;
    
    return data.filter(item => 
      fields.some(field => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      })
    );
  };

  const filteredStudents = filterData(mockStudents, ['name', 'email', 'department']);
  const filteredCompanies = filterData(mockCompanies, ['name', 'companyName', 'email']);
  const filteredJobs = filterData(mockJobs, ['title', 'company.companyName', 'location']);

  const handleEditStudent = (studentId: string) => {
    toast.info(`Editing student ${studentId} - This would open an edit form in a real app`);
  };

  const handleDeleteStudent = (studentId: string) => {
    toast.success(`Student ${studentId} deleted successfully`);
  };

  const handleEditCompany = (companyId: string) => {
    toast.info(`Editing company ${companyId} - This would open an edit form in a real app`);
  };

  const handleDeleteCompany = (companyId: string) => {
    toast.success(`Company ${companyId} deleted successfully`);
  };

  const handleEditJob = (jobId: string) => {
    toast.info(`Editing job ${jobId} - This would open an edit form in a real app`);
  };

  const handleDeleteJob = (jobId: string) => {
    toast.success(`Job ${jobId} deleted successfully`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
          <Input 
            placeholder="Search..." 
            className="max-w-xs" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="students" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
          </TabsList>

          {/* Students Tab */}
          <TabsContent value="students">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Manage Students</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Student
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Student</DialogTitle>
                      <DialogDescription>
                        This would contain a form to add a new student. For demo purposes, this is just a placeholder.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <p>Student creation form would be here</p>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => toast.success("Student successfully added!")}>
                        Save Student
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>CGPA</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={student.avatar} alt={student.name} />
                                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{student.name}</p>
                                <p className="text-xs text-muted-foreground">{student.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{student.department}</TableCell>
                          <TableCell>{student.course}</TableCell>
                          <TableCell>{student.cgpa}</TableCell>
                          <TableCell>{student.year}</TableCell>
                          <TableCell className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleEditStudent(student.id)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Student</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete {student.name}? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteStudent(student.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Companies Tab */}
          <TabsContent value="companies">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Manage Companies</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Building className="mr-2 h-4 w-4" />
                      Add Company
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Company</DialogTitle>
                      <DialogDescription>
                        This would contain a form to add a new company. For demo purposes, this is just a placeholder.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <p>Company creation form would be here</p>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => toast.success("Company successfully added!")}>
                        Save Company
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Contact Email</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Jobs Posted</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCompanies.map((company) => (
                        <TableRow key={company.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={company.avatar} alt={company.companyName} />
                                <AvatarFallback>{company.companyName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{company.companyName}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{company.email}</TableCell>
                          <TableCell>{company.location || "N/A"}</TableCell>
                          <TableCell>{company.postedJobs?.length || 0}</TableCell>
                          <TableCell className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleEditCompany(company.id)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Company</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete {company.companyName}? All associated jobs will also be deleted. This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteCompany(company.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Manage Jobs</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Briefcase className="mr-2 h-4 w-4" />
                      Add Job
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Job</DialogTitle>
                      <DialogDescription>
                        This would contain a form to add a new job. For demo purposes, this is just a placeholder.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <p>Job creation form would be here</p>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => toast.success("Job successfully added!")}>
                        Post Job
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredJobs.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell>
                            <p className="font-medium">{job.title}</p>
                          </TableCell>
                          <TableCell>{job.company.companyName}</TableCell>
                          <TableCell>{job.location}</TableCell>
                          <TableCell>{new Date(job.deadline).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              job.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {job.status.toUpperCase()}
                            </span>
                          </TableCell>
                          <TableCell className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleEditJob(job.id)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Job</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete the job "{job.title}"? All associated applications will also be deleted. This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteJob(job.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SuperAdminDashboard;
