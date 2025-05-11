
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(true); // Changed to default open
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      // Error is handled in the login function
      console.error('Login failed:', error);
    }
  };

  const handleTestLogin = (testEmail: string) => {
    setEmail(testEmail);
    setPassword('test123'); // Default test password
    toast.info('Test credentials applied. Click Login to continue.');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Test Credentials Section - Expanded by default */}
        <div className="mt-6 border-t pt-4">
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium text-gray-700 hover:text-primary mb-2">
              Test Credentials (All use password: test123)
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2">
              <div className="text-sm text-gray-500 mb-2 font-bold">All test accounts use password: <span className="text-primary">test123</span></div>
              
              <div className="text-sm font-medium text-gray-700 mb-2">Students:</div>
              <div className="space-y-1">
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => handleTestLogin('alex.johnson@college.edu')}>
                  Alex Johnson (Student)
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => handleTestLogin('sarah.williams@college.edu')}>
                  Sarah Williams (Student)
                </Button>
              </div>

              <div className="text-sm font-medium text-gray-700 mt-3 mb-2">Companies:</div>
              <div className="space-y-1">
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => handleTestLogin('hr@tcs.com')}>
                  TCS (Company)
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => handleTestLogin('hr@infosys.com')}>
                  Infosys (Company)
                </Button>
              </div>

              <div className="text-sm font-medium text-gray-700 mt-3 mb-2">Admins:</div>
              <div className="space-y-1">
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => handleTestLogin('robert.clark@college.edu')}>
                  Prof. Robert Clark (Admin)
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => handleTestLogin('jennifer.lee@college.edu')}>
                  Dr. Jennifer Lee (Admin)
                </Button>
              </div>

              <div className="text-sm font-medium text-gray-700 mt-3 mb-2">Management:</div>
              <div className="space-y-1">
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => handleTestLogin('david.morgan@college.edu')}>
                  David Morgan (Management)
                </Button>
              </div>

              <div className="text-sm font-medium text-gray-700 mt-3 mb-2">Super Admin:</div>
              <div className="space-y-1">
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => handleTestLogin('sysadmin@college.edu')}>
                  System Administrator (Super Admin)
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-gray-500">
          Don't have an account?{" "}
          <Button variant="link" className="p-0" asChild>
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
