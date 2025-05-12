
import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeveloperCredits: React.FC = () => {
  const [showProjectInfo, setShowProjectInfo] = useState(false);

  return (
    <div className="text-center py-8 text-muted-foreground">
      <div className="flex flex-col items-center mb-6">
        <img 
          src="/cothon-logo.png" 
          alt="CoThon Solutions Logo" 
          className="h-16 mb-4"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/200x80?text=CoThon+Solutions";
            e.currentTarget.onerror = null;
          }}
        />
        <Button 
          variant="link" 
          className="text-primary hover:underline" 
          onClick={() => setShowProjectInfo(true)}
        >
          View Project Acknowledgment
        </Button>
      </div>
      
      <p className="text-lg font-medium mb-2">Developed by</p>
      <div className="flex items-center justify-center gap-6 mt-1">
        <a 
          href="https://www.linkedin.com/in/sana-parveen-93b29b294/" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-primary hover:underline text-lg"
        >
          Sana Parveen
          <ExternalLink size={16} />
        </a>
        <span className="text-lg">&</span>
        <a 
          href="https://www.linkedin.com/in/mohammed-sohail-82176825b/" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-primary hover:underline text-lg"
        >
          Mohammed Sohail
          <ExternalLink size={16} />
        </a>
      </div>
      
      <div className="mt-6">
        <p className="text-md">
          Powered by 
          <a 
            href="https://www.cothonsolutions.com/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline mx-1"
          >
            Cothon Solutions
          </a>
        </p>
      </div>
      
      <div className="mt-4 text-sm">
        © 2025 PlacementPro. All rights reserved.
      </div>

      <Dialog open={showProjectInfo} onOpenChange={setShowProjectInfo}>
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
    </div>
  );
};

export default DeveloperCredits;
