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
          src="https://res.cloudinary.com/dbt3gghme/image/upload/c_fill,w_248,h_64,e_sharpen/v1747058048/Cothonsolutions_b3mpji.jpg"
          alt="CoThon Solutions Logo" 
          className="h-16 mb-4"
          onError={(e) => {
            e.currentTarget.src = "data:image/jpeg;base64,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";
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
            href="https://cothonsolutions.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline mx-1"
          >
            Cothon Solutions
          </a>
        </p>
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
