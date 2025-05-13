
import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../contexts/AuthContext';
import DeveloperCredits from '../components/layout/DeveloperCredits';

const Login = () => {
  const { currentUser, isLoading } = useAuth();

  // Redirect if already logged in
  if (currentUser && !isLoading) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <div className="flex flex-col min-h-[calc(100vh-16rem)]">
        <div className="flex flex-col items-center justify-center flex-1 px-4 py-12">
          <h1 className="text-3xl font-bold text-center mb-2 text-primary">Welcome to PlacementPro</h1>
          <p className="text-gray-600 text-center mb-8">Your gateway to career opportunities</p>
          <LoginForm />
        </div>
        
        {/* Use the DeveloperCredits component */}
        <DeveloperCredits />
      </div>
    </Layout>
  );
};

export default Login;
