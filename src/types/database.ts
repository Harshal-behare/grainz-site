// Database types matching the Supabase schema
export interface FormSubmission {
  id?: number;
  submission_id: string;
  
  // Basic Information
  user_name?: string;
  email?: string;
  phone_number?: string;
  profession?: string;
  
  // Demographics (NEW FIELDS)
  age_bracket?: '18_29' | '30_39' | '40_49' | '50_plus';
  height_cm?: number;
  current_weight_kg?: number;
  target_weight_kg?: number;
  
  // Current Status
  current_diet_timetable?: string;
  current_workout_plan?: string;
  daily_schedule?: string;
  
  // Goals
  fitness_goal_6_months?: string;
  fitness_goal_long_term?: string;
  target_body_areas?: string; // JSONB - stored as JSON string
  primary_goal?: 'lose_weight' | 'gain_muscle' | 'get_shredded'; // NEW
  ideal_physique?: 'athlete' | 'hero' | 'bodybuilder'; // NEW
  
  // Health Information
  medical_issues_allergies?: string;
  resting_heart_rate?: number;
  alcohol_smoke_frequency?: string;
  body_fat_percent_band?: string; // NEW
  water_intake?: 'coffee_only' | 'lt_2_glasses' | '2_6_glasses' | '7_10_glasses' | 'gt_10_glasses'; // NEW
  
  // Workout Preferences
  preferred_workout_time?: string;
  has_personal_trainer?: boolean;
  workout_location?: 'home' | 'gym'; // NEW
  equipment_access_level?: 'none' | 'basic' | 'full'; // NEW
  training_frequency_recent?: 'none' | '1_2_per_week' | '3_per_week' | 'gt_3_per_week'; // NEW
  session_duration_preference?: '30_min' | '45_min' | '60_min' | 'auto_decide'; // NEW
  fitness_level?: number; // NEW (1-10 scale)
  pushups_max_reps_band?: 'lt_10' | '10_20' | '21_30' | 'gt_30'; // NEW
  pullups_max_reps_band?: 'cant_do' | 'lt_5' | '5_10' | 'gt_10'; // NEW
  
  // Diet Preferences (JSONB fields - stored as JSON strings in database)
  diet_type?: 'vegetarian' | 'vegan' | 'keto' | 'mediterranean' | 'none'; // NEW
  high_calorie_favourite_foods?: string | string[]; // JSONB - accepts array, stored as JSON string
  other_high_calorie_sweets?: string;
  preferred_included_foods?: string | string[]; // JSONB - accepts array, stored as JSON string
  foods_despised?: string | string[]; // JSONB - accepts array, stored as JSON string
  favourite_fruits?: string | string[]; // JSONB - accepts array, stored as JSON string
  favourite_vegetables?: string | string[]; // JSONB - accepts array, stored as JSON string
  diet_habits?: string | string[]; // JSONB - accepts array, stored as JSON string
  sugar_intake_frequency?: 'low' | 'mid' | 'high'; // NEW
  mealprep_time_preference?: 'lt_30_min' | '30_60_min' | 'gt_60_min' | 'prefer_order'; // NEW
  
  // Program Information
  programme_start_date?: string;
  programme_chosen?: string;
  
  // File Uploads
  blood_report_url?: string;
  body_composition_report_url?: string;
  aspiration_image_url?: string;
  
  // Metadata
  ip_address?: string;
  user_agent?: string;
  form_version?: string;
  submitted_at?: string;
  created_at?: string;
}

export interface BodyMeasurements {
  id?: number;
  submission_id: string;
  forearm_in?: number;
  bicep_in?: number;
  shoulder_in?: number;
  chest_in?: number;
  upper_waist_in?: number;
  lower_waist_in?: number;
  belly_button_circumference_in?: number;
  buttocks_in?: number;
  thighs_in?: number;
  created_at?: string;
}

export interface FullBodyImage {
  id?: number;
  submission_id: string;
  file_url: string;
  view_type?: string; // front, rear, side_left, side_right, other
  created_at?: string;
}

export interface AdminProfile {
  id: string;
  email: string;
  role?: string;
  created_at?: string;
}

// Combined form data for submission
export interface CompleteFormData {
  submission: FormSubmission;
  measurements?: BodyMeasurements;
  images?: FullBodyImage[];
}