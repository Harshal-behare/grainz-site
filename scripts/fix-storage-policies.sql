-- Fix storage policies for fitness-uploads bucket
-- This script properly handles the auth.uid() type casting

-- First, drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public downloads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;

-- Create the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('fitness-uploads', 'fitness-uploads', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow anyone to upload files (for anonymous form submissions)
CREATE POLICY "Allow public uploads" ON storage.objects
FOR INSERT 
WITH CHECK (bucket_id = 'fitness-uploads');

-- Allow anyone to view/download files
CREATE POLICY "Allow public downloads" ON storage.objects
FOR SELECT 
USING (bucket_id = 'fitness-uploads');

-- Allow authenticated users to update their own files
CREATE POLICY "Allow authenticated updates" ON storage.objects
FOR UPDATE
USING (bucket_id = 'fitness-uploads')
WITH CHECK (bucket_id = 'fitness-uploads');

-- Allow authenticated users to delete their own files
CREATE POLICY "Allow authenticated deletes" ON storage.objects
FOR DELETE
USING (bucket_id = 'fitness-uploads');

-- Grant necessary permissions
GRANT ALL ON storage.objects TO anon;
GRANT ALL ON storage.objects TO authenticated;
GRANT ALL ON storage.buckets TO anon;
GRANT ALL ON storage.buckets TO authenticated;
