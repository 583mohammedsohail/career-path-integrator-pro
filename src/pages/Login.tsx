
import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const { currentUser, isLoading } = useAuth();

  // Redirect if already logged in
  if (currentUser && !isLoading) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh-16rem)] px-4 py-12">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default Login;
