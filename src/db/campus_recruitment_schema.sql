-- Campus Recruitment Schema

-- Campus Drives Table
CREATE TABLE IF NOT EXISTS campus_drives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  company_id UUID NOT NULL REFERENCES profiles(id),
  location TEXT NOT NULL,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  eligibility_criteria TEXT,
  positions INTEGER DEFAULT 1,
  status TEXT CHECK (status IN ('upcoming', 'ongoing', 'completed')) DEFAULT 'upcoming',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on campus_drives
ALTER TABLE campus_drives ENABLE ROW LEVEL SECURITY;

-- Campus drives policies
CREATE POLICY "Campus drives are viewable by everyone"
  ON campus_drives FOR SELECT
  USING (true);

CREATE POLICY "Companies can insert their own campus drives"
  ON campus_drives FOR INSERT
  WITH CHECK (auth.uid() = company_id);

CREATE POLICY "Companies can update their own campus drives"
  ON campus_drives FOR UPDATE
  USING (auth.uid() = company_id);

CREATE POLICY "Companies can delete their own campus drives"
  ON campus_drives FOR DELETE
  USING (auth.uid() = company_id);

-- Campus Applications Table
CREATE TABLE IF NOT EXISTS campus_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  drive_id UUID NOT NULL REFERENCES campus_drives(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id),
  status TEXT CHECK (status IN ('pending', 'shortlisted', 'rejected', 'interview', 'selected')) DEFAULT 'pending',
  note TEXT,
  resume_url TEXT,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(drive_id, student_id)
);

-- Enable RLS on campus_applications
ALTER TABLE campus_applications ENABLE ROW LEVEL SECURITY;

-- Campus applications policies
CREATE POLICY "Students can view their own applications"
  ON campus_applications FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Companies can view applications for their drives"
  ON campus_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM campus_drives
      WHERE campus_drives.id = campus_applications.drive_id
      AND campus_drives.company_id = auth.uid()
    )
  );

CREATE POLICY "Students can insert their own applications"
  ON campus_applications FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Companies can update applications for their drives"
  ON campus_applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM campus_drives
      WHERE campus_drives.id = campus_applications.drive_id
      AND campus_drives.company_id = auth.uid()
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_campus_drives_updated_at
BEFORE UPDATE ON campus_drives
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campus_applications_updated_at
BEFORE UPDATE ON campus_applications
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_campus_drives_company_id ON campus_drives(company_id);
CREATE INDEX IF NOT EXISTS idx_campus_drives_status ON campus_drives(status);
CREATE INDEX IF NOT EXISTS idx_campus_applications_drive_id ON campus_applications(drive_id);
CREATE INDEX IF NOT EXISTS idx_campus_applications_student_id ON campus_applications(student_id);
CREATE INDEX IF NOT EXISTS idx_campus_applications_status ON campus_applications(status);
