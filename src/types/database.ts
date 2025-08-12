// Database types matching the Supabase schema
export interface FormSubmission {
  id?: number;
  submission_id: string;
  
  // Basic Information
  user_name?: string;
  email?: string;
  phone_number?: string;
  profession?: string;
  
  // Current Status
  current_diet_timetable?: string;
  current_workout_plan?: string;
  daily_schedule?: string;
  
  // Goals
  fitness_goal_6_months?: string;
  fitness_goal_long_term?: string;
  target_body_areas?: string;
  
  // Health Information
  medical_issues_allergies?: string;
  resting_heart_rate?: number;
  
  // Workout Preferences
  preferred_workout_time?: string;
  has_personal_trainer?: boolean;
  
  // Diet Preferences (JSON arrays)
  high_calorie_favourite_foods?: string[];
  other_high_calorie_sweets?: string;
  preferred_included_foods?: string[];
  foods_despised?: string[];
  favourite_fruits?: string[];
  favourite_vegetables?: string[];
  diet_habits?: string[];
  
  // Program Information
  programme_start_date?: string;
  programme_chosen?: string;
  alcohol_smoke_frequency?: string;
  
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