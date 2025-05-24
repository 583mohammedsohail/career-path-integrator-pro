import React, { useState, useRef } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Phone, MapPin, Linkedin, Mail, Github } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Available departments
const departments = [
  "Computer Science",
  "Information Technology",
  "Electronics & Communication",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Biotechnology",
  "Aerospace Engineering",
  "Other"
];

// Available courses
const courses = [
  "B.Tech",
  "M.Tech",
  "BCA",
  "MCA",
  "BSc",
  "MSc",
  "BE",
  "ME",
  "Other"
];

// Core form schema for all user types
const coreFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  role: z.enum(['student', 'company', 'admin', 'management'], { 
    required_error: "Please select a role." 
  }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }).optional(),
  address: z.string().optional(),
  university: z.string().min(2, { message: "Please enter your university name." }),
  avatar: z.instanceof(File, { message: "Profile image is required." }),
});

// Student-specific form schema
const studentFormSchema = z.object({
  department: z.string().min(2, { message: "Please select a department." }),
  course: z.string().min(2, { message: "Please select a course." }),
  year: z.coerce.number().min(1).max(5),
  cgpa: z.coerce.number().min(0).max(10),
  skills: z.string().transform((val) => val.split(',').map(s => s.trim()).filter(Boolean)),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }).optional(),
  address: z.string().optional(),
});

// Combine schemas based on role
const formSchema = coreFormSchema.and(
  z.discriminatedUnion('role', [
    z.object({
      role: z.literal('student'),
      department: z.string().min(2, { message: "Please select a department." }),
      course: z.string().min(2, { message: "Please select a course." }),
      year: z.coerce.number().min(1).max(5),
      cgpa: z.coerce.number().min(0).max(10),
      skills: z.string(),
      phone: z.string().min(10, { message: "Please enter a valid phone number." }).optional(),
      address: z.string().optional(),
    }),
    z.object({
      role: z.literal('company'),
      phone: z.string().min(10, { message: "Please enter a valid phone number." }).optional(),
      address: z.string().optional(),
    }),
    z.object({
      role: z.literal('admin'),
      phone: z.string().min(10, { message: "Please enter a valid phone number." }).optional(),
      address: z.string().optional(),
    }),
    z.object({
      role: z.literal('management'),
      phone: z.string().min(10, { message: "Please enter a valid phone number." }).optional(),
      address: z.string().optional(),
    }),
  ])
);

type FormData = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "student",
      department: "",
      course: "",
      year: 1,
      cgpa: 0,
      skills: "",
      phone: "",
      address: "",
      university: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const selectedRole = form.watch("role");

  const handleSignInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/register',
        },
      });
      
      if (error) {
        toast.error(error.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to sign in with Google');
      }
    }
  };

  const handleSignInWithLinkedIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: {
          redirectTo: window.location.origin + '/register',
        },
      });
      
      if (error) {
        toast.error(error.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to sign in with LinkedIn');
      }
    }
  };

  const handleSignInWithGithub = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: window.location.origin + '/register',
        },
      });
      
      if (error) {
        toast.error(error.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to sign in with GitHub');
      }
    }
  };

  // Twitter login removed as requested

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Sign up with email/password
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            role: data.role,
            phone: data.phone,
            address: data.address,
            university: data.university,
          },
        }
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (authData.user) {
        let avatarUrl = null;
        
        // Upload avatar if provided
        if (avatar) {
          const fileExt = avatar.name.split('.').pop();
          const fileName = `${authData.user.id}.${fileExt}`;
          
          const { error: uploadError, data: uploadData } = await supabase.storage
            .from('avatars')
            .upload(`profiles/${fileName}`, avatar);

          if (uploadError) {
            toast.error(`Error uploading avatar: ${uploadError.message}`);
          } else {
            const { data: urlData } = supabase.storage
              .from('avatars')
              .getPublicUrl(`profiles/${fileName}`);
              
            avatarUrl = urlData?.publicUrl;
          }
        }

        // Insert user profile based on role
        if (data.role === 'student') {
          const { error: studentError } = await supabase
            .from('students')
            .insert({
              id: authData.user.id,
              department: data.department,
              course: data.course,
              year: data.year,
              cgpa: data.cgpa,
              skills: data.skills.split(',').map(s => s.trim()),
              roll_number: `STU${Date.now()}`,
            });

          if (studentError) {
            toast.error(`Error creating student profile: ${studentError.message}`);
            return;
          }
        } else if (data.role === 'company') {
          const { error: companyError } = await supabase
            .from('companies')
            .insert({
              id: authData.user.id,
              company_name: data.name,
              description: '',
              industry: '',
              location: data.address || '',
              website: '',
            });

          if (companyError) {
            toast.error(`Error creating company profile: ${companyError.message}`);
            return;
          }
        }

        // Update profile with avatar if uploaded
        if (avatarUrl) {
          const { error: profileError } = await supabase
            .from('profiles')
            .update({ avatar_url: avatarUrl })
            .eq('id', authData.user.id);

          if (profileError) {
            toast.error(`Error updating profile: ${profileError.message}`);
          }
        }

        // Show verification modal
        setShowVerificationModal(true);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Sign up to access career opportunities and resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium mb-1">Sign in with</div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={handleSignInWithGoogle} type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </Button>
                <Button variant="outline" onClick={handleSignInWithLinkedIn} type="button">
                  <Linkedin className="h-5 w-5 mr-2 text-[#0A66C2]" />
                  LinkedIn
                </Button>
                <Button variant="outline" onClick={handleSignInWithGithub} type="button">
                  <Github className="h-5 w-5 mr-2" />
                  GitHub
                </Button>
                {/* Twitter login button removed as requested */}
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
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={avatarPreview || undefined} />
                    <AvatarFallback>
                      <Camera className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={triggerFileInput}
                    className="w-full"
                  >
                    Upload Profile Picture
                  </Button>
                  {!avatar && (
                    <p className="text-sm text-red-500">Profile picture is required</p>
                  )}
                </div>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{selectedRole === "company" ? "Company Name" : "Full Name"}</FormLabel>
                      <FormControl>
                        <Input placeholder={selectedRole === "company" ? "Acme Inc." : "John Doe"} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="university"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>University/College</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your university or college name" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the full name of your educational institution
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input type="tel" placeholder="+91 9876543210" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <Textarea placeholder="1234 Main St, City, Country" className="min-h-20 pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="company">Company</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {selectedRole === "student" && (
                  <div className="space-y-4">
                    <Separator className="my-4" />
                    <h3 className="text-sm font-medium mb-2">Academic Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your department" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                  {dept}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="course"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your course" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {courses.map((course) => (
                                <SelectItem key={course} value={course}>
                                  {course}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year</FormLabel>
                            <FormControl>
                              <Input type="number" min="1" max="5" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cgpa"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CGPA</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" max="10" step="0.01" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skills</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter your skills (comma-separated)" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Enter your skills separated by commas (e.g., JavaScript, React, Node.js)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-gray-500">
            Already have an account?{" "}
            <Button variant="link" className="p-0" asChild>
              <Link to="/login">Log in</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={showVerificationModal} onOpenChange={setShowVerificationModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center">Registration Successful!</DialogTitle>
            <DialogDescription className="text-center space-y-4">
              <p className="text-base">
                Please check your email and click the confirmation link to verify your account.
              </p>
              <p className="text-sm text-muted-foreground">
                Once you've verified your email, you can log in using your credentials.
              </p>
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={() => {
                    setShowVerificationModal(false);
                    navigate('/login');
                  }}
                  className="w-full max-w-[200px]"
                >
                  Go to Login
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisterForm;
