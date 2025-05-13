
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
  {
    name: "Mohammed Awais",
    role: "Tester & Planner",
    linkedin: "https://www.linkedin.com/in/mohammed-awais/",
    github: "https://github.com/MohammedAwais",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop",
  },
  {
    name: "Syed Nehal Ali",
    role: "Mentor & Senior Developer, HR",
    linkedin: "https://www.linkedin.com/in/syed-nehal-ali/",
    github: "https://github.com/SyedNehalAli",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2149&auto=format&fit=crop",
  },
];

const DevelopersTeam: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Development Team</h1>
          <p className="text-lg text-muted-foreground">
            Meet the talented individuals behind the CareerPath Pro platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-primary/20">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-3">
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                        <span>LinkedIn</span>
                      </a>
                      <a 
                        href={member.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                      >
                        <Github className="h-5 w-5" />
                        <span>GitHub</span>
                      </a>
                    </div>
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
