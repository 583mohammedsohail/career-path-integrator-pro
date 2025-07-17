import React, { createContext, useContext, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

const UserSessionContext = createContext({});

export const UserSessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    // Start session tracking when user is authenticated
    const startSession = async () => {
      try {
        // Try to call the function to update user activity
        const { error } = await supabase.rpc('update_user_activity');
        if (error) {
          console.log('Session tracking not yet implemented:', error.message);
        }
      } catch (error) {
        console.log('Session tracking will be implemented later');
      }
    };

    startSession();

    // Update activity every 2 minutes
    const activityInterval = setInterval(() => {
      if (currentUser) {
        startSession();
      }
    }, 2 * 60 * 1000);

    // Update activity on user interactions
    const updateActivity = () => {
      if (currentUser) {
        startSession();
      }
    };

    // Listen for user interactions
    window.addEventListener('click', updateActivity);
    window.addEventListener('keypress', updateActivity);
    window.addEventListener('scroll', updateActivity);

    return () => {
      clearInterval(activityInterval);
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('keypress', updateActivity);
      window.removeEventListener('scroll', updateActivity);
    };
  }, [currentUser]);

  return (
    <UserSessionContext.Provider value={{}}>
      {children}
    </UserSessionContext.Provider>
  );
};

export const useUserSession = () => {
  const context = useContext(UserSessionContext);
  if (!context) {
    throw new Error('useUserSession must be used within a UserSessionProvider');
  }
  return context;
};