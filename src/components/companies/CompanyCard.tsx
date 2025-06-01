
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Company } from '@/types';
import { MapPin, Globe, Users, Briefcase } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={company?.avatar_url} alt={company?.company_name || 'Company'} />
            <AvatarFallback>
              {company?.company_name?.charAt(0) || 'C'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1">{company?.company_name || 'Unnamed Company'}</h3>
            {company?.industry && (
              <Badge variant="secondary" className="mb-2">
                {company.industry}
              </Badge>
            )}
            
            <div className="space-y-2 mb-4">
              {company?.location && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{company.location}</span>
                </div>
              )}
              {company?.website && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Globe className="h-4 w-4" />
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {company.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              {company?.size && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{company.size} employees</span>
                </div>
              )}
            </div>

            {company?.description && (
              <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                {company.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Briefcase className="h-4 w-4" />
                <span>0 open positions</span>
              </div>
              <Button size="sm" asChild>
                <Link to={`/companies/${company.id}`}>View Profile</Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
