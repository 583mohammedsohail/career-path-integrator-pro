
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/types';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: {
    email: string;
    password: string;
    name: string;
    role: string;
    department?: string;
    course?: string;
    year?: number;
    cgpa?: number;
    company_name?: string;
    industry?: string;
    roll_number?: string;
  }) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (profileData: Partial<User>) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // Mock user data for development
          const mockUser: User = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name || 'User',
            role: session.user.user_metadata?.role || 'student',
            avatar_url: session.user.user_metadata?.avatar_url,
            avatar: session.user.user_metadata?.avatar_url,
            department: session.user.user_metadata?.department,
            course: session.user.user_metadata?.course,
            year: session.user.user_metadata?.year,
            cgpa: session.user.user_metadata?.cgpa,
            skills: session.user.user_metadata?.skills || [],
            company_name: session.user.user_metadata?.company_name,
            industry: session.user.user_metadata?.industry,
            roll_number: session.user.user_metadata?.roll_number,
          };
          setCurrentUser(mockUser);
        }
      } catch (error) {
        console.error('Error checking user session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const mockUser: User = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name || 'User',
            role: session.user.user_metadata?.role || 'student',
            avatar_url: session.user.user_metadata?.avatar_url,
            avatar: session.user.user_metadata?.avatar_url,
            department: session.user.user_metadata?.department,
            course: session.user.user_metadata?.course,
            year: session.user.user_metadata?.year,
            cgpa: session.user.user_metadata?.cgpa,
            skills: session.user.user_metadata?.skills || [],
            company_name: session.user.user_metadata?.company_name,
            industry: session.user.user_metadata?.industry,
            roll_number: session.user.user_metadata?.roll_number,
          };
          setCurrentUser(mockUser);
        } else if (event === 'SIGNED_OUT') {
          setCurrentUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    name: string;
    role: string;
    department?: string;
    course?: string;
    year?: number;
    cgpa?: number;
    company_name?: string;
    industry?: string;
    roll_number?: string;
  }): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            role: userData.role,
            department: userData.department,
            course: userData.course,
            year: userData.year,
            cgpa: userData.cgpa,
            company_name: userData.company_name,
            industry: userData.industry,
            roll_number: userData.roll_number,
          },
        },
      });

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = async (profileData: Partial<User>): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: profileData,
      });

      if (error) throw error;

      if (currentUser) {
        setCurrentUser({ ...currentUser, ...profileData });
      }

      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  const value: AuthContextType = {
    currentUser,
    login,
    register,
    logout,
    updateProfile,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
