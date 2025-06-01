
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface PostCampusDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDrivePosted: () => void;
}

const PostCampusDriveModal: React.FC<PostCampusDriveModalProps> = ({ isOpen, onClose, onDrivePosted }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    registration_deadline: '',
    positions: 1,
    salary: '',
    eligibility_criteria: '',
    status: 'upcoming' as 'upcoming' | 'ongoing' | 'completed'
  });
  const [roles, setRoles] = useState<string[]>(['']);
  const [requirements, setRequirements] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addRole = () => {
    setRoles([...roles, '']);
  };

  const updateRole = (index: number, value: string) => {
    const updated = [...roles];
    updated[index] = value;
    setRoles(updated);
  };

  const removeRole = (index: number) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  const addRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const updateRequirement = (index: number, value: string) => {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);
  };

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validRoles = roles.filter(role => role.trim() !== '');
      const validRequirements = requirements.filter(req => req.trim() !== '');
      
      // Here you would typically save to your backend/database
      console.log('Posting campus drive:', { 
        ...formData, 
        roles: validRoles, 
        requirements: validRequirements 
      });
      
      toast.success('Campus drive posted successfully!');
      onDrivePosted();
      onClose();
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        date: '',
        registration_deadline: '',
        positions: 1,
        salary: '',
        eligibility_criteria: '',
        status: 'upcoming'
      });
      setRoles(['']);
      setRequirements(['']);
    } catch (error) {
      console.error('Error posting campus drive:', error);
      toast.error('Failed to post campus drive. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Post Campus Drive</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Drive Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Software Development Recruitment 2025"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. College Campus, Bangalore"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the campus drive, company, and opportunities..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="date">Drive Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="registration_deadline">Registration Deadline *</Label>
              <Input
                id="registration_deadline"
                type="date"
                value={formData.registration_deadline}
                onChange={(e) => setFormData({ ...formData, registration_deadline: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="positions">Positions Available</Label>
              <Input
                id="positions"
                type="number"
                min="1"
                value={formData.positions}
                onChange={(e) => setFormData({ ...formData, positions: parseInt(e.target.value) || 1 })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="salary">Salary Package</Label>
              <Input
                id="salary"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                placeholder="e.g. ₹6-12 LPA"
              />
            </div>
            
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="eligibility_criteria">Eligibility Criteria *</Label>
            <Textarea
              id="eligibility_criteria"
              value={formData.eligibility_criteria}
              onChange={(e) => setFormData({ ...formData, eligibility_criteria: e.target.value })}
              placeholder="e.g. B.Tech/BE in CS/IT/ECE, Minimum 60% marks, No active backlogs"
              rows={3}
              required
            />
          </div>

          <div>
            <Label>Job Roles</Label>
            <div className="space-y-2">
              {roles.map((role, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={role}
                    onChange={(e) => updateRole(index, e.target.value)}
                    placeholder="Enter a job role..."
                  />
                  {roles.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeRole(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addRole}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Role
              </Button>
            </div>
          </div>

          <div>
            <Label>Requirements</Label>
            <div className="space-y-2">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={requirement}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    placeholder="Enter a requirement..."
                  />
                  {requirements.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeRequirement(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addRequirement}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Requirement
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Posting...' : 'Post Campus Drive'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostCampusDriveModal;
