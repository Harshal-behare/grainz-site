import { supabase } from './supabase-client';
import { FormSubmission, BodyMeasurements, FullBodyImage, CompleteFormData } from '@/types/database';
import { CompleteUserData } from '@/types/fitness';

// Generate unique submission ID
const generateSubmissionId = (): string => {
  const timestamp = Math.floor(Date.now() / 1000);
  const random = Math.floor(Math.random() * 1000);
  return `FIT-${timestamp}-${random}`;
};

// Convert form data to database format
const convertFormDataToSubmission = (formData: Partial<CompleteUserData>): FormSubmission => {
  return {
    submission_id: generateSubmissionId(),
    
    // Basic Information
    user_name: formData.profile?.user_name,
    email: formData.profile?.email,
    phone_number: formData.profile?.phone_number,
    profession: formData.profile?.profession,
    
    // Current Status
    current_diet_timetable: formData.diet?.current_diet_timetable,
    current_workout_plan: formData.workout?.current_workout_plan,
    daily_schedule: formData.workout?.daily_schedule,
    
    // Goals
    fitness_goal_6_months: formData.goals?.fitness_goal_6_months,
    fitness_goal_long_term: formData.goals?.fitness_goal_long_term,
    target_body_areas: formData.goals?.target_body_areas,
    
    // Health Information
    medical_issues_allergies: formData.health?.medical_issues_allergies,
    resting_heart_rate: formData.health?.resting_heart_rate,
    
    // Workout Preferences
    preferred_workout_time: formData.workout?.preferred_workout_time,
    has_personal_trainer: formData.workout?.has_personal_trainer || false,
    
    // Diet Preferences
    high_calorie_favourite_foods: formData.diet?.high_calorie_favourite_foods || [],
    other_high_calorie_sweets: formData.diet?.other_high_calorie_sweets,
    preferred_included_foods: formData.diet?.preferred_included_foods || [],
    foods_despised: formData.diet?.foods_despised || [],
    favourite_fruits: formData.diet?.favourite_fruits || [],
    favourite_vegetables: formData.diet?.favourite_vegetables || [],
    diet_habits: formData.diet?.diet_habits || [],
    
    // Program Information
    programme_start_date: formData.profile?.programme_start_date?.toISOString().split('T')[0],
    programme_chosen: formData.additional?.extra_challenge,
    alcohol_smoke_frequency: formData.health?.alcohol_smoke_frequency,
    
    // File Uploads
    blood_report_url: formData.files?.blood_report_url,
    body_composition_report_url: formData.files?.body_composition_report_url,
    aspiration_image_url: formData.files?.aspiration_image_url,
    
    // Metadata
    form_version: 'v1.0',
  };
};

// Convert measurements to database format
const convertMeasurements = (formData: Partial<CompleteUserData>, submissionId: string): BodyMeasurements | null => {
  if (!formData.measurements) return null;
  
  return {
    submission_id: submissionId,
    forearm_in: formData.measurements.forearm_in,
    bicep_in: formData.measurements.bicep_in,
    shoulder_in: formData.measurements.shoulder_in,
    chest_in: formData.measurements.chest_in,
    upper_waist_in: formData.measurements.upper_waist_in,
    lower_waist_in: formData.measurements.lower_waist_in,
    belly_button_circumference_in: formData.measurements.belly_button_circumference_in,
    buttocks_in: formData.measurements.buttocks_in,
    thighs_in: formData.measurements.thighs_in,
  };
};

// Submit complete form data
export const submitFormData = async (formData: Partial<CompleteUserData>): Promise<string> => {
  try {
    // Get client IP and user agent
    const clientInfo = {
      ip_address: await getClientIP(),
      user_agent: navigator.userAgent,
    };

    // Convert and prepare submission data
    const submission = convertFormDataToSubmission(formData);
    submission.ip_address = clientInfo.ip_address;
    submission.user_agent = clientInfo.user_agent;

    console.log('Submitting form data:', submission);

    // Submit main form data
    const { data: submissionData, error: submissionError } = await supabase
      .from('form_submissions')
      .insert(submission)
      .select()
      .single();

    if (submissionError) {
      console.error('Submission error:', submissionError);
      throw submissionError;
    }

    const submissionId = submission.submission_id;

    // Submit measurements if available
    const measurements = convertMeasurements(formData, submissionId);
    if (measurements) {
      const { error: measurementsError } = await supabase
        .from('body_measurements')
        .insert(measurements);

      if (measurementsError) {
        console.error('Measurements error:', measurementsError);
        // Continue even if measurements fail
      }
    }

    // Submit images if available
    if (formData.images && formData.images.length > 0) {
      const images = formData.images.map(image => ({
        submission_id: submissionId,
        file_url: image.file_url,
        view_type: image.view,
      }));

      const { error: imagesError } = await supabase
        .from('full_body_images')
        .insert(images);

      if (imagesError) {
        console.error('Images error:', imagesError);
        // Continue even if images fail
      }
    }

    return submissionId;
  } catch (error) {
    console.error('Form submission error:', error);
    throw error;
  }
};

