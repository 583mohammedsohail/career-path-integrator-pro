import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { Database, Upload, Trash2, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { populateSupabaseWithMockData, clearSupabaseData } from '../../scripts/populateSupabase';

interface PopulationResult {
  success: boolean;
  message: string;
  counts?: {
    companies: number;
    students: number;
    jobs: number;
    profiles: number;
    applications: number;
    attendance: number;
  };
  error?: any;
}

const DataPopulator: React.FC = () => {
  const [isPopulating, setIsPopulating] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [lastResult, setLastResult] = useState<PopulationResult | null>(null);

  const handlePopulateData = async () => {
    setIsPopulating(true);
    toast.info('Starting data population...');
    
    try {
      const result = await populateSupabaseWithMockData();
      setLastResult(result);
      
      if (result.success) {
        toast.success('🎉 All mock data populated successfully!');
      } else {
        toast.error('Failed to populate data: ' + result.message);
      }
    } catch (error) {
      console.error('Error populating data:', error);
      toast.error('Unexpected error occurred while populating data');
      setLastResult({
        success: false,
        message: 'Unexpected error occurred',
        error
      });
    } finally {
      setIsPopulating(false);
    }
  };

  const handleClearData = async () => {
    if (!confirm('Are you sure you want to clear ALL data from Supabase? This action cannot be undone.')) {
      return;
    }

    setIsClearing(true);
    toast.info('Clearing all data...');
    
    try {
      const result = await clearSupabaseData();
      
      if (result.success) {
        toast.success('✅ All data cleared successfully!');
        setLastResult(null);
      } else {
        toast.error('Failed to clear data: ' + result.message);
      }
    } catch (error) {
      console.error('Error clearing data:', error);
      toast.error('Unexpected error occurred while clearing data');
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Supabase Data Population
          </CardTitle>
          <CardDescription>
            Populate your Supabase database with mock data to enable real-time functionality across the entire application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Button
              onClick={handlePopulateData}
              disabled={isPopulating || isClearing}
              className="flex items-center gap-2"
            >
              {isPopulating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {isPopulating ? 'Populating...' : 'Populate Mock Data'}
            </Button>
            
            <Button
              onClick={handleClearData}
              disabled={isPopulating || isClearing}
              variant="destructive"
              className="flex items-center gap-2"
            >
              {isClearing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              {isClearing ? 'Clearing...' : 'Clear All Data'}
            </Button>
          </div>

          {lastResult && (
            <div className="mt-4 p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                {lastResult.success ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <span className={`font-medium ${lastResult.success ? 'text-green-700' : 'text-red-700'}`}>
                  {lastResult.message}
                </span>
              </div>
              
              {lastResult.success && lastResult.counts && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
                  <Badge variant="secondary" className="justify-center">
                    Companies: {lastResult.counts.companies}
                  </Badge>
                  <Badge variant="secondary" className="justify-center">
                    Students: {lastResult.counts.students}
                  </Badge>
                  <Badge variant="secondary" className="justify-center">
                    Jobs: {lastResult.counts.jobs}
                  </Badge>
                  <Badge variant="secondary" className="justify-center">
                    Profiles: {lastResult.counts.profiles}
                  </Badge>
                  <Badge variant="secondary" className="justify-center">
                    Applications: {lastResult.counts.applications}
                  </Badge>
                  <Badge variant="secondary" className="justify-center">
                    Attendance: {lastResult.counts.attendance}
                  </Badge>
                </div>
              )}
            </div>
          )}

          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>What this will populate:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>All mock companies with their details</li>
              <li>All mock students with profiles</li>
              <li>All mock jobs with company associations</li>
              <li>User profiles for authentication</li>
              <li>Sample job applications for testing</li>
              <li>Sample attendance records</li>
            </ul>
            <p className="mt-3 text-amber-600">
              <strong>Note:</strong> This will enable real-time functionality for job applications, 
              student dashboards, admin panels, and all other features.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataPopulator;
