import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';
import { Session } from '@supabase/supabase-js';
import { mockStudents } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  session: Session | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // For development, set a mock user
    const mockUser = mockStudents[0];
    setCurrentUser(mockUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role?: string) => {
    setIsLoading(true);
    try {
      // For development, use mock login
      const mockUser = mockStudents.find(student => student.email === email);
      if (mockUser) {
        setCurrentUser(mockUser);
        toast.success('Login successful!');
      } else {
        toast.error('Invalid email or password');
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setCurrentUser(null);
    setSession(null);
    toast.success('Logged out successfully');
  };

  const value = {
    currentUser,
    login,
    logout,
    isLoading,
    session
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
