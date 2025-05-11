import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
    element: <Profile />,
  },
  {
    path: "/admin",
    element: <SuperAdminDashboard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
