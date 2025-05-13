
import React from 'react';
import { Link } from 'react-router-dom';
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
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Bell, Shield, LayoutDashboard, Users, Code, Briefcase, Building, GraduationCap } from 'lucide-react';
import { mockNotifications } from '@/data/mockData';
import { toast } from 'sonner';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  
  // Safely check if currentUser exists before filtering notifications
  const userNotifications = currentUser 
    ? mockNotifications.filter(n => n.user.id === currentUser.id) 
    : [];
  
  const unreadCount = userNotifications.filter(n => !n.isRead).length;

  // Safe fallback for avatar/name initials
  const getNameInitial = () => {
    if (!currentUser || !currentUser.name) return 'U';
    return currentUser.name.charAt(0).toUpperCase();
  };

  // Get the appropriate dashboard path based on user role
  const getDashboardPath = () => {
    if (!currentUser) return '/';
    
    switch (currentUser.role) {
      case 'student':
        return '/student-dashboard';
      case 'company':
        return '/company-dashboard';
      case 'superadmin':
        return '/admin';
      default:
        return '/';
    }
  };

  const dashboardPath = getDashboardPath();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-white font-bold">CP</span>
          </div>
          <span className="font-bold text-xl text-primary">PlacementPro</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          {currentUser && (
            <Link to={dashboardPath} className="text-gray-600 hover:text-primary transition-colors">
              <div className="flex items-center">
                <LayoutDashboard className="mr-1 h-4 w-4" /> Dashboard
              </div>
            </Link>
          )}
          <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
            <div className="flex items-center">
              <Code className="mr-1 h-4 w-4" /> Home
            </div>
          </Link>
          <Link to="/jobs" className="text-gray-600 hover:text-primary transition-colors">
            <div className="flex items-center">
              <Briefcase className="mr-1 h-4 w-4" /> Jobs
            </div>
          </Link>
          <Link to="/companies" className="text-gray-600 hover:text-primary transition-colors">
            <div className="flex items-center">
              <Building className="mr-1 h-4 w-4" /> Companies
            </div>
          </Link>
          <Link to="/students" className="text-gray-600 hover:text-primary transition-colors">
            <div className="flex items-center">
              <GraduationCap className="mr-1 h-4 w-4" /> Students
            </div>
          </Link>
          <Link to="/developers-team" className="text-gray-600 hover:text-primary transition-colors">
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4" /> Developer's Team
            </div>
          </Link>
          {currentUser && currentUser.role === 'superadmin' && (
            <Link to="/admin" className="text-gray-600 hover:text-primary transition-colors flex items-center">
              <Shield className="mr-1 h-4 w-4" /> Admin
            </Link>
          )}
        </nav>
        
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {userNotifications.length > 0 ? (
                    userNotifications.map(notification => (
                      <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
                        <span className={`text-sm ${!notification.isRead ? 'font-medium' : ''}`}>
                          {notification.message}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                          {new Date(notification.createdAt).toLocaleString()}
                        </span>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuItem className="p-3 text-center text-muted-foreground">
                      No notifications
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.name || 'User'} />
                      <AvatarFallback>{getNameInitial()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{currentUser.name || 'User'}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {currentUser.email}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground capitalize">
                        {currentUser.role}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/profile" className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to={dashboardPath} className="flex items-center w-full">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  {currentUser.role === 'superadmin' && (
                    <DropdownMenuItem>
                      <Link to="/admin" className="flex items-center w-full">
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
