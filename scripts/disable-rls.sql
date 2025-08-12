-- Disable Row Level Security on all tables
-- This is temporary to get the application working
-- IMPORTANT: Re-enable RLS in production for security!

-- Disable RLS on all tables
ALTER TABLE form_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE body_measurements DISABLE ROW LEVEL SECURITY;
ALTER TABLE full_body_images DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles DISABLE ROW LEVEL SECURITY;

-- Also disable RLS on storage.objects if needed
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Grant full access to anon and authenticated roles
GRANT ALL ON form_submissions TO anon;
GRANT ALL ON form_submissions TO authenticated;
GRANT ALL ON body_measurements TO anon;
GRANT ALL ON body_measurements TO authenticated;
GRANT ALL ON full_body_images TO anon;
GRANT ALL ON full_body_images TO authenticated;
GRANT ALL ON admin_profiles TO authenticated;

-- Grant access to sequences (for auto-incrementing IDs)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Grant access to the view
GRANT SELECT ON form_export_view TO anon;
GRANT SELECT ON form_export_view TO authenticated;

-- Message
SELECT 'RLS has been disabled on all tables. Remember to re-enable it in production!' as message;
