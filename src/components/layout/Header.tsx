
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
import { 
  User, 
  LogOut, 
  Settings, 
  Home, 
  Briefcase, 
  Building2, 
  Users, 
  Calendar,
  Code,
  Search
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
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
        return '/admin';
      default:
        return '/';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary rounded-lg p-2">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">PlacementPro</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/" className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/jobs" className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4" />
                <span>Jobs</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/companies" className="flex items-center space-x-2">
                <Building2 className="h-4 w-4" />
                <span>Companies</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/students" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Students</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/campus-recruitment" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Campus Recruitment</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/college-search" className="flex items-center space-x-2">
                <Search className="h-4 w-4" />
                <span>College Search</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/developers-team" className="flex items-center space-x-2">
                <Code className="h-4 w-4" />
                <span>Developer's Team</span>
              </Link>
            </Button>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.avatar_url || 'https://github.com/shadcn.png'} alt={currentUser.name} />
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
                    <Link to={getDashboardRoute()} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  {currentUser.role === 'student' && (
                    <DropdownMenuItem asChild>
                      <Link to="/student-profile-dashboard" className="cursor-pointer">
                        <Briefcase className="mr-2 h-4 w-4" />
                        <span>Profile Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Profile Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">Sign up</Link>
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
