import { supabase } from './supabase-client';
import { FormSubmission, BodyMeasurements, FullBodyImage, CompleteFormData } from '@/types/database';
import { CompleteUserData } from '@/types/fitness';

// Generate unique submission ID
const generateSubmissionId = (): string => {
  const timestamp = Math.floor(Date.now() / 1000);
  const random = Math.floor(Math.random() * 1000);
  return `FIT-${timestamp}-${random}`;
};

// Convert form data to database format - all 43 fields
const convertFormDataToSubmission = (formData: Partial<CompleteUserData>): FormSubmission => {
  const submission: FormSubmission = {
    submission_id: generateSubmissionId(),
    
    // Basic Information (4 fields)
    user_name: formData.profile?.user_name || undefined,
    email: formData.profile?.email || undefined,
    phone_number: formData.profile?.phone_number || undefined,
    profession: formData.profile?.profession || undefined,
    
    // Demographics (4 fields)
    age_bracket: formData.personal?.age_bracket || undefined,
    height_cm: formData.personal?.height || undefined,
    current_weight_kg: formData.personal?.weight?.current || undefined,
    target_weight_kg: formData.personal?.weight?.target || undefined,
    
    // Current Status (3 fields)
    current_diet_timetable: formData.diet?.current_diet_timetable || undefined,
    current_workout_plan: formData.workout?.current_workout_plan || undefined,
    daily_schedule: formData.workout?.daily_schedule || undefined,
    
    // Goals (5 fields)
    fitness_goal_6_months: formData.goals?.fitness_goal_6_months || undefined,
    fitness_goal_long_term: formData.goals?.fitness_goal_long_term || undefined,
    target_body_areas: JSON.stringify(formData.goals?.target_body_areas || []),
    primary_goal: formData.goals?.primary_goal || undefined,
    ideal_physique: formData.goals?.physique_target as 'athlete' | 'hero' | 'bodybuilder' | undefined,
    
    // Health Information (5 fields)
    medical_issues_allergies: formData.health?.medical_issues_allergies || undefined,
    resting_heart_rate: formData.health?.resting_heart_rate || undefined,
    alcohol_smoke_frequency: formData.health?.alcohol_smoke_frequency || undefined,
    body_fat_percent_band: formData.health?.body_fat_percent_band || undefined,
    water_intake: formData.health?.water_intake || undefined,
    
    // Workout Preferences (9 fields)
    preferred_workout_time: formData.workout?.preferred_workout_time || undefined,
    has_personal_trainer: formData.workout?.has_personal_trainer ?? false,
    workout_location: formData.workout?.workout_location || undefined,
    equipment_access_level: formData.workout?.equipment_access_level || undefined,
    training_frequency_recent: formData.workout?.training_frequency_recent || undefined,
    session_duration_preference: formData.workout?.session_duration_preference || undefined,
    fitness_level: formData.workout?.fitness_level || undefined,
    pushups_max_reps_band: formData.workout?.pushups_max_reps_band || undefined,
    pullups_max_reps_band: formData.workout?.pullups_max_reps_band || undefined,
    
    // Diet Preferences (9 fields)
    diet_type: formData.diet?.diet_type || undefined,
    high_calorie_favourite_foods: JSON.stringify(formData.diet?.high_calorie_favourite_foods || []),
    other_high_calorie_sweets: formData.diet?.other_high_calorie_sweets || undefined,
    preferred_included_foods: JSON.stringify(formData.diet?.preferred_included_foods || []),
    foods_despised: JSON.stringify(formData.diet?.foods_despised || []),
    favourite_fruits: JSON.stringify(formData.diet?.favourite_fruits || []),
    favourite_vegetables: JSON.stringify(formData.diet?.favourite_vegetables || []),
    diet_habits: JSON.stringify(formData.diet?.diet_habits || []),
    sugar_intake_frequency: formData.diet?.sugar_intake_frequency || undefined,
    mealprep_time_preference: formData.diet?.mealprep_time_preference || undefined,
    
    // Program Information (2 fields)
    programme_start_date: formData.profile?.programme_start_date?.toISOString().split('T')[0] || undefined,
    programme_chosen: formData.additional?.programme_chosen || formData.additional?.extra_challenge || undefined,
    
    // File Uploads (3 fields)
    blood_report_url: formData.files?.blood_report_url || undefined,
    body_composition_report_url: formData.files?.body_composition_report_url || undefined,
    aspiration_image_url: formData.files?.aspiration_image_url || undefined,
    
    // Metadata
    form_version: 'v1.0',
  };
  
  return submission;
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
  let submissionId: string | null = null;
  let uploadedFiles: string[] = [];

  try {
    // Step 1: Get client information
    const clientInfo = {
      ip_address: await getClientIP(),
      user_agent: navigator.userAgent,
    };

    // Step 2: Handle file uploads before database insertion
    const uploadedUrls: { [key: string]: string | null } = {};
    
    // Handle regular file uploads (File objects)
    if (formData.files) {
      for (const [key, value] of Object.entries(formData.files)) {
        if (value && value instanceof File) {
          try {
            const folder = key === 'aspiration_image_url' ? 'images' : 'reports';
            const url = await uploadFile(value, folder);
            uploadedUrls[key] = url;
            uploadedFiles.push(url); // Track for cleanup on failure
          } catch (uploadError) {
            console.error(`Failed to upload ${key}:`, uploadError);
            uploadedUrls[key] = null;
          }
        } else if (typeof value === 'string') {
          // Already a URL, use as-is
          uploadedUrls[key] = value;
        }
      }
    }

    // Handle body images uploads
    const uploadedBodyImages: any[] = [];
    if (formData.images && formData.images.length > 0) {
      for (const image of formData.images) {
        // Images should already have URLs from the upload step in the form
        if (typeof image.file_url === 'string') {
          uploadedBodyImages.push({
            file_url: image.file_url,
            view_type: image.view
          });
        }
      }
    }

    // Step 3: Prepare submission data with uploaded URLs and client info
    const submissionData = {
      ...formData,
      files: {
        blood_report_url: uploadedUrls.blood_report_url || formData.files?.blood_report_url,
        body_composition_report_url: uploadedUrls.body_composition_report_url || formData.files?.body_composition_report_url,
        aspiration_image_url: uploadedUrls.aspiration_image_url || formData.files?.aspiration_image_url,
      }
    };

    const submission = convertFormDataToSubmission(submissionData);
    
    // Add client info
    submission.ip_address = clientInfo.ip_address;
    submission.user_agent = clientInfo.user_agent;

    console.log('Submitting form data with all fields:', submission);

    // Step 4: Insert main submission
    const { data: submissionResult, error: submissionError } = await supabase
      .from('form_submissions')
      .insert(submission)
      .select()
      .single();

    if (submissionError) {
      throw new Error(`Failed to insert submission: ${submissionError.message}`);
    }

    submissionId = submissionResult.submission_id;

    // Step 5: Insert body measurements
    const measurements = convertMeasurements(formData, submissionId!);
    if (measurements && Object.values(measurements).some(v => v !== null && v !== undefined)) {
      const { error: measurementsError } = await supabase
        .from('body_measurements')
        .insert(measurements);

      if (measurementsError) {
        throw new Error(`Failed to insert measurements: ${measurementsError.message}`);
      }
    }

    // Step 6: Insert body images
    if (uploadedBodyImages.length > 0) {
      const imagesToInsert = uploadedBodyImages.map(image => ({
        submission_id: submissionId!,
        file_url: image.file_url,
        view_type: image.view_type,
      }));

      const { error: imagesError } = await supabase
        .from('full_body_images')
        .insert(imagesToInsert);

      if (imagesError) {
        throw new Error(`Failed to insert images: ${imagesError.message}`);
      }
    }

    console.log('Form submission successful. ID:', submissionId);
    return submissionId!;

  } catch (error) {
    console.error('Form submission failed:', error);
    
    // Rollback: Delete the submission if it was created
    if (submissionId) {
      try {
        await supabase
          .from('form_submissions')
          .delete()
          .eq('submission_id', submissionId);
        
        console.log('Rolled back submission:', submissionId);
      } catch (rollbackError) {
        console.error('Failed to rollback submission:', rollbackError);
      }
    }

    // Cleanup uploaded files on failure
    for (const fileUrl of uploadedFiles) {
      try {
        const path = fileUrl.split('/').pop();
        if (path) {
          await supabase.storage
            .from('fitness-uploads')
            .remove([path]);
        }
      } catch (cleanupError) {
        console.error('Failed to cleanup uploaded file:', cleanupError);
      }
    }

    throw error;
  }
};

