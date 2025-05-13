import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobTitle: string;
  companyName: string;
  onSuccess: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  coverletter: string;
  resume: FileList | null;
}

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  isOpen,
  onClose,
  jobId,
  jobTitle,
  companyName,
  onSuccess
}) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (!currentUser) {
      toast.error("You must be logged in to apply");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Check if resume file exists
      if (!data.resume?.[0]) {
        throw new Error("Resume file is required");
      }

      // Upload resume
      const resumeFile = data.resume[0];
      const fileExt = resumeFile.name.split('.').pop();
      const fileName = `${currentUser.id}_${Date.now()}.${fileExt}`;
      
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('resumes')
        .upload(`applications/${fileName}`, resumeFile);

      if (uploadError) {
        throw new Error(`Error uploading resume: ${uploadError.message}`);
      }

      // Get the public URL for the uploaded resume
      const { data: urlData } = supabase.storage
        .from('resumes')
        .getPublicUrl(`applications/${fileName}`);
        
      const resumeUrl = urlData?.publicUrl;

      if (!resumeUrl) {
        throw new Error("Failed to get resume URL");
      }

      // Create the job application
      const { error: applicationError } = await supabase
        .from('job_applications')
        .insert({
          job_id: jobId,
          student_id: currentUser.id,
          status: 'pending',
          resume_url: resumeUrl,
          cover_letter: data.coverletter || null,
          applied_at: new Date().toISOString()
        });

      if (applicationError) {
        throw new Error(`Error submitting application: ${applicationError.message}`);
      }

      toast.success('Application submitted successfully!');
      onSuccess();
      
      // Redirect to student dashboard with the applications tab active
      navigate('/student-dashboard', { state: { activeTab: 'applications' } });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error(error instanceof Error ? error.message : "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
          <DialogDescription>
            Submit your application to {companyName}. Please fill in the required information and upload your resume.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your full name"
              defaultValue={currentUser?.name || ''}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              defaultValue={currentUser?.email || ''}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              {...register("phone", { required: "Phone number is required" })}
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="coverletter">Cover Letter (Optional)</Label>
            <Textarea
              id="coverletter"
              {...register("coverletter")}
              placeholder="Tell us why you're a good fit for this role"
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="resume">Resume</Label>
            <Input
              id="resume"
              type="file"
              {...register("resume", { 
                required: "Resume is required",
                validate: {
                  fileType: (value) => {
                    if (!value?.[0]) return true;
                    const acceptedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                    return acceptedTypes.includes(value[0].type) || "Only PDF and Word documents are accepted";
                  },
                  fileSize: (value) => {
                    if (!value?.[0]) return true;
                    return value[0].size <= 5000000 || "File size must be less than 5MB";
                  }
                }
              })}
              accept=".pdf,.doc,.docx"
            />
            {errors.resume && <p className="text-sm text-red-500">{errors.resume.message}</p>}
            <p className="text-xs text-gray-500">Accepted formats: PDF, DOC, DOCX. Max size: 5MB</p>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationModal;
