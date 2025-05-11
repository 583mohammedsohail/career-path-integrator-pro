
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Company } from '@/types';
import { MapPin, Globe, Briefcase } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={company.avatar} alt={company.companyName} />
            <AvatarFallback>{company.companyName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{company.companyName}</h3>
            <p className="text-sm text-muted-foreground">{company.industry}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 mt-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{company.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>{company.website}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4" />
            <span>{company.postedJobs.length} job(s) posted</span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{company.description}</p>
          
          {company.postedJobs.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {company.postedJobs.slice(0, 3).map(job => (
                <Badge key={job.id} variant="secondary" className="font-normal">
                  {job.title}
                </Badge>
              ))}
              {company.postedJobs.length > 3 && (
                <Badge variant="secondary" className="font-normal">
                  +{company.postedJobs.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <Button asChild>
            <Link to={`/companies/${company.id}`}>View Profile</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
