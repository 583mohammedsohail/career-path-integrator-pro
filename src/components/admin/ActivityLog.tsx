
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface SystemActivity {
  id: string;
  user_id: string;
  action_type: string;
  entity_type: string;
  entity_id: string | null;
  details: any;
  created_at: string;
  user?: {
    name: string;
    email: string;
  };
}

const ActivityLog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const fetchActivity = async () => {
    let query = supabase
      .from('system_audit')
      .select(`
        *,
        user:profiles(name, email)
      `)
      .order('created_at', { ascending: false })
      .limit(100);
    
    if (searchQuery) {
      query = query.or(`action_type.ilike.%${searchQuery}%,entity_type.ilike.%${searchQuery}%`);
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    return data || [];
  };

  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['activities', searchQuery],
    queryFn: fetchActivity,
    staleTime: 60 * 1000, // 1 minute
  });

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'login':
        return 'bg-blue-100 text-blue-800';
      case 'registration':
        return 'bg-green-100 text-green-800';
      case 'create':
        return 'bg-green-100 text-green-800';
      case 'update':
        return 'bg-yellow-100 text-yellow-800';
      case 'delete':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>System Activity Log</CardTitle>
        <Input 
          placeholder="Search activities..." 
          className="max-w-xs" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Entity Type</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">Loading...</TableCell>
                </TableRow>
              ) : activities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No activities found</TableCell>
                </TableRow>
              ) : (
                activities.map((activity: SystemActivity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{formatDateTime(activity.created_at)}</TableCell>
                    <TableCell>
                      {activity.user?.name || activity.user?.email || 'Unknown User'}
                    </TableCell>
                    <TableCell>
                      <Badge className={getActionColor(activity.action_type)}>
                        {activity.action_type}
                      </Badge>
                    </TableCell>
                    <TableCell>{activity.entity_type}</TableCell>
                    <TableCell>
                      {activity.details ? (
                        <pre className="text-xs whitespace-pre-wrap max-w-xs">
                          {JSON.stringify(activity.details, null, 2)}
                        </pre>
                      ) : 'No details'}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityLog;
