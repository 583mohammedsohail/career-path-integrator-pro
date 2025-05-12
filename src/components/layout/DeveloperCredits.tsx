
import React from 'react';
import { ExternalLink } from 'lucide-react';

const DeveloperCredits: React.FC = () => {
  return (
    <div className="text-center py-6 text-muted-foreground">
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
      
      <div className="mt-4">
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
    </div>
  );
};

export default DeveloperCredits;
