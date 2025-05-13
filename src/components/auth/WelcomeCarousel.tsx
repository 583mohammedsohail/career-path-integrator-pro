
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const WelcomeCarousel = () => {
  const slides = [
    {
      title: "Welcome to CareerPath Pro",
      content: "Your gateway to connecting college students with industry opportunities",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop"
    },
    {
      title: "Discover Opportunities",
      content: "Browse jobs from top companies looking for fresh talent",
      image: "https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?q=80&w=2041&auto=format&fit=crop"
    },
    {
      title: "Build Your Future",
      content: "Create your profile, showcase your skills, and start your career journey",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <div className="w-full max-w-xl mx-auto rounded-xl overflow-hidden shadow-lg bg-white">
      <Carousel className="w-full relative" opts={{ loop: true }}>
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="flex flex-col h-full">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
                  <p className="text-gray-600 flex-grow">{slide.content}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-2">
          <CarouselPrevious className="relative -left-0 translate-y-0" />
          <CarouselNext className="relative -right-0 translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
};

export default WelcomeCarousel;
