
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
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Settings, Bell } from 'lucide-react';
import { toast } from 'sonner';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const getDashboardRoute = () => {
    if (!currentUser) return '/';
    
    switch (currentUser.role) {
      case 'student':
        return '/student-dashboard';
      case 'company':
        return '/company-dashboard';
      case 'admin':
        return '/admin-dashboard';
      case 'management':
        return '/management-dashboard';
      case 'superadmin':
        return '/super-admin-dashboard';
      default:
        return '/';
    }
  };

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Campus Placement Portal
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link to="/jobs" className="text-gray-600 hover:text-blue-600">
              Jobs
            </Link>
            <Link to="/companies" className="text-gray-600 hover:text-blue-600">
              Companies
            </Link>
            <Link to="/students" className="text-gray-600 hover:text-blue-600">
              Students
            </Link>
            <Link to="/campus-recruitment" className="text-gray-600 hover:text-blue-600">
              Campus Recruitment
            </Link>
            <Link to="/college-search" className="text-gray-600 hover:text-blue-600">
              College Search
            </Link>
            <Link to="/developers-team" className="text-gray-600 hover:text-blue-600">
              Developer's Team
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                {/* Dashboard Link */}
                <Button variant="outline" asChild>
                  <Link to={getDashboardRoute()}>Dashboard</Link>
                </Button>

                {/* Notifications */}
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={currentUser.avatar_url || currentUser.avatar} alt={currentUser.name} />
                        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
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
                        <p className="text-xs leading-none text-muted-foreground capitalize">
                          {currentUser.role}
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
                      <Link to={getDashboardRoute()} className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
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
