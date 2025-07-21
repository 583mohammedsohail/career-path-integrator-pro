import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Users } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-white font-bold">CP</span>
              </div>
              <span className="font-bold text-xl text-primary">PlacementPro</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Connecting students with the best career opportunities
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-600 hover:text-primary transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-gray-600 hover:text-primary transition-colors">
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/students" className="text-gray-600 hover:text-primary transition-colors">
                  Students
                </Link>
              </li>
              <li>
                <Link to="/developers-team" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  Developers Team
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://resume.io/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition-colors flex items-center"
                >
                  Resume Templates
                  <ExternalLink size={12} className="ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="https://youtu.be/0siE31sqz0Q?si=k0oxgiNdkGL7-fxu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition-colors flex items-center"
                >
                  Interview Tips
                  <ExternalLink size={12} className="ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="https://youtu.be/O3m14PVOq_g?si=pFiKSKlRAXe6fKBX" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition-colors flex items-center"
                >
                  Career Guidance
                  <ExternalLink size={12} className="ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="https://youtu.be/NTxBP4bFrBA?si=1LmEQXZzEm-XzTkV" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition-colors flex items-center"
                >
                  Skill Development
                  <ExternalLink size={12} className="ml-1" />
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600">
                Email: <a href="mailto:583mohammedsohail@gmail.com" className="hover:text-primary">583mohammedsohail@gmail.com</a>
              </li>
              <li className="text-gray-600">
                Email: <a href="mailto:sanapa230603@gmail.com" className="hover:text-primary">sanapa230603@gmail.com</a>
              </li>
              <li className="text-gray-600">
                Phone: +91 6300535921, +91 7471157668‬
              </li>
              <li className="text-gray-600">
                Address: Hyderabad & Chhattisgarh
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} PlacementPro. All rights reserved.
            </p>
            <span className="hidden md:block md:mx-2">•</span>
            <p className="text-sm text-gray-600">
              Developed by 
              <a 
                href="https://www.linkedin.com/in/sana-parveen-93b29b294/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline mx-1"
              >
                Sana Parveen
              </a>
              &
              <a 
                href="https://www.linkedin.com/in/mohammed-sohail-82176825b/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline ml-1"
              >
                Mohammed Sohail
              </a>
            </p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
