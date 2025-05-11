
import React, { useState, useRef } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
import { Camera } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

// Core form schema for all user types
const coreFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  role: z.enum(['student', 'company', 'admin', 'management'], { 
    required_error: "Please select a role." 
  }),
});

// Student-specific form schema
const studentFormSchema = z.object({
  department: z.string().min(2, { message: "Please select a department." }),
  course: z.string().min(2, { message: "Please select a course." }),
  year: z.coerce.number().min(1).max(5),
  cgpa: z.coerce.number().min(0).max(10),
  skills: z.string().transform((val) => val.split(',').map(s => s.trim()).filter(Boolean)),
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
    }),
    z.object({
      role: z.literal('company'),
    }),
    z.object({
      role: z.literal('admin'),
    }),
    z.object({
      role: z.literal('management'),
    }),
  ])
);

type FormData = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
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

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            role: data.role,
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
        
        // Insert the profile data based on role
        if (data.role === 'student') {
          // For students, extract additional fields
          const { role, department, course, year, cgpa, skills, ...rest } = data;
          
          const { error: profileError } = await supabase
            .from('students')
            .insert({
              id: authData.user.id,
              roll_number: `S${Math.floor(100000 + Math.random() * 900000)}`, // Generate a random roll number
              department: department,
              course: course,
              year: year,
              cgpa: cgpa,
              skills: typeof skills === 'string' 
                ? skills.split(',').map(s => s.trim()).filter(Boolean) 
                : skills
            });
            
          if (profileError) {
            toast.error(`Error creating student profile: ${profileError.message}`);
          }
          
          // Update avatar URL in the profiles table
          if (avatarUrl) {
            const { error: avatarError } = await supabase
              .from('profiles')
              .update({ avatar_url: avatarUrl })
              .eq('id', authData.user.id);
              
            if (avatarError) {
              toast.error(`Error updating profile avatar: ${avatarError.message}`);
            }
          }
        } else if (data.role === 'company') {
          const { error: profileError } = await supabase
            .from('companies')
            .insert({
              id: authData.user.id,
              company_name: data.name,
            });
            
          if (profileError) {
            toast.error(`Error creating company profile: ${profileError.message}`);
          }
        }
        
        toast.success("Registration successful! You can now log in.");
        navigate('/login');
      }
    } catch (err) {
      toast.error("Registration failed. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Available departments and courses
  const departments = [
    "Computer Science",
    "Electronics",
    "Mechanical",
    "Civil",
    "Electrical",
    "Information Technology",
    "Chemical",
    "Biotechnology"
  ];
  
  const courses = [
    "B.Tech",
    "M.Tech",
    "BCA",
    "MCA",
    "B.Sc",
    "M.Sc",
  ];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Avatar upload section for students */}
            {selectedRole === "student" && (
              <div className="flex flex-col items-center justify-center mb-4">
                <div 
                  onClick={triggerFileInput}
                  className="relative cursor-pointer group mb-2"
                >
                  <Avatar className="h-24 w-24 border-2 border-primary">
                    <AvatarImage src={avatarPreview || ""} />
                    <AvatarFallback className="bg-muted">
                      <Camera className="h-8 w-8 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-white text-xs font-medium">Upload Photo</span>
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <p className="text-xs text-muted-foreground">Upload your profile picture</p>
              </div>
            )}
            
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
            
            {/* Student-specific fields */}
            {selectedRole === "student" && (
              <>
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
                          placeholder="Java, Python, React, Machine Learning, etc. (Comma separated)" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Enter your skills separated by commas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Register"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-gray-500">
          Already have an account?{" "}
          <Button variant="link" className="p-0" onClick={() => navigate("/login")}>
            Log in
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
