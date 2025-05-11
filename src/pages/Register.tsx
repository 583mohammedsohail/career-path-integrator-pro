
import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../contexts/AuthContext';
import { ExternalLink } from 'lucide-react';

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
        
        {/* Developer Credits */}
        <div className="text-center pb-8 text-sm text-muted-foreground">
          <p>Developed by</p>
          <div className="flex items-center justify-center gap-4 mt-1">
            <a 
              href="https://www.linkedin.com/in/sana-parveen-93b29b294/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:underline"
            >
              Sana Parveen
              <ExternalLink size={14} />
            </a>
            <span>&</span>
            <a 
              href="https://www.linkedin.com/in/mohammed-sohail-82176825b/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:underline"
            >
              Mohammed Sohail
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
