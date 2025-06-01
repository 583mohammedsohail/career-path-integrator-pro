
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User, Settings, Home, Briefcase, Building, Users, Calendar, Code, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      await signOut();
      navigate('/');
    } catch (error: any) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className={`bg-white shadow-sm border-b ${className}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-primary">
              Campus Portal
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link 
                to="/" 
                className="flex items-center text-gray-600 hover:text-primary transition-colors"
              >
                <Home className="h-4 w-4 mr-1" />
                Home
              </Link>
              <Link 
                to="/jobs" 
                className="flex items-center text-gray-600 hover:text-primary transition-colors"
              >
                <Briefcase className="h-4 w-4 mr-1" />
                Jobs
              </Link>
              <Link 
                to="/companies" 
                className="flex items-center text-gray-600 hover:text-primary transition-colors"
              >
                <Building className="h-4 w-4 mr-1" />
                Companies
              </Link>
              <Link 
                to="/students" 
                className="flex items-center text-gray-600 hover:text-primary transition-colors"
              >
                <Users className="h-4 w-4 mr-1" />
                Students
              </Link>
              <Link 
                to="/campus-recruitment" 
                className="flex items-center text-gray-600 hover:text-primary transition-colors"
              >
                <Calendar className="h-4 w-4 mr-1" />
                Campus Recruitment
              </Link>
              <Link 
                to="/college-search" 
                className="flex items-center text-gray-600 hover:text-primary transition-colors"
              >
                <Search className="h-4 w-4 mr-1" />
                College Search
              </Link>
              <Link 
                to="/developers-team" 
                className="flex items-center text-gray-600 hover:text-primary transition-colors"
              >
                <Code className="h-4 w-4 mr-1" />
                Developer's Team
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
                      <AvatarFallback>{currentUser?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {currentUser.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={handleSignOut}
                    disabled={isLoading}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{isLoading ? 'Signing out...' : 'Sign out'}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
