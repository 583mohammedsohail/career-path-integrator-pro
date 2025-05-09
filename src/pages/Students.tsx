
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import StudentCard from '../components/students/StudentCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockStudents } from '../data/mockData';
import { Search, Filter } from 'lucide-react';

const Students = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  // Get unique departments for filter
  const departments = ['all', ...new Set(mockStudents.map(student => student.department))];

  // Filter students based on search query and department
  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDepartment = departmentFilter === 'all' || student.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Students</h1>
            <p className="text-gray-600 mt-1">Browse student profiles and talents</p>
          </div>
          <div className="w-full md:w-auto mt-4 md:mt-0">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search students..."
                  className="pl-8 w-full md:w-80"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[220px]">
                  <span className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Filter by department" />
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept === 'all' ? 'All Departments' : dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              No students matching your criteria.
            </p>
            <Button className="mt-4" onClick={() => {
              setSearchQuery('');
              setDepartmentFilter('all');
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Students;
