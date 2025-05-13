import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Bell, User, ChevronDown, LogOut, Settings, UserCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      // Navigation is handled in the logout function
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleProtectedNavigation = (path: string) => {
    if (!isAuthenticated) {
      toast.error('Please login to access this feature');
      navigate('/login');
      return false;
    }
    navigate(path);
    return true;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'bg-blue-100 text-blue-800';
      case 'company':
        return 'bg-green-100 text-green-800';
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'management':
        return 'bg-amber-100 text-amber-800';
      case 'superadmin':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold">CP</span>
            </div>
            <span className="font-bold text-xl text-primary">PlacementPro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`text-gray-600 hover:text-primary ${location.pathname === '/' ? 'text-primary font-medium' : ''}`}>
              Home
            </Link>
            <Button 
              variant="link" 
              className={`p-0 text-gray-600 hover:text-primary ${location.pathname === '/jobs' ? 'text-primary font-medium' : ''}`}
              onClick={() => handleProtectedNavigation('/jobs')}
            >
              Jobs
            </Button>
            <Button 
              variant="link" 
              className={`p-0 text-gray-600 hover:text-primary ${location.pathname === '/companies' ? 'text-primary font-medium' : ''}`}
              onClick={() => handleProtectedNavigation('/companies')}
            >
              Companies
            </Button>
            <Button 
              variant="link" 
              className={`p-0 text-gray-600 hover:text-primary ${location.pathname === '/students' ? 'text-primary font-medium' : ''}`}
              onClick={() => handleProtectedNavigation('/students')}
            >
              Students
            </Button>
            <Link to="/developers-team" className={`text-gray-600 hover:text-primary ${location.pathname === '/developers-team' ? 'text-primary font-medium' : ''}`}>
              Developers
            </Link>
          </nav>

          {/* User Menu or Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-80 overflow-auto">
                      <div className="p-3 hover:bg-gray-100 cursor-pointer">
                        <p className="font-medium text-sm">New job posting from TCS</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                      <div className="p-3 hover:bg-gray-100 cursor-pointer">
                        <p className="font-medium text-sm">Your application was viewed</p>
                        <p className="text-xs text-gray-500">Yesterday</p>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
                        <AvatarFallback>{currentUser?.name ? getInitials(currentUser.name) : 'U'}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start text-sm">
                        <span className="font-medium">{currentUser?.name}</span>
                        <Badge variant="outline" className={`text-xs px-1 py-0 ${getRoleBadgeColor(currentUser?.role || '')}`}>
                          {currentUser?.role?.charAt(0).toUpperCase() + currentUser?.role?.slice(1)}
                        </Badge>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              to="/" 
              className={`block py-2 ${location.pathname === '/' ? 'text-primary font-medium' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Button 
              variant="link" 
              className={`p-0 block py-2 ${location.pathname === '/jobs' ? 'text-primary font-medium' : 'text-gray-600'}`}
              onClick={() => handleProtectedNavigation('/jobs')}
            >
              Jobs
            </Button>
            <Button 
              variant="link" 
              className={`p-0 block py-2 ${location.pathname === '/companies' ? 'text-primary font-medium' : 'text-gray-600'}`}
              onClick={() => handleProtectedNavigation('/companies')}
            >
              Companies
            </Button>
            <Button 
              variant="link" 
              className={`p-0 block py-2 ${location.pathname === '/students' ? 'text-primary font-medium' : 'text-gray-600'}`}
              onClick={() => handleProtectedNavigation('/students')}
            >
              Students
            </Button>
            <Link 
              to="/developers-team" 
              className={`block py-2 ${location.pathname === '/developers-team' ? 'text-primary font-medium' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Developers
            </Link>
            
            {isAuthenticated ? (
              <>
                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
                      <AvatarFallback>{currentUser?.name ? getInitials(currentUser.name) : 'U'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{currentUser?.name}</p>
                      <p className="text-sm text-gray-500">{currentUser?.email}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mb-2"
                    onClick={() => {
                      navigate('/profile');
                      setIsMenuOpen(false);
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="border-t pt-4 mt-4 flex flex-col space-y-2">
                <Button asChild variant="outline">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
