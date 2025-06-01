
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import JobCard from '../components/jobs/JobCard';
import PostJobModal from '../components/jobs/PostJobModal';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, Plus, Briefcase } from 'lucide-react';
import { mockJobs } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Job } from '@/types';
import { toast } from 'sonner';

const Jobs = () => {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (job.company_name && job.company_name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || job.type === filterType;
    const matchesLocation = filterLocation === 'all' || job.location?.toLowerCase().includes(filterLocation.toLowerCase());
    return matchesSearch && matchesType && matchesLocation;
  });

  const handleJobPosted = (newJob: any) => {
    // Add the new job with real-time company logo
    const jobWithLogo: Job = {
      ...newJob,
      id: Math.random().toString(36).substr(2, 9),
      company_logo: `https://logo.clearbit.com/${newJob.company_name.toLowerCase().replace(/\s+/g, '')}.com`,
      created_at: new Date().toISOString(),
      status: 'active',
    };
    
    setJobs(prev => [jobWithLogo, ...prev]);
    setIsPostJobModalOpen(false);
    toast.success('Job posted successfully and is now visible to all users!');
  };

  const canPostJobs = currentUser && ['company', 'admin', 'management', 'superadmin'].includes(currentUser.role);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Job Opportunities</h1>
            <p className="text-gray-600">Discover your next career move with {filteredJobs.length} available positions</p>
          </div>
          
          {canPostJobs && (
            <Button onClick={() => setIsPostJobModalOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Post Job
            </Button>
          )}
        </div>

        {/* Search and Filter Controls */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search jobs by title, description, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="pune">Pune</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center">
              <Briefcase className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{filteredJobs.length}</p>
                <p className="text-sm text-gray-600">Available Jobs</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center">
              <Briefcase className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{filteredJobs.filter(job => job.status === 'active').length}</p>
                <p className="text-sm text-gray-600">Active Jobs</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center">
              <Briefcase className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{filteredJobs.filter(job => job.type === 'internship').length}</p>
                <p className="text-sm text-gray-600">Internships</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <p className="text-lg text-gray-600 mb-2">No jobs found matching your criteria.</p>
            <p className="text-sm text-gray-500">Try adjusting your search terms or filters.</p>
          </div>
        )}

        {/* Post Job Modal */}
        <PostJobModal
          isOpen={isPostJobModalOpen}
          onClose={() => setIsPostJobModalOpen(false)}
          onJobPosted={handleJobPosted}
        />
      </div>
    </Layout>
  );
};

export default Jobs;
