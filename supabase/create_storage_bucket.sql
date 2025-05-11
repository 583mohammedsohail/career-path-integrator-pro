
-- Create storage bucket for avatars if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars', 
  'avatars', 
  true, 
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- Set up policy to allow authenticated users to upload files
CREATE POLICY "Avatar uploads require authentication" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (
    bucket_id = 'avatars' AND 
    (storage.foldername(name))[1] = 'profiles'
  );

-- Set up policy to allow authenticated users to update their own avatar
CREATE POLICY "Users can update their own avatars" ON storage.objects
  FOR UPDATE TO authenticated USING (
    bucket_id = 'avatars' AND 
    auth.uid()::text = (storage.foldername(name))[2]
  );

-- Set up policy to allow public to view avatars
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');
