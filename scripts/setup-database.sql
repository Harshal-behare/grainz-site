-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous form submissions" ON form_submissions;
DROP POLICY IF EXISTS "Allow anonymous measurements" ON body_measurements;
DROP POLICY IF EXISTS "Allow anonymous images" ON full_body_images;
DROP POLICY IF EXISTS "Admin read submissions" ON form_submissions;
DROP POLICY IF EXISTS "Admin read measurements" ON body_measurements;
DROP POLICY IF EXISTS "Admin read images" ON full_body_images;
DROP POLICY IF EXISTS "Admin can read own profile" ON admin_profiles;

-- Disable RLS temporarily to set up policies
ALTER TABLE form_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE body_measurements DISABLE ROW LEVEL SECURITY;
ALTER TABLE full_body_images DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE body_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE full_body_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Create proper policies for anonymous access (for form submissions)
CREATE POLICY "Enable insert for anon" ON form_submissions
FOR INSERT 
TO anon
WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated" ON form_submissions
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable read for authenticated" ON form_submissions
FOR SELECT 
TO authenticated
USING (true);

-- Policies for body measurements
CREATE POLICY "Enable insert for anon" ON body_measurements
FOR INSERT 
TO anon
WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated" ON body_measurements
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable read for authenticated" ON body_measurements
FOR SELECT 
TO authenticated
USING (true);

-- Policies for images
CREATE POLICY "Enable insert for anon" ON full_body_images
FOR INSERT 
TO anon
WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated" ON full_body_images
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable read for authenticated" ON full_body_images
FOR SELECT 
TO authenticated
USING (true);

-- Admin profiles policies
CREATE POLICY "Enable read for authenticated" ON admin_profiles
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

-- Grant necessary permissions to anon role for the view
GRANT SELECT ON form_export_view TO anon;
GRANT SELECT ON form_export_view TO authenticated;

-- Also ensure the storage bucket exists and has proper policies
INSERT INTO storage.buckets (id, name, public) 
VALUES ('fitness-uploads', 'fitness-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
-- Drop existing storage policies if they exist
DROP POLICY IF EXISTS "Enable upload for anon" ON storage.objects;
DROP POLICY IF EXISTS "Enable read for all" ON storage.objects;

-- Create storage policies using Supabase's storage RLS
CREATE POLICY "Enable upload for anon" ON storage.objects
FOR INSERT TO anon
WITH CHECK (bucket_id = 'fitness-uploads');

CREATE POLICY "Enable read for all" ON storage.objects
FOR SELECT TO anon
USING (bucket_id = 'fitness-uploads');
