import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { mockStudents } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Mail, Phone, MapPin, Download, Building2, Code, BookOpen } from 'lucide-react';

const StudentProfile = () => {
  const { id } = useParams();
  const student = mockStudents.find(s => s.id === id);

  if (!student) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Student Not Found</h1>
            <p className="mt-2 text-gray-600">The student profile you're looking for doesn't exist.</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Mock additional profile information
  const profileInfo = {
    phone: '+91 98765 43210',
    address: 'Mumbai, Maharashtra',
    about: `Final year ${student.department} student at Great Learning University with a strong academic record and passion for technology. Seeking opportunities to apply theoretical knowledge in practical scenarios and contribute to innovative projects.`,
    education: [
      {
        degree: 'B.Tech in ' + student.department,
        institution: 'Great Learning University',
        year: '2021-2025',
        score: student.cgpa
      },
      {
        degree: '12th Grade (CBSE)',
        institution: 'Delhi Public School',
        year: '2020-2021',
        score: 95.6
      }
    ],
    projects: [
      {
        title: 'Smart Home Automation System',
        description: 'Developed an IoT-based home automation system using Arduino and React Native mobile app.',
        technologies: ['IoT', 'Arduino', 'React Native', 'Firebase']
      },
      {
        title: 'E-Learning Platform',
        description: 'Created a web-based learning management system with video conferencing and quiz features.',
        technologies: ['React', 'Node.js', 'MongoDB', 'WebRTC']
      }
    ],
    certifications: [
      {
        name: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        year: '2024'
      },
      {
        name: 'Google Data Analytics Professional Certificate',
        issuer: 'Google',
        year: '2023'
      }
    ]
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback>{student.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{student.name}</h1>
                <p className="text-gray-600">{student.department} Student</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {student.email}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {profileInfo.phone}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {profileInfo.address}
                  </Badge>
                </div>
              </div>
              <Button className="flex items-center gap-2" asChild>
                <a href="https://drive.google.com/file/d/1_Bc6EqJ-wSSI1inTLRjADBrOAZJvqE_X/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="about" className="space-y-4">
          <TabsList>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{profileInfo.about}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education">
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profileInfo.education.map((edu, index) => (
                    <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">{edu.degree}</h3>
                      </div>
                      <div className="ml-7">
                        <p className="text-gray-600">{edu.institution}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span>{edu.year}</span>
                          <span>Score: {typeof edu.score === 'number' ? `${edu.score} CGPA` : `${edu.score}%`}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skills & Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Code className="w-5 h-5 text-primary" />
                      Technical Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {student.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      Certifications
                    </h3>
                    <div className="space-y-2">
                      {profileInfo.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{cert.name}</p>
                            <p className="text-sm text-gray-500">{cert.issuer}</p>
                          </div>
                          <Badge variant="outline">{cert.year}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {profileInfo.projects.map((project, index) => (
                    <div key={index} className="border-b last:border-0 pb-6 last:pb-0">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-primary" />
                        {project.title}
                      </h3>
                      <p className="mt-2 text-gray-600">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StudentProfile; 