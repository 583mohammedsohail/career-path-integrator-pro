
import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../contexts/AuthContext';
import DeveloperCredits from '../components/layout/DeveloperCredits';

const Register = () => {
  const { currentUser, isLoading } = useAuth();

  // Redirect if already logged in
  if (currentUser && !isLoading) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <div className="flex flex-col min-h-[calc(100vh-16rem)]">
        <div className="flex items-center justify-center flex-1 px-4 py-12">
          <RegisterForm />
        </div>
        
        {/* Use the DeveloperCredits component */}
        <DeveloperCredits />
      </div>
    </Layout>
  );
};

export default Register;
