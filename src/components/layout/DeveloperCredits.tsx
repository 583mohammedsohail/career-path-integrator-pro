
import React from 'react';
import { ExternalLink } from 'lucide-react';

const DeveloperCredits: React.FC = () => {
  return (
    <div className="text-center py-4 text-sm text-muted-foreground">
      <p>Developed by</p>
      <div className="flex items-center justify-center gap-4 mt-1">
        <a 
          href="https://www.linkedin.com/in/sana-parveen-93b29b294/" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-primary hover:underline"
        >
          Sana Parveen
          <ExternalLink size={14} />
        </a>
        <span>&</span>
        <a 
          href="https://www.linkedin.com/in/mohammed-sohail-82176825b/" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-primary hover:underline"
        >
          Mohammed Sohail
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

export default DeveloperCredits;
