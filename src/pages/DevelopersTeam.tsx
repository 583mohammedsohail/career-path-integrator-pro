import React from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Linkedin } from 'lucide-react';

const teamMembers = [
  {
    name: "Sana Parveen",
    role: "Frontend Developer",
    linkedin: "https://www.linkedin.com/in/sana-parveen-93b29b294/",
    github: "https://github.com/SanaParveen",
    image: "https://avatars.githubusercontent.com/u/72487474?v=4",
  },
  {
    name: "Mohammed Sohail",
    role: "Backend Developer",
    linkedin: "https://www.linkedin.com/in/mohammed-sohail-82176825b/",
    github: "https://github.com/MohammedSohail583",
    image: "https://i.imgur.com/OKGX6EQ.jpeg",
  },
];

const DevelopersTeam: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Our Development Team</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex space-x-2">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href={member.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default DevelopersTeam;
