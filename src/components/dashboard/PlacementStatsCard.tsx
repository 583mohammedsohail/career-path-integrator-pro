import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockPlacementStats, mockJobs, mockStudents } from '@/data/mockData';

const PlacementStatsCard = () => {
  const activeJobs = mockJobs.filter(job => job.status === 'active');
  const totalApplications = activeJobs.reduce((acc, job) => acc + (job.positions || 0), 0);
  const activeJobsCount = activeJobs.length;

  const placedStudentsCount = mockPlacementStats.placedStudents;
  const totalStudentsCount = mockStudents.length;
  const placementRate = totalStudentsCount > 0 ? ((placedStudentsCount / totalStudentsCount) * 100).toFixed(2) : 0;

  const parseSalary = (salary: string | undefined): number => {
    if (typeof salary !== 'string') return 0;
    const cleanedSalary = salary.replace(/[^0-9-]/g, '');
    const parts = cleanedSalary.split('-');
    if (parts.length === 2) {
      const low = parseInt(parts[0], 10);
      const high = parseInt(parts[1], 10);
      return (low + high) / 2;
    }
    return parseInt(parts[0], 10) || 0;
  };

  const averageSalary = activeJobs.length > 0
    ? (activeJobs.reduce((acc, job) => acc + parseSalary(job.salary), 0) / activeJobs.length)
    : 0;

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Placement Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">33,000</p>
            <p className="text-sm text-gray-600">Total Applications</p>
          </div>
          <div>
            <p className="text-2xl font-bold">10,000</p>
            <p className="text-sm text-gray-600">Active Jobs</p>
          </div>
          <div>
            <p className="text-2xl font-bold">57%</p>
            <p className="text-sm text-gray-600">Placement Rate</p>
          </div>
          <div>
            <p className="text-2xl font-bold">7 LPA</p>
            <p className="text-sm text-gray-600">Average Salary</p>
          </div>
          <div>
            <p className="text-2xl font-bold">1 Cr</p>
            <p className="text-sm text-gray-600">Highest Package</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlacementStatsCard;
