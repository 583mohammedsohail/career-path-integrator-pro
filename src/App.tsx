
import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ApplicationProvider } from './contexts/ApplicationContext';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Jobs from '@/pages/Jobs';
import JobDetails from '@/pages/JobDetails';
import Companies from '@/pages/Companies';
import CompanyProfile from '@/pages/CompanyProfile';
import Students from '@/pages/Students';
import StudentProfile from '@/pages/StudentProfile';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/NotFound';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import ManagementDashboard from './pages/ManagementDashboard';
import AdminDashboard from './pages/AdminDashboard';
import DevelopersTeam from './pages/DevelopersTeam';
import CampusRecruitment from './pages/CampusRecruitment';
import CampusDriveDetails from './pages/CampusDriveDetails';
import { Toaster } from 'sonner';

// Protected route wrapper
const ProtectedRoute = ({ element, allowedRoles = [] }: { element: React.ReactNode; allowedRoles?: string[] }) => {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!isLoading && !currentUser) {
      navigate('/login');
    }
    // If user exists but role is restricted
    else if (!isLoading && currentUser && allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
      navigate('/');
    }
  }, [currentUser, isLoading, navigate, allowedRoles]);

  if (isLoading) {
    // Show loading state
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return null; // Will be redirected by useEffect
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    return null; // Will be redirected by useEffect
  }

  return <>{element}</>;
};

// Dashboard router - redirects to appropriate dashboard based on user role
const DashboardRouter = () => {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!currentUser) {
        navigate('/login');
      } else {
        switch (currentUser.role) {
          case 'student':
            navigate('/student-dashboard');
            break;
          case 'company':
            navigate('/company-dashboard');
            break;
          case 'admin':
            navigate('/admin-dashboard');
            break;
          case 'management':
            navigate('/management-dashboard');
            break;
          case 'superadmin':
            navigate('/admin');
            break;
          default:
            navigate('/');
            break;
        }
      }
    }
  }, [currentUser, isLoading, navigate]);

  // Show loading during the redirect
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/jobs/:id",
    element: <JobDetails />,
  },
  {
    path: "/companies",
    element: <Companies />,
  },
  {
    path: "/companies/:id",
    element: <CompanyProfile />,
  },
  {
    path: "/students",
    element: <Students />,
  },
  {
    path: "/students/:id",
    element: <StudentProfile />,
  },
  {
    path: "/profile",
    element: <ProtectedRoute element={<Profile />} />,
  },
  {
    path: "/dashboard",
    element: <DashboardRouter />,
  },
  {
    path: "/admin",
    element: <ProtectedRoute element={<SuperAdminDashboard />} allowedRoles={['superadmin']} />,
  },
  {
    path: "/student-dashboard",
    element: <ProtectedRoute element={<StudentDashboard />} allowedRoles={['student']} />,
  },
  {
    path: "/company-dashboard",
    element: <ProtectedRoute element={<CompanyDashboard />} allowedRoles={['company']} />,
  },
  {
    path: "/admin-dashboard",
    element: <ProtectedRoute element={<AdminDashboard />} allowedRoles={['admin']} />,
  },
  {
    path: "/management-dashboard",
    element: <ProtectedRoute element={<ManagementDashboard />} allowedRoles={['management']} />,
  },
  {
    path: "/developers-team",
    element: <DevelopersTeam />,
  },
  {
    path: "/campus-recruitment",
    element: <CampusRecruitment />,
  },
  {
    path: "/campus-drive/:id",
    element: <CampusDriveDetails />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <AuthProvider>
        <ApplicationProvider>
          <Toaster position="top-center" richColors closeButton />
          <RouterProvider router={router} />
        </ApplicationProvider>
      </AuthProvider>
    </React.StrictMode>
  );
};

export default App;
