
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send } from 'lucide-react';

// Mock AI responses for the career assistant
const mockResponses: Record<string, string[]> = {
  "resume": [
    "To improve your resume, focus on quantifiable achievements rather than just listing responsibilities. Use action verbs and include metrics where possible.",
    "Consider organizing your resume with a clear hierarchy: contact info at the top, followed by a compelling summary, skills section, work experience, education, and optional sections like certifications.",
    "Tailor your resume for each job application by analyzing the job description and highlighting relevant skills and experiences that match the requirements."
  ],
  "interview": [
    "Prepare for interviews by researching the company thoroughly and practicing responses to common questions in your field.",
    "Use the STAR method (Situation, Task, Action, Result) to structure your answers to behavioral questions, providing concrete examples from your past experiences.",
    "Come prepared with thoughtful questions to ask the interviewer about the role, team culture, and growth opportunities."
  ],
  "skills": [
    "Consider developing both technical skills specific to your field and transferable skills like communication, problem-solving, and teamwork.",
    "Look into online platforms like Coursera, Udemy, and LinkedIn Learning for courses that can help you develop in-demand skills.",
    "Participate in projects, hackathons, or volunteer work to apply your skills in real-world scenarios and build your portfolio."
  ],
  "career": [
    "When planning your career path, consider both short-term goals (1-2 years) and long-term aspirations (5+ years).",
    "Network actively in your industry by attending conferences, joining professional associations, and connecting with professionals on LinkedIn.",
    "Consider finding a mentor who can provide guidance and insights based on their experience in your desired field."
  ]
};

// Default assistant message to display when the component loads
const defaultAssistantMessage = "Hello! I'm your AI Career Assistant. I can help you with resume tips, interview preparation, skill development, and career planning. What would you like guidance on today?";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const CareerAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: defaultAssistantMessage,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Function to generate a response based on user input
  const generateResponse = (userInput: string): string => {
    // Convert input to lowercase for easier matching
    const input = userInput.toLowerCase();
    
    // Check if input contains keywords and return a relevant response
    if (input.includes('resume') || input.includes('cv')) {
      const responses = mockResponses.resume;
      return responses[Math.floor(Math.random() * responses.length)];
    } else if (input.includes('interview') || input.includes('question')) {
      const responses = mockResponses.interview;
      return responses[Math.floor(Math.random() * responses.length)];
    } else if (input.includes('skill') || input.includes('learn') || input.includes('course')) {
      const responses = mockResponses.skills;
      return responses[Math.floor(Math.random() * responses.length)];
    } else if (input.includes('career') || input.includes('job') || input.includes('path')) {
      const responses = mockResponses.career;
      return responses[Math.floor(Math.random() * responses.length)];
    } else {
      // Default response if no keywords match
      return "I'm not sure I understand your question. Could you provide more details or ask about resume tips, interview preparation, skill development, or career planning?";
    }
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message to the chat
    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response with a delay for realism
    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content: generateResponse(userMessage.content),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Card className="flex flex-col h-[500px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="AI" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <span>Career Assistant</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] px-4 py-2 rounded-lg bg-muted">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Textarea 
            placeholder="Ask me about resume tips, interview prep, skills, or career paths..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 resize-none"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button type="submit" size="icon" disabled={!inputValue.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default CareerAssistant;
