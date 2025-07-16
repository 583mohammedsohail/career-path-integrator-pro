import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!currentUser) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    const dashboardRoute = () => {
      switch (currentUser.role) {
        case 'student':
          return '/student-dashboard';
        case 'company':
          return '/company-dashboard';
        case 'admin':
          return '/admin-dashboard';
        case 'management':
          return '/management-dashboard';
        case 'superadmin':
          return '/admin';
        default:
          return '/';
      }
    };
    
    return <Navigate to={dashboardRoute()} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;