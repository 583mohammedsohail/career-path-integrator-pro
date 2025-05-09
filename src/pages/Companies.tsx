
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import CompanyCard from '../components/companies/CompanyCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockCompanies } from '../data/mockData';
import { Search } from 'lucide-react';

const Companies = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter companies based on search query
  const filteredCompanies = mockCompanies.filter(company => 
    company.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Companies</h1>
            <p className="text-gray-600 mt-1">Explore companies offering placements</p>
          </div>
          <div className="w-full md:w-auto mt-4 md:mt-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search companies..."
                className="pl-8 w-full md:w-80"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              No companies matching your search.
            </p>
            <Button className="mt-4" onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Companies;
