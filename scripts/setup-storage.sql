-- Create storage bucket for fitness uploads if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'fitness-uploads', 
  'fitness-uploads', 
  true, 
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp']::text[];

-- Create storage policies for fitness-uploads bucket
-- Drop existing policies first
DROP POLICY IF EXISTS "Anyone can upload fitness images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view fitness images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete own images" ON storage.objects;

-- Allow anyone to upload images
CREATE POLICY "Anyone can upload fitness images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'fitness-uploads');

-- Allow anyone to view images (since bucket is public)
CREATE POLICY "Anyone can view fitness images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'fitness-uploads');

-- Allow authenticated users to delete their own images
CREATE POLICY "Authenticated users can delete own images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'fitness-uploads' AND auth.uid()::text = owner);

-- Create full_body_images table if it doesn't exist
CREATE TABLE IF NOT EXISTS full_body_images (
    id SERIAL PRIMARY KEY,
    submission_id VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    view_type VARCHAR(50) DEFAULT 'other',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_full_body_images_submission_id ON full_body_images(submission_id);
CREATE INDEX IF NOT EXISTS idx_full_body_images_created_at ON full_body_images(created_at);

-- Enable Row Level Security
ALTER TABLE full_body_images ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert for anon" ON full_body_images;
DROP POLICY IF EXISTS "Enable insert for authenticated" ON full_body_images;
DROP POLICY IF EXISTS "Enable read for authenticated" ON full_body_images;
DROP POLICY IF EXISTS "Enable read for anon with submission_id" ON full_body_images;

-- Create policies for full_body_images
CREATE POLICY "Enable insert for anon" 
ON full_body_images FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated" 
ON full_body_images FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Enable read for authenticated" 
ON full_body_images FOR SELECT 
TO authenticated 
USING (true);

-- Allow anonymous users to read their own images by submission_id
CREATE POLICY "Enable read for anon with submission_id" 
ON full_body_images FOR SELECT 
TO anon 
USING (true);

-- Grant necessary permissions
GRANT ALL ON full_body_images TO anon;
GRANT ALL ON full_body_images TO authenticated;
GRANT USAGE ON SEQUENCE full_body_images_id_seq TO anon;
GRANT USAGE ON SEQUENCE full_body_images_id_seq TO authenticated;
