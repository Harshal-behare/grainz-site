const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupDatabase() {
  try {
    console.log('Setting up database policies...\n');

    // Drop existing policies
    const dropPolicies = [
      'DROP POLICY IF EXISTS "Allow anonymous form submissions" ON form_submissions',
      'DROP POLICY IF EXISTS "Allow anonymous measurements" ON body_measurements',
      'DROP POLICY IF EXISTS "Allow anonymous images" ON full_body_images',
      'DROP POLICY IF EXISTS "Admin read submissions" ON form_submissions',
      'DROP POLICY IF EXISTS "Admin read measurements" ON body_measurements',
      'DROP POLICY IF EXISTS "Admin read images" ON full_body_images',
      'DROP POLICY IF EXISTS "Admin can read own profile" ON admin_profiles',
      'DROP POLICY IF EXISTS "Enable insert for anon" ON form_submissions',
      'DROP POLICY IF EXISTS "Enable insert for authenticated" ON form_submissions',
      'DROP POLICY IF EXISTS "Enable read for authenticated" ON form_submissions',
      'DROP POLICY IF EXISTS "Enable insert for anon" ON body_measurements',
      'DROP POLICY IF EXISTS "Enable insert for authenticated" ON body_measurements',
      'DROP POLICY IF EXISTS "Enable read for authenticated" ON body_measurements',
      'DROP POLICY IF EXISTS "Enable insert for anon" ON full_body_images',
      'DROP POLICY IF EXISTS "Enable insert for authenticated" ON full_body_images',
      'DROP POLICY IF EXISTS "Enable read for authenticated" ON full_body_images',
      'DROP POLICY IF EXISTS "Enable read for authenticated" ON admin_profiles'
    ];

    console.log('Dropping existing policies...');
    for (const sql of dropPolicies) {
      const { error } = await supabase.rpc('exec_sql', { sql_query: sql }).single();
      if (error && !error.message.includes('does not exist')) {
        console.error(`Error: ${sql}`, error);
      }
    }

    // Disable RLS to recreate policies
    console.log('Configuring Row Level Security...');
    await supabase.rpc('exec_sql', { 
      sql_query: 'ALTER TABLE form_submissions DISABLE ROW LEVEL SECURITY' 
    }).single().catch(() => {});
    
    await supabase.rpc('exec_sql', { 
      sql_query: 'ALTER TABLE body_measurements DISABLE ROW LEVEL SECURITY' 
    }).single().catch(() => {});
    
    await supabase.rpc('exec_sql', { 
      sql_query: 'ALTER TABLE full_body_images DISABLE ROW LEVEL SECURITY' 
    }).single().catch(() => {});

    // Re-enable RLS
    await supabase.rpc('exec_sql', { 
      sql_query: 'ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY' 
    }).single().catch(() => {});
    
    await supabase.rpc('exec_sql', { 
      sql_query: 'ALTER TABLE body_measurements ENABLE ROW LEVEL SECURITY' 
    }).single().catch(() => {});
    
    await supabase.rpc('exec_sql', { 
      sql_query: 'ALTER TABLE full_body_images ENABLE ROW LEVEL SECURITY' 
    }).single().catch(() => {});

    // Create new policies
    const createPolicies = [
      `CREATE POLICY "Enable insert for anon" ON form_submissions FOR INSERT TO anon WITH CHECK (true)`,
      `CREATE POLICY "Enable insert for authenticated" ON form_submissions FOR INSERT TO authenticated WITH CHECK (true)`,
      `CREATE POLICY "Enable read for authenticated" ON form_submissions FOR SELECT TO authenticated USING (true)`,
      `CREATE POLICY "Enable insert for anon" ON body_measurements FOR INSERT TO anon WITH CHECK (true)`,
      `CREATE POLICY "Enable insert for authenticated" ON body_measurements FOR INSERT TO authenticated WITH CHECK (true)`,
      `CREATE POLICY "Enable read for authenticated" ON body_measurements FOR SELECT TO authenticated USING (true)`,
      `CREATE POLICY "Enable insert for anon" ON full_body_images FOR INSERT TO anon WITH CHECK (true)`,
      `CREATE POLICY "Enable insert for authenticated" ON full_body_images FOR INSERT TO authenticated WITH CHECK (true)`,
      `CREATE POLICY "Enable read for authenticated" ON full_body_images FOR SELECT TO authenticated USING (true)`
    ];

    console.log('Creating new policies...');
    for (const sql of createPolicies) {
      const { error } = await supabase.rpc('exec_sql', { sql_query: sql }).single();
      if (error && !error.message.includes('already exists')) {
        console.error(`Error: ${sql}`, error);
      }
    }

    console.log('\n✅ Database policies configured successfully!');
    console.log('\nYou can now:');
    console.log('1. Submit forms anonymously from your website');
    console.log('2. View submissions in the admin dashboard (requires authentication)');
    console.log('3. Download CSV exports of all data');

  } catch (error) {
    console.error('Setup failed:', error);
    console.log('\n⚠️  Note: You may need to run these SQL commands directly in your Supabase SQL Editor:');
    console.log('\n1. Go to your Supabase dashboard');
    console.log('2. Navigate to SQL Editor');
    console.log('3. Run the contents of scripts/setup-database.sql');
  }
}

// Note: Supabase doesn't allow arbitrary SQL execution via the client SDK for security reasons
// So we'll provide instructions for manual setup
console.log('========================================');
console.log('DATABASE SETUP INSTRUCTIONS');
console.log('========================================\n');
console.log('Please follow these steps to configure your database:\n');
console.log('1. Go to your Supabase Dashboard: https://supabase.com/dashboard');
console.log('2. Select your project (pnvdzxfwwtykzsgsicbb)');
console.log('3. Navigate to the SQL Editor (left sidebar)');
console.log('4. Copy and paste the contents of scripts/setup-database.sql');
console.log('5. Click "Run" to execute the SQL commands\n');
console.log('This will:');
console.log('- Configure Row Level Security policies');
console.log('- Allow anonymous form submissions');
console.log('- Allow authenticated users to read data');
console.log('- Set up storage bucket for file uploads\n');
console.log('========================================');
