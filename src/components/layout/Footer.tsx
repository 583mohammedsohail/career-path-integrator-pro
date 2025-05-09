
import React from 'react';
import { Link } from 'react-router-dom';

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
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/resources" className="text-gray-600 hover:text-primary transition-colors">
                  Resume Templates
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-600 hover:text-primary transition-colors">
                  Interview Tips
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-600 hover:text-primary transition-colors">
                  Career Guidance
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-600 hover:text-primary transition-colors">
                  Skill Development
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600">
                Email: support@placementpro.edu
              </li>
              <li className="text-gray-600">
                Phone: +1 (123) 456-7890
              </li>
              <li className="text-gray-600">
                Address: 123 Campus Drive, University City
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} PlacementPro. All rights reserved.
          </p>
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
