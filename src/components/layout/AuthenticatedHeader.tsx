
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

const AuthenticatedHeader: React.FC = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleProtectedNavigation = (path: string) => {
    if (!isAuthenticated) {
      toast.error('Please login to access this feature');
      navigate('/login');
      return false;
    }
    navigate(path);
    return true;
  };
  
  return <Header />;
};

export default AuthenticatedHeader;