// Other existing code...

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
    // Don't duplicate the folder name in the path
    const fileName = `${timestamp}-${randomStr}.${fileExt}`;

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
      throw new Error('Upload failed');
    }

    console.log('Upload successful:', data);

    // Refresh public URL
    const { data: publicUrlData } = supabase.storage
      .from('fitness-uploads')
      .getPublicUrl(fileName);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      throw new Error('Could not get public URL');
    }

    console.log('Public URL:', publicUrlData);
    return publicUrlData.publicUrl;
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

// Fetch form submissions with all related data (measurements and images)
export const fetchSubmissionsWithDetails = async (): Promise<any[]> => {
  const submissions = await getFormSubmissions();
  const detailedSubmissions = [];

  for (const submission of submissions) {
    // Fetch body measurements
    const { data: measurementData } = await supabase
      .from('body_measurements')
      .select('*')
      .eq('submission_id', submission.submission_id)
      .single();

    // Fetch full body images
    const { data: imageData } = await supabase
      .from('full_body_images')
      .select('*')
      .eq('submission_id', submission.submission_id)
      .order('view_type');

    // Combine all data
    const completeSubmission = {
      ...submission,
      // Add measurements as separate fields
      forearm_in: measurementData?.forearm_in || null,
      bicep_in: measurementData?.bicep_in || null,
      shoulder_in: measurementData?.shoulder_in || null,
      chest_in: measurementData?.chest_in || null,
      upper_waist_in: measurementData?.upper_waist_in || null,
      lower_waist_in: measurementData?.lower_waist_in || null,
      belly_button_circumference_in: measurementData?.belly_button_circumference_in || null,
      buttocks_in: measurementData?.buttocks_in || null,
      thighs_in: measurementData?.thighs_in || null,
      // Add full body images
      full_body_images: imageData || [],
    };

    detailedSubmissions.push(completeSubmission);
  }

  return detailedSubmissions;
};

