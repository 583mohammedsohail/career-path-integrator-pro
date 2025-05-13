
import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import RegisterForm from '../components/auth/RegisterForm';
import WelcomeCarousel from '../components/auth/WelcomeCarousel';
import { useAuth } from '../contexts/AuthContext';
import DeveloperCredits from '../components/layout/DeveloperCredits';
import { motion } from 'framer-motion';

const Register = () => {
  const { currentUser, isLoading, isAuthenticated } = useAuth();

  // Redirect if already logged in
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <div className="flex flex-col min-h-[calc(100vh-16rem)]">
        <div className="flex flex-col md:flex-row items-stretch justify-center flex-1 px-4 py-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto"
          >
            <RegisterForm />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 max-w-lg"
          >
            <WelcomeCarousel />
          </motion.div>
        </div>
        
        {/* Use the DeveloperCredits component */}
        <DeveloperCredits />
      </div>
    </Layout>
  );
};

export default Register;
