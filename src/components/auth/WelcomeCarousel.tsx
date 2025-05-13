
import React from 'react';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

const welcomeImages = [
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    alt: "Team collaboration",
    title: "Find Your Dream Career",
    description: "Connect with top companies and discover opportunities that match your skills and aspirations.",
  },
  {
    src: "https://images.unsplash.com/photo-1577415124269-fc1140a69e91",
    alt: "Job interview",
    title: "Seamless Application Process",
    description: "Apply to multiple positions with just a few clicks and track your application status in real-time.",
  },
  {
    src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
    alt: "Professional handshake",
    title: "Build Professional Connections",
    description: "Network with industry professionals and expand your career opportunities.",
  }
];

const WelcomeCarousel: React.FC = () => {
  return (
    <div className="hidden md:block w-full">
      <Carousel className="w-full" autoPlay loop interval={5000}>
        <CarouselContent>
          {welcomeImages.map((item, index) => (
            <CarouselItem key={index}>
              <Card className="border-none shadow-none">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-lg aspect-video">
                    <img 
                      src={`${item.src}?auto=format&fit=crop&w=800&q=80`}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-white/80">{item.description}</p>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <CarouselPrevious className="h-8 w-8 rounded-full" />
          <CarouselNext className="h-8 w-8 rounded-full" />
        </div>
      </Carousel>
    </div>
  );
};

export default WelcomeCarousel;
