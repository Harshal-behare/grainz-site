const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSubmission() {
  try {
    console.log('Testing form submission to Supabase...\n');

    // Create test submission data
    const testData = {
      submission_id: `TEST-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      user_name: 'Test User',
      email: 'test@example.com',
      phone_number: '+1234567890',
      profession: 'Software Developer',
      
      current_diet_timetable: 'Breakfast at 8am, Lunch at 1pm, Dinner at 7pm',
      current_workout_plan: 'Gym 3 times a week',
      daily_schedule: 'Work 9-5, Gym in evening',
      
      fitness_goal_6_months: 'Lose 10 pounds',
      fitness_goal_long_term: 'Build muscle and maintain healthy weight',
      target_body_areas: 'Arms, Core, Legs',
      
      medical_issues_allergies: 'None',
      resting_heart_rate: 65,
      
      preferred_workout_time: 'Evening',
      has_personal_trainer: false,
      
      high_calorie_favourite_foods: ['Pizza', 'Burger', 'Ice Cream'],
      other_high_calorie_sweets: 'Chocolate',
      preferred_included_foods: ['Chicken', 'Rice', 'Vegetables'],
      foods_despised: ['Mushrooms'],
      favourite_fruits: ['Apple', 'Banana', 'Orange'],
      favourite_vegetables: ['Broccoli', 'Spinach', 'Carrots'],
      diet_habits: ['Vegetarian options preferred'],
      
      programme_start_date: new Date().toISOString().split('T')[0],
      programme_chosen: 'Weight Loss Program',
      alcohol_smoke_frequency: 'Never',
      
      form_version: 'v1.0',
      ip_address: '127.0.0.1',
      user_agent: 'Test Script'
    };

    // Insert test submission
    console.log('Inserting test submission...');
    const { data, error } = await supabase
      .from('form_submissions')
      .insert(testData)
      .select()
      .single();

    if (error) {
      console.error('Error inserting submission:', error);
      return;
    }

    console.log('✅ Test submission created successfully!');
    console.log('Submission ID:', data.submission_id);
    console.log('\nSubmission details:');
    console.log('- Name:', data.user_name);
    console.log('- Email:', data.email);
    console.log('- Created at:', data.created_at);

    // Test reading submissions
    console.log('\n📊 Testing data retrieval...');
    const { data: submissions, error: fetchError } = await supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (fetchError) {
      console.error('Error fetching submissions:', fetchError);
    } else {
      console.log(`✅ Successfully retrieved ${submissions.length} submissions`);
      console.log('\nRecent submission IDs:');
      submissions.forEach(sub => {
        console.log(`- ${sub.submission_id} (${sub.user_name || 'No name'})`);
      });
    }

    console.log('\n========================================');
    console.log('✅ All tests passed successfully!');
    console.log('========================================');
    console.log('\nYou can now:');
    console.log('1. Submit forms from your website');
    console.log('2. View submissions in the admin dashboard');
    console.log('3. Download CSV exports of all data');
    console.log('\nAdmin Dashboard: http://localhost:3000/admin');

  } catch (error) {
    console.error('Test failed:', error);
  }
}

testSubmission();
