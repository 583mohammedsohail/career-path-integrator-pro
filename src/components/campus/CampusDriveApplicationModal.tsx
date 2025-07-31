import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
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

interface CampusDriveApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  drive: any; // Replace with CampusDrive type if available
  companyName?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  coverletter: string;
  resume: FileList | null;
}

const CampusDriveApplicationModal: React.FC<CampusDriveApplicationModalProps> = ({
  isOpen,
  onClose,
  drive,
  companyName
}) => {
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: '',
      coverletter: '',
      resume: null
    }
  });

  const onSubmit = async (data: FormData) => {
    if (!currentUser) {
      toast.error('You must be logged in to apply');
      return;
    }
    setIsSubmitting(true);
    try {
      // Simulate upload delay
      await new Promise(res => setTimeout(res, 1000));
      toast.success('Successfully applied to campus drive!');
      onClose();
    } catch (error) {
      toast.error('Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Apply for {drive?.title}</DialogTitle>
          <DialogDescription>
            Submit your application to {companyName || 'Company'}. Please fill in the required information and upload your resume.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" {...register('name', { required: 'Full name is required' })} />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" {...register('email', { required: 'Email is required' })} />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" {...register('phone')} />
              </div>
              <div>
                <Label htmlFor="resume">Resume * (PDF or Word)</Label>
                <Input id="resume" type="file" accept=".pdf,.doc,.docx" {...register('resume', { required: 'Resume is required' })} />
                {errors.resume && <p className="text-sm text-red-500">{errors.resume.message}</p>}
                <p className="text-xs text-muted-foreground mt-1">Max file size: 5MB</p>
              </div>
            </div>
            <div>
              <Label htmlFor="coverletter">Cover Letter</Label>
              <Textarea id="coverletter" className="min-h-[120px]" placeholder="Tell us why you're a good fit for this drive" {...register('coverletter')} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Application'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CampusDriveApplicationModal;