// Get client IP address
const getClientIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Failed to get IP:', error);
    return 'unknown';
  }
};

// Upload file to Supabase storage
export const uploadFile = async (file: File, folder: string = 'uploads'): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const fileName = `${folder}/${timestamp}-${randomStr}.${fileExt}`;

    console.log('Uploading file:', fileName, 'Size:', file.size);

    // Upload to fitness-uploads bucket
    const { data, error } = await supabase.storage
      .from('fitness-uploads')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      throw error;
    }

    console.log('Upload successful:', data);

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('fitness-uploads')
      .getPublicUrl(fileName);

    console.log('Public URL:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('File upload error:', error);
    throw error;
  }
};

// Get all form submissions (admin only)
export const getFormSubmissions = async (): Promise<FormSubmission[]> => {
  try {
    // Query the table directly since the view has issues
    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false });  // Use created_at instead of submitted_at

    if (error) {
      console.error('Error fetching from form_submissions:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching submissions:', error);
    throw error;
  }
};

// Export to CSV with proper field names
export const exportToCSV = (data: any[], filename: string = 'grainz-fitness-submissions.csv') => {
  if (!data.length) return;

  // Map database columns to readable headers
  const headerMapping: Record<string, string> = {
    submission_id: 'Submission ID',
    user_name: 'Your Name',
    email: 'Email Address',
    phone_number: 'Phone Number',
    profession: 'Profession',
    current_diet_timetable: 'Current Diet Timetable',
    current_workout_plan: 'Current Workout Plan',
    daily_schedule: 'Daily Schedule with Timings',
    fitness_goal_6_months: 'Fitness Goal (6 Months)',
    fitness_goal_long_term: 'Long-term Fitness Goal',
    medical_issues_allergies: 'Medical Issues or Food Allergies',
    preferred_workout_time: 'Preferred Workout Time',
    has_personal_trainer: 'Has Personal Trainer',
    target_body_areas: 'Target Body Areas',
    resting_heart_rate: 'Resting Heart Rate (BPM)',
    high_calorie_favourite_foods: 'High Calorie Favourite Foods',
    other_high_calorie_sweets: 'Other High Calorie Sweets',
    preferred_included_foods: 'Preferred Foods to Include',
    foods_despised: 'Foods You Despise',
    favourite_fruits: 'Favourite Fruits',
    favourite_vegetables: 'Favourite Vegetables',
    diet_habits: 'Diet Habits',
    programme_start_date: 'Programme Start Date',
    alcohol_smoke_frequency: 'Alcohol/Smoke Frequency',
    programme_chosen: 'Programme Chosen',
    blood_report_url: 'Blood Report',
    body_composition_report_url: 'Body Composition Report',
    aspiration_image_url: 'Aspiration Body Image',
    created_at: 'Submitted At',
    ip_address: 'IP Address',
    user_agent: 'User Agent',
    form_version: 'Form Version'
  };

  // Get ordered headers
  const orderedKeys = [
    'submission_id',
    'created_at',
    'user_name',
    'email',
    'phone_number',
    'profession',
    'programme_start_date',
    'programme_chosen',
    'fitness_goal_6_months',
    'fitness_goal_long_term',
    'target_body_areas',
    'current_diet_timetable',
    'current_workout_plan',
    'daily_schedule',
    'preferred_workout_time',
    'has_personal_trainer',
    'medical_issues_allergies',
    'resting_heart_rate',
    'alcohol_smoke_frequency',
    'high_calorie_favourite_foods',
    'other_high_calorie_sweets',
    'preferred_included_foods',
    'foods_despised',
    'favourite_fruits',
    'favourite_vegetables',
    'diet_habits',
    'blood_report_url',
    'body_composition_report_url',
    'aspiration_image_url'
  ];

  // Filter only existing keys
  const existingKeys = orderedKeys.filter(key => data[0].hasOwnProperty(key));
  const headers = existingKeys.map(key => headerMapping[key] || key);
  
  // Format data for CSV
  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (Array.isArray(value)) {
      return value.length > 0 ? value.join('; ') : '';
    }
    if (value instanceof Date) {
      return value.toLocaleDateString();
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    // Format URLs as clickable links
    if (typeof value === 'string' && value.startsWith('http')) {
      return value;
    }
    return String(value);
  };

  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      existingKeys.map(key => {
        const value = formatValue(row[key]);
        // Escape quotes and wrap in quotes if contains comma, newline, or quotes
        if (value.includes(',') || value.includes('"') || value.includes('\n')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  // Add BOM for UTF-8 encoding to properly display special characters
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  const date = new Date().toISOString().split('T')[0];
  const finalFilename = filename.replace('.csv', `-${date}.csv`);
  
  link.setAttribute('href', url);
  link.setAttribute('download', finalFilename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
