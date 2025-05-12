import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Linkedin, Phone } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
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

  const handleSignInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/login',
        },
      });
      
      if (error) {
        toast.error(error.message);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in with Google';
      toast.error(errorMessage);
    }
  };

  const handleSignInWithLinkedIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: {
          redirectTo: window.location.origin + '/login',
        },
      });
      
      if (error) {
        toast.error(error.message);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in with LinkedIn';
      toast.error(errorMessage);
    }
  };

  const handlePhoneLogin = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        phone: phoneNumber,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      setShowVerificationDialog(true);
      toast.success(`Verification code sent to ${phoneNumber}`);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send verification code';
      toast.error(errorMessage);
    }
  };

  const verifyPhoneCode = async () => {
    try {
      if (!verificationCode || verificationCode.length !== 6) {
        toast.error('Please enter a valid 6-digit code');
        return;
      }

      const { data, error } = await supabase.auth.verifyOtp({
        phone: phoneNumber,
        token: verificationCode,
        type: 'sms'
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data.user) {
        setShowVerificationDialog(false);
        toast.success('Phone verification successful!');
        
        // The session will be handled by the AuthContext's onAuthStateChange
        navigate('/');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to verify phone number';
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="phone">Phone</TabsTrigger>
            </TabsList>
            
            <TabsContent value="email" className="mt-4">
              <div className="flex flex-col gap-4 mb-4">
                <div className="flex flex-col gap-2">
                  <div className="text-sm font-medium mb-1">Sign in with</div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={handleSignInWithGoogle} type="button" className="flex-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" onClick={handleSignInWithLinkedIn} type="button" className="flex-1">
                      <Linkedin className="h-5 w-5 mr-2 text-[#0A66C2]" />
                      LinkedIn
                    </Button>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
              </div>
            
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
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot?
                    </Link>
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
            </TabsContent>
            
            <TabsContent value="phone" className="mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      className="pl-10"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button
                  onClick={handlePhoneLogin}
                  className="w-full"
                >
                  Send Verification Code
                </Button>
              </div>
            </TabsContent>
          </Tabs>

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

      {/* Phone Verification Dialog */}
      <Dialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Verify your phone number</DialogTitle>
            <DialogDescription>
              We've sent a 6-digit verification code to your phone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-center">
                Enter the 6-digit code sent to {phoneNumber}
              </p>
              <div className="w-full max-w-[300px]">
                <InputOTP 
                  maxLength={6} 
                  value={verificationCode}
                  onChange={(value) => {
                    setVerificationCode(value);
                  }}
                  containerClassName="gap-2"
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots.map((slot, index) => (
                        <InputOTPSlot key={index} {...slot} index={index} />
                      ))}
                    </InputOTPGroup>
                  )}
                />
              </div>
              <Button className="mt-4" onClick={verifyPhoneCode}>Verify</Button>
            </div>
            
            <div className="text-center text-sm text-gray-500">
              <p>Didn't receive the code? <Button variant="link" className="p-0" onClick={handlePhoneLogin}>Resend</Button></p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginForm;
