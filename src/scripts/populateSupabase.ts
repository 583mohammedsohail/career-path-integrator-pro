import { supabase } from '../integrations/supabase/client';
import { 
  mockStudents, 
  mockCompanies, 
  mockJobs, 
  mockAdmins, 
  mockManagement, 
  mockSuperAdmin 
} from '../data/mockData';

// Function to populate Supabase with all mock data
export const populateSupabaseWithMockData = async () => {
  console.log('🚀 Starting Supabase population with mock data...');

  try {
    // 1. Populate Companies
    console.log('📊 Populating companies...');
    const { data: companiesData, error: companiesError } = await supabase
      .from('companies')
      .upsert(
        mockCompanies.map(company => ({
          id: company.id,
          company_name: company.company_name,
          email: company.email,
          logo_url: company.logo_url,
          description: company.description,
          website: company.website,
          location: company.location,
          industry: company.industry,
          open_positions: company.open_positions || 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })),
        { onConflict: 'id' }
      );

    if (companiesError) {
      console.error('❌ Error populating companies:', companiesError);
    } else {
      console.log('✅ Companies populated successfully:', companiesData?.length || mockCompanies.length);
    }

    // 2. Populate Students
    console.log('👨‍🎓 Populating students...');
    const { data: studentsData, error: studentsError } = await supabase
      .from('students')
      .upsert(
        mockStudents.map(student => ({
          id: student.id,
          name: student.name,
          email: student.email,
          roll_number: student.roll_number || `ROLL${student.id}`,
          university: student.university || 'University',
          degree: student.degree || 'B.Tech',
          graduation_year: student.graduation_year || '2024',
          skills: student.skills || [],
          location: student.location || 'India',
          profile_pic: student.profile_pic || student.avatar || null,
          cgpa: student.cgpa || '8.0',
          department: student.department || 'Computer Science',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })),
        { onConflict: 'id' }
      );

    if (studentsError) {
      console.error('❌ Error populating students:', studentsError);
    } else {
      console.log('✅ Students populated successfully:', studentsData?.length || mockStudents.length);
    }

    // 3. Populate Jobs
    console.log('💼 Populating jobs...');
    const { data: jobsData, error: jobsError } = await supabase
      .from('jobs')
      .upsert(
        mockJobs.map(job => ({
          id: job.id,
          title: job.title,
          company_id: job.company_id,
          description: job.description,
          requirements: job.requirements || [],
          location: job.location,
          salary: job.salary,
          positions: job.positions || 1,
          deadline: job.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          status: job.status || 'active',
          created_at: job.created_at || new Date().toISOString(),
          updated_at: new Date().toISOString()
        })),
        { onConflict: 'id' }
      );

    if (jobsError) {
      console.error('❌ Error populating jobs:', jobsError);
    } else {
      console.log('✅ Jobs populated successfully:', jobsData?.length || mockJobs.length);
    }

    // 4. Populate Profiles (for authentication)
    console.log('👤 Populating user profiles...');
    const allUsers = [
      ...mockStudents.map(s => ({ ...s, role: 'student' })),
      ...mockCompanies.map(c => ({ ...c, role: 'company', name: c.company_name })),
      ...mockAdmins.map(a => ({ ...a, role: 'admin' })),
      ...mockManagement.map(m => ({ ...m, role: 'management' })),
      { ...mockSuperAdmin, role: 'superadmin' }
    ];

    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .upsert(
        allUsers.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar_url: user.avatar_url || user.profile_pic || user.logo_url || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })),
        { onConflict: 'id' }
      );

    if (profilesError) {
      console.error('❌ Error populating profiles:', profilesError);
    } else {
      console.log('✅ Profiles populated successfully:', profilesData?.length || allUsers.length);
    }

    // 5. Create some sample job applications
    console.log('📝 Creating sample job applications...');
    const sampleApplications = [
      {
        id: 'app-1',
        student_id: mockStudents[0].id,
        job_id: mockJobs[0].id,
        status: 'pending',
        applied_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        resume_url: 'https://example.com/resume1.pdf'
      },
      {
        id: 'app-2',
        student_id: mockStudents[0].id,
        job_id: mockJobs[1].id,
        status: 'interviewed',
        applied_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        resume_url: 'https://example.com/resume2.pdf'
      },
      {
        id: 'app-3',
        student_id: mockStudents[1].id,
        job_id: mockJobs[0].id,
        status: 'approved',
        applied_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        resume_url: 'https://example.com/resume3.pdf'
      }
    ];

    const { data: applicationsData, error: applicationsError } = await supabase
      .from('job_applications')
      .upsert(sampleApplications, { onConflict: 'id' });

    if (applicationsError) {
      console.error('❌ Error creating sample applications:', applicationsError);
    } else {
      console.log('✅ Sample applications created successfully:', applicationsData?.length || sampleApplications.length);
    }

    // 6. Create sample attendance records
    console.log('📅 Creating sample attendance records...');
    const sampleAttendance = [
      {
        id: 'att-1',
        student_id: mockStudents[0].id,
        date: new Date().toISOString().split('T')[0],
        time: '09:30:00',
        status: 'present',
        location: 'Campus'
      },
      {
        id: 'att-2',
        student_id: mockStudents[1].id,
        date: new Date().toISOString().split('T')[0],
        time: '09:15:00',
        status: 'present',
        location: 'Campus'
      }
    ];

    const { data: attendanceData, error: attendanceError } = await supabase
      .from('attendance')
      .upsert(sampleAttendance, { onConflict: 'id' });

    if (attendanceError) {
      console.error('❌ Error creating sample attendance:', attendanceError);
    } else {
      console.log('✅ Sample attendance created successfully:', attendanceData?.length || sampleAttendance.length);
    }

    console.log('🎉 Supabase population completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - Companies: ${mockCompanies.length}`);
    console.log(`   - Students: ${mockStudents.length}`);
    console.log(`   - Jobs: ${mockJobs.length}`);
    console.log(`   - Profiles: ${allUsers.length}`);
    console.log(`   - Sample Applications: ${sampleApplications.length}`);
    console.log(`   - Sample Attendance: ${sampleAttendance.length}`);

    return {
      success: true,
      message: 'All mock data populated successfully!',
      counts: {
        companies: mockCompanies.length,
        students: mockStudents.length,
        jobs: mockJobs.length,
        profiles: allUsers.length,
        applications: sampleApplications.length,
        attendance: sampleAttendance.length
      }
    };

  } catch (error) {
    console.error('💥 Fatal error during Supabase population:', error);
    return {
      success: false,
      message: 'Failed to populate Supabase with mock data',
      error: error
    };
  }
};

// Function to clear all data (useful for testing)
export const clearSupabaseData = async () => {
  console.log('🧹 Clearing Supabase data...');
  
  try {
    // Clear in reverse order to avoid foreign key constraints
    await supabase.from('job_applications').delete().neq('id', '');
    await supabase.from('attendance').delete().neq('id', '');
    await supabase.from('jobs').delete().neq('id', '');
    await supabase.from('students').delete().neq('id', '');
    await supabase.from('companies').delete().neq('id', '');
    await supabase.from('profiles').delete().neq('id', '');
    
    console.log('✅ Supabase data cleared successfully!');
    return { success: true, message: 'All data cleared successfully!' };
  } catch (error) {
    console.error('❌ Error clearing Supabase data:', error);
    return { success: false, message: 'Failed to clear data', error };
  }
};

// Export for use in components
export default populateSupabaseWithMockData;