// Export to CSV with proper field names and complete data
export const exportToCSV = (data: any[], filename: string = 'grainz-fitness-submissions.csv') => {
  if (!data.length) return;

  // Map database columns to readable headers - all 43 fields
  const headerMapping: Record<string, string> = {
    submission_id: 'Submission ID',
    
    // Basic Information
    user_name: 'Your Name',
    email: 'Email Address',
    phone_number: 'Phone Number',
    profession: 'Profession',
    
    // Demographics
    age_bracket: 'Age Bracket',
    height_cm: 'Height (cm)',
    current_weight_kg: 'Current Weight (kg)',
    target_weight_kg: 'Target Weight (kg)',
    
    // Current Status
    current_diet_timetable: 'Current Diet Timetable',
    current_workout_plan: 'Current Workout Plan',
    daily_schedule: 'Daily Schedule with Timings',
    
    // Goals
    fitness_goal_6_months: 'Fitness Goal (6 Months)',
    fitness_goal_long_term: 'Long-term Fitness Goal',
    target_body_areas: 'Target Body Areas',
    primary_goal: 'Primary Goal',
    ideal_physique: 'Ideal Physique',
    
    // Health Information
    medical_issues_allergies: 'Medical Issues or Food Allergies',
    resting_heart_rate: 'Resting Heart Rate (BPM)',
    alcohol_smoke_frequency: 'Alcohol/Smoke Frequency',
    body_fat_percent_band: 'Body Fat Percentage Band',
    water_intake: 'Water Intake',
    
    // Workout Preferences
    preferred_workout_time: 'Preferred Workout Time',
    has_personal_trainer: 'Has Personal Trainer',
    workout_location: 'Workout Location',
    equipment_access_level: 'Equipment Access Level',
    training_frequency_recent: 'Recent Training Frequency',
    session_duration_preference: 'Session Duration Preference',
    fitness_level: 'Fitness Level (1-10)',
    pushups_max_reps_band: 'Push-ups Max Reps',
    pullups_max_reps_band: 'Pull-ups Max Reps',
    
    // Diet Preferences
    diet_type: 'Diet Type',
    high_calorie_favourite_foods: 'High Calorie Favourite Foods',
    other_high_calorie_sweets: 'Other High Calorie Sweets',
    preferred_included_foods: 'Preferred Foods to Include',
    foods_despised: 'Foods You Despise',
    favourite_fruits: 'Favourite Fruits',
    favourite_vegetables: 'Favourite Vegetables',
    diet_habits: 'Diet Habits',
    sugar_intake_frequency: 'Sugar Intake Frequency',
    mealprep_time_preference: 'Meal Prep Time Preference',
    
    // Program Information
    programme_start_date: 'Programme Start Date',
    programme_chosen: 'Programme Chosen',
    
    // File Uploads
    blood_report_url: 'Blood Report',
    body_composition_report_url: 'Body Composition Report',
    aspiration_image_url: 'Aspiration Body Image',
    
    // Metadata
    created_at: 'Submitted At',
    ip_address: 'IP Address',
    user_agent: 'User Agent',
    form_version: 'Form Version'
  };

  // Get ordered headers - all 43 fields in logical order
  const orderedKeys = [
    'submission_id',
    'created_at',
    
    // Basic Information (4 fields)
    'user_name',
    'email',
    'phone_number',
    'profession',
    
    // Demographics (4 fields)
    'age_bracket',
    'height_cm',
    'current_weight_kg',
    'target_weight_kg',
    
    // Goals (5 fields)
    'primary_goal',
    'ideal_physique',
    'fitness_goal_6_months',
    'fitness_goal_long_term',
    'target_body_areas',
    
    // Health Information (5 fields)
    'medical_issues_allergies',
    'resting_heart_rate',
    'alcohol_smoke_frequency',
    'body_fat_percent_band',
    'water_intake',
    
    // Current Status (3 fields)
    'current_diet_timetable',
    'current_workout_plan',
    'daily_schedule',
    
    // Workout Preferences (9 fields)
    'preferred_workout_time',
    'has_personal_trainer',
    'workout_location',
    'equipment_access_level',
    'training_frequency_recent',
    'session_duration_preference',
    'fitness_level',
    'pushups_max_reps_band',
    'pullups_max_reps_band',
    
    // Diet Preferences (9 fields)
    'diet_type',
    'sugar_intake_frequency',
    'mealprep_time_preference',
    'high_calorie_favourite_foods',
    'other_high_calorie_sweets',
    'preferred_included_foods',
    'foods_despised',
    'favourite_fruits',
    'favourite_vegetables',
    'diet_habits',
    
    // Program Information (2 fields)
    'programme_start_date',
    'programme_chosen',
    
    // File Uploads (3 fields)
    'blood_report_url',
    'body_composition_report_url',
    'aspiration_image_url',
    
    // Metadata
    'ip_address',
    'user_agent',
    'form_version'
  ];

  // Body measurements columns
  const measurementColumns = [
    'forearm_in',
    'bicep_in',
    'shoulder_in',
    'chest_in',
    'upper_waist_in',
    'lower_waist_in',
    'belly_button_circumference_in',
    'buttocks_in',
    'thighs_in'
  ];

  // Filter only existing keys from base submission data
  const existingKeys = orderedKeys.filter(key => data[0].hasOwnProperty(key));
  const headers = existingKeys.map(key => headerMapping[key] || key);
  
  // Add body measurement headers
  headers.push(
    'Forearm (inches)',
    'Bicep (inches)',
    'Shoulder (inches)',
    'Chest (inches)',
    'Upper Waist (inches)',
    'Lower Waist (inches)',
    'Belly Button Circumference (inches)',
    'Buttocks (inches)',
    'Thighs (inches)'
  );
  
  // Add full body image headers
  headers.push(
    'Front View Image',
    'Rear View Image',
    'Side Left View Image',
    'Side Right View Image',
    'Other View Images'
  );
  
  // Format data for CSV
  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (Array.isArray(value)) {
      return value.length > 0 ? value.join('; ') : '';
    }
    // Handle JSON strings (from JSONB columns)
    if (typeof value === 'string' && (value.startsWith('[') || value.startsWith('{'))) {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          return parsed.length > 0 ? parsed.join('; ') : '';
        }
        return JSON.stringify(parsed);
      } catch {
        // If parsing fails, return as-is
        return value;
      }
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
    ...data.map(row => {
      // Get base submission data
      const baseData = existingKeys.map(key => {
        const value = formatValue(row[key]);
        // Escape quotes and wrap in quotes if contains comma, newline, or quotes
        if (value.includes(',') || value.includes('"') || value.includes('\n')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      });
      
      // Add body measurements
      const measurements = measurementColumns.map(col => {
        const value = row[col] ? String(row[col]) : '';
        return value;
      });
      
      // Add full body images by view type
      const images = row.full_body_images || [];
      const frontImage = images.find((img: any) => img.view_type === 'front')?.file_url || '';
      const rearImage = images.find((img: any) => img.view_type === 'rear')?.file_url || '';
      const sideLeftImage = images.find((img: any) => img.view_type === 'side_left')?.file_url || '';
      const sideRightImage = images.find((img: any) => img.view_type === 'side_right')?.file_url || '';
      const otherImages = images
        .filter((img: any) => !['front', 'rear', 'side_left', 'side_right'].includes(img.view_type))
        .map((img: any) => img.file_url)
        .join('; ');
      
      // Combine all data
      return [...baseData, ...measurements, frontImage, rearImage, sideLeftImage, sideRightImage, otherImages].join(',');
    })
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
