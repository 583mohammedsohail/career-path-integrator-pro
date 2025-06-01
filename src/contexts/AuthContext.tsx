
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';
import { Session } from '@supabase/supabase-js';
import { mockStudents, mockCompanies, mockAdmins, mockManagement, mockSuperAdmin } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string, role?: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  session: Session | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to clean up auth state
const cleanupAuthState = () => {
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        
        if (session?.user) {
          // In a real app, we would fetch the user profile from Supabase
          // For this demo, use mock data
          const email = session.user.email;
          let mockUser = null;
          
          // Find the mock user based on email
          if (email) {
            // Fix: mockSuperAdmin is a single object, not an array
            mockUser = mockStudents.find(student => student.email === email) || 
                      mockCompanies.find(company => company.email === email) || 
                      mockAdmins.find(admin => admin.email === email) || 
                      mockManagement.find(manager => manager.email === email) || 
                      (email === 'sysadmin@college.edu' ? mockSuperAdmin : null);
          }
          
          if (mockUser) {
            setCurrentUser(mockUser as User);
          } else {
            // If no mock user found but we have session, create minimal user
            setCurrentUser({
              id: session.user.id,
              name: session.user.user_metadata?.name || 'User',
              email: email || '',
              role: session.user.user_metadata?.role || 'student',
              avatar: session.user.user_metadata?.avatar_url || ''
            });
          }

          // Show welcome message when user is authenticated
          if (event === 'SIGNED_IN') {
            const name = mockUser ? (mockUser as User).name : session.user.user_metadata?.name || 'User';
            toast.success(`Welcome back, ${name}! 👋`);
          }
        } else {
          setCurrentUser(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Got existing session:', session);
      setSession(session);
      
      if (session?.user) {
        // Same logic as above for setting currentUser
        const email = session.user.email;
        let mockUser = null;
        
        if (email) {
          // Fix: mockSuperAdmin is a single object, not an array
          mockUser = mockStudents.find(student => student.email === email) || 
                    mockCompanies.find(company => company.email === email) || 
                    mockAdmins.find(admin => admin.email === email) || 
                    mockManagement.find(manager => manager.email === email) || 
                    (email === 'sysadmin@college.edu' ? mockSuperAdmin : null);
        }
        
        if (mockUser) {
          setCurrentUser(mockUser as User);
        } else if (email) {
          // If no mock user found but we have session, create minimal user
          setCurrentUser({
            id: session.user.id,
            name: session.user.user_metadata?.name || 'User',
            email: email,
            role: session.user.user_metadata?.role || 'student',
            avatar: session.user.user_metadata?.avatar_url || ''
          });
        }
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string, role?: string) => {
    setIsLoading(true);
    try {
      // Clean up any existing auth state
      cleanupAuthState();
      
      // Attempt global sign out before logging in
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
        console.log('Signout before login failed:', err);
      }

      // Try mock login first for test credentials
      const mockUser = mockStudents.find(student => student.email === email) || 
                      mockCompanies.find(company => company.email === email) || 
                      mockAdmins.find(admin => admin.email === email) || 
                      mockManagement.find(manager => manager.email === email) || 
                      (email === 'sysadmin@college.edu' ? mockSuperAdmin : null);

      if (mockUser && password === 'test123') {
        // For test credentials, use Supabase email/password auth but with known credentials
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          // If error from Supabase (likely because test account doesn't exist in Supabase)
          // Just set the mock user directly
          console.log('Supabase auth error with test account, using mock data:', error);
          setCurrentUser(mockUser as User);
          setSession(null); // No real session for mock users
          toast.success(`Welcome back, ${(mockUser as User).name}! 👋`);
        } else if (data.user) {
          // If test account exists in Supabase, we'll get a session
          setSession(data.session);
          setCurrentUser(mockUser as User);
          toast.success(`Welcome back, ${(mockUser as User).name}! 👋`);
        }
      } else {
        // Real Supabase authentication for non-test accounts
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          toast.error(error.message);
          throw error;
        }
        
        if (data.user) {
          // Session will be set by the onAuthStateChange listener
          toast.success(`Welcome back, ${data.user.user_metadata?.name || 'User'}! 👋`);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Clean up auth state
      cleanupAuthState();
      
      // Store user name for goodbye message
      const userName = currentUser?.name || 'User';
      
      // Attempt global sign out
      await supabase.auth.signOut({ scope: 'global' });
      
      setCurrentUser(null);
      setSession(null);
      toast.success(`Goodbye, ${userName}! See you again soon!`);
      
      // Force page reload for a clean state
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
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
