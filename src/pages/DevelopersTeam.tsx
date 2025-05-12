
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Linkedin, Mail, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  email?: string;
  github?: string;
}

const DevelopersTeam = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showAcknowledgment, setShowAcknowledgment] = useState(false);
  
  const teamMembers: TeamMember[] = [
    {
      name: "Mohammed Sohail",
      role: "Team Leader & Developer",
      image: "/team/mohammed-sohail.jpg",
      bio: "Lead developer responsible for the core architecture and functionality of the application.",
      linkedin: "https://www.linkedin.com/in/mohammed-sohail-82176825b/",
      github: "https://github.com/mohd-sohail",
      email: "msohail@cothonsolutions.com"
    },
    {
      name: "Sana Parveen",
      role: "Associate Support Role in Development",
      image: "/team/sana-parveen.jpg",
      bio: "Developer focused on frontend components and user experience of the application.",
      linkedin: "https://www.linkedin.com/in/sana-parveen-93b29b294/",
      github: "https://github.com/sana-parveen",
      email: "sparveen@cothonsolutions.com"
    },
    {
      name: "Mohammed Awais",
      role: "Tester & Planner",
      image: "/team/mohammed-awais.jpg",
      bio: "Responsible for quality assurance, testing, and planning project milestones.",
      email: "mawais@cothonsolutions.com"
    },
    {
      name: "Syed Nehal Ali",
      role: "Mentor & Senior Developer, HR",
      image: "/team/syed-nehal.jpg",
      bio: "Senior mentor providing guidance on development practices and HR processes.",
      linkedin: "https://www.linkedin.com/in/syed-nehal-ali/",
      email: "snehal@cothonsolutions.com"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Development Team</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the talented individuals behind this placement management system, working under the 
            guidance of <span className="text-primary font-medium">CoThon Solutions</span>.
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => setShowAcknowledgment(true)}
          >
            View Project Acknowledgment
          </Button>
        </div>

        <div className="flex justify-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="/cothon-banner.jpg"
              alt="CoThon Solutions"
              className="rounded-lg shadow-lg max-h-72 w-auto"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/800x300?text=CoThon+Solutions";
                e.currentTarget.onerror = null;
              }}
            />
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {teamMembers.map((member) => (
            <motion.div key={member.name} variants={item}>
              <Card className="overflow-hidden h-full transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/400x400?text=" + encodeURIComponent(member.name);
                        e.currentTarget.onerror = null;
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
                    
                    <div className="flex gap-2">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                          <Linkedin size={18} />
                        </a>
                      )}
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="text-red-500 hover:text-red-700">
                          <Mail size={18} />
                        </a>
                      )}
                      {member.github && (
                        <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black">
                          <Github size={18} />
                        </a>
                      )}
                    </div>
                    
                    <Button 
                      variant="link" 
                      className="p-0 mt-2 text-primary" 
                      onClick={() => setSelectedMember(member)}
                    >
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Member Detail Dialog */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        {selectedMember && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedMember.name}</DialogTitle>
              <DialogDescription className="text-base">{selectedMember.role}</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <img 
                  src={selectedMember.image} 
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/400x400?text=" + encodeURIComponent(selectedMember.name);
                    e.currentTarget.onerror = null;
                  }}
                />
              </div>
              <div className="flex-1">
                <p>{selectedMember.bio}</p>
                
                <div className="flex gap-4 mt-4">
                  {selectedMember.linkedin && (
                    <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800">
                      <Linkedin size={18} className="mr-1" /> LinkedIn
                    </a>
                  )}
                  {selectedMember.email && (
                    <a href={`mailto:${selectedMember.email}`} className="flex items-center text-red-500 hover:text-red-700">
                      <Mail size={18} className="mr-1" /> Email
                    </a>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Project Acknowledgment Dialog */}
      <Dialog open={showAcknowledgment} onOpenChange={setShowAcknowledgment}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl mb-4">Project Acknowledgment</DialogTitle>
            <DialogDescription className="text-base text-foreground">
              <p className="mb-4">
                This project is developed under the expert guidance and mentorship of CoThon Solutions, a dynamic company located at T-Hub, Hyderabad. CoThon Solutions is renowned for creating prototype projects for various Multinational Corporations (MNCs) and our partnered MNCs. You can learn more about our past projects and collaborations by visiting our website at <a href="https://www.cothonsolutions.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cothonsolutions.com</a>.
              </p>
              
              <p className="mb-4">The credit for the successful execution and development of this project goes to the following dedicated team members:</p>
              <ul className="list-disc pl-8 mb-4">
                <li className="mb-2">Mohammed Sohail – Team Leader & Developer</li>
                <li className="mb-2">Sana Parveen – Associate Support Role in Development</li>
                <li className="mb-2">Mohammed Awais – Tester & Planner</li>
              </ul>

              <p className="mb-4">We would also like to acknowledge the invaluable contribution of our Star Mentor:</p>
              <ul className="list-disc pl-8 mb-4">
                <li>Syed Nehal Ali – Mentor & Senior Developer, HR</li>
              </ul>

              <p className="mb-4">
                Our company, CoThon Solutions, specializes in training and nurturing interns, providing them with opportunities for hands-on learning, and offering Pre-Placement Offers (PPOs) under the mentorship of our experienced professionals. This initiative is carried out under the guidance and approval of AICTE, MSME, and Startup India.
              </p>

              <p>
                We extend our heartfelt thanks to all the team members and mentors for their hard work, dedication, and contributions in making this project a reality.
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default DevelopersTeam;
