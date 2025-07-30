
import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Building2, BarChart2, 
  FileText, TrendingUp, Filter 
} from 'lucide-react';
import DashboardStats from '@/components/admin/DashboardStats';
import PlacementChart from '@/components/dashboard/PlacementChart';
import PlacementStatsCard from '@/components/dashboard/PlacementStatsCard';

const ManagementDashboard = () => {
  const { currentUser, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-md w-3/4 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded-md mb-6"></div>
            <div className="h-64 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!currentUser || currentUser.role !== 'management') {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Management Dashboard</h1>
            <p className="text-gray-600 mt-1">View high-level placement statistics and reports</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} className="space-y-4" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="overview">
              <BarChart2 className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <TrendingUp className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="companies">
              <Building2 className="mr-2 h-4 w-4" />
              Companies
            </TabsTrigger>
            <TabsTrigger value="reports">
              <FileText className="mr-2 h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <PlacementStatsCard />

            <Card>
              <CardHeader>
                <CardTitle>Placement Trends</CardTitle>
                <CardDescription>Historical data of placements over time</CardDescription>
              </CardHeader>
              <CardContent>
                <PlacementChart />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <DashboardStats />
          </TabsContent>
          
          <TabsContent value="companies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Participating Companies</CardTitle>
                <CardDescription>Companies involved in placement activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-500">View and manage relationships with recruiting companies.</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline">View All Companies</Button>
                    <Button variant="outline">Add New Company</Button>
                    <Button variant="outline">Export Data</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Generated Reports</CardTitle>
                <CardDescription>Download placement reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-500">Access and download reports for management review.</p>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Annual Placement Report 2024
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Department-wise Placement Analysis
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Company Participation Summary
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ManagementDashboard;
