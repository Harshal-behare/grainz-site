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

async function createAdminUser() {
  try {
    // Create admin user with the email from environment
    const adminEmail = process.env.ADMIN_EMAIL || 'maitriramaiya03@gmail.com';
    const adminPassword = 'Admin@123456'; // You should change this!

    console.log(`Creating admin user with email: ${adminEmail}`);

    // Create user in auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true
    });

    if (authError) {
      if (authError.code === 'email_exists' || authError.message.includes('already been registered')) {
        console.log('Admin user already exists in auth');
        
        // Get existing user
        const { data: users } = await supabase.auth.admin.listUsers();
        const existingUser = users.users.find(u => u.email === adminEmail);
        
        if (existingUser) {
          // Update user password
          const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(
            existingUser.id,
            { password: adminPassword }
          );
          
          if (updateError) {
            console.error('Error updating password:', updateError);
          } else {
            console.log('Password updated successfully');
          }
          
          // Check if admin profile exists
          const { data: profileData, error: profileError } = await supabase
            .from('admin_profiles')
            .select('*')
            .eq('id', existingUser.id)
            .single();

          if (profileError && profileError.code === 'PGRST116') {
            // Profile doesn't exist, create it
            const { error: insertError } = await supabase
              .from('admin_profiles')
              .insert({
                id: existingUser.id,
                email: adminEmail,
                role: 'admin'
              });

            if (insertError) {
              console.error('Error creating admin profile:', insertError);
            } else {
              console.log('Admin profile created successfully');
            }
          } else {
            console.log('Admin profile already exists');
          }
        }
      } else {
        throw authError;
      }
    } else {
      console.log('Admin user created successfully');
      
      // Create admin profile
      const { error: profileError } = await supabase
        .from('admin_profiles')
        .insert({
          id: authData.user.id,
          email: adminEmail,
          role: 'admin'
        });

      if (profileError) {
        console.error('Error creating admin profile:', profileError);
      } else {
        console.log('Admin profile created successfully');
      }
    }

    console.log('\n========================================');
    console.log('Admin Account Credentials:');
    console.log('========================================');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log('========================================');
    console.log('\nPlease change the password after first login!');
    console.log('You can now login at: http://localhost:3000/admin');

  } catch (error) {
    console.error('Error:', error);
  }
}

createAdminUser();
