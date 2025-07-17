import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import SimplifiedAdminDashboard from '@/components/admin/SimplifiedAdminDashboard';

const SuperAdminDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not a super admin
  if (currentUser?.role !== 'superadmin') {
    navigate('/');
    toast.error("You don't have permission to access this page.");
    return null;
  }

  return (
    <Layout>
      <SimplifiedAdminDashboard />
    </Layout>
  );
};

export default SuperAdminDashboard;
