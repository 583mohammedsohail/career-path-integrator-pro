-- Fix UUID issues by updating the tables to use proper UUIDs
-- Add constraints to ensure data integrity

-- Update jobs table to use proper UUID format for company_id
UPDATE jobs SET company_id = gen_random_uuid() WHERE company_id ~ '^[a-zA-Z-]+$';

-- Update campus_drives table to use proper UUID format for company_id  
UPDATE campus_drives SET company_id = gen_random_uuid() WHERE company_id ~ '^[a-zA-Z-]+$';

-- Create a function to generate test data with proper UUIDs
CREATE OR REPLACE FUNCTION create_test_data()
RETURNS void AS $$
DECLARE
  test_company_id UUID;
  test_student_id UUID;
  test_job_id UUID;
BEGIN
  -- Create a test company with proper UUID
  INSERT INTO companies (id, company_name, description, website, location, industry)
  VALUES (
    gen_random_uuid(),
    'Tech Solutions Inc',
    'Leading technology solutions provider',
    'https://techsolutions.com',
    'Bangalore, India',
    'Technology'
  )
  ON CONFLICT (id) DO NOTHING
  RETURNING id INTO test_company_id;
  
  -- If company already exists, get its ID
  IF test_company_id IS NULL THEN
    SELECT id INTO test_company_id FROM companies WHERE company_name = 'Tech Solutions Inc' LIMIT 1;
  END IF;
  
  -- Create test job with proper company_id
  IF test_company_id IS NOT NULL THEN
    INSERT INTO jobs (id, company_id, title, description, requirements, location, salary, status, positions, deadline)
    VALUES (
      gen_random_uuid(),
      test_company_id,
      'Software Engineer',
      'Join our dynamic team as a Software Engineer',
      ARRAY['Python', 'React', 'JavaScript'],
      'Bangalore',
      '8-12 LPA',
      'open',
      5,
      NOW() + INTERVAL '30 days'
    )
    ON CONFLICT (id) DO NOTHING
    RETURNING id INTO test_job_id;
    
    -- Create test campus drive
    INSERT INTO campus_drives (id, company_id, title, description, location, date, positions, status, eligibility_criteria, salary)
    VALUES (
      gen_random_uuid(),
      test_company_id,
      'Tech Solutions Campus Drive 2024',
      'Exciting opportunity for fresh graduates',
      'Bangalore',
      NOW() + INTERVAL '15 days',
      10,
      'upcoming',
      'B.Tech/B.E. with 65% and above',
      '6-10 LPA'
    )
    ON CONFLICT (id) DO NOTHING;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Execute the function to create test data
SELECT create_test_data();