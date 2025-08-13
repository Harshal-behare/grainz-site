/**
 * Defines the complete schema, mappings, and logical structure for the multi-step fitness form.
 * This file serves as the single source of truth for all form-related data.
 */

// Represents the complete, consolidated data from all form steps
export interface FullFormData {
  // Personal and Contact Info
  user_name: string;
  email: string;
  phone_number: string;
  profession: string;
  age_bracket: '18_29' | '30_39' | '40_49' | '50_plus';
  height_cm: number;
  current_weight_kg: number;
  target_weight_kg: number;
  
  // Goals and Motivation
  fitness_goal_6_months: string;
  fitness_goal_long_term: string;
  primary_goal: 'lose_weight' | 'gain_muscle' | 'get_shredded';
  ideal_physique: 'athlete' | 'hero' | 'bodybuilder';
  target_body_areas: string;
  aspiration_image_url?: string;

  // Health and Lifestyle
  medical_issues_allergies: string;
  alcohol_smoke_frequency: string;
  resting_heart_rate?: number;
  body_fat_percent_band?: string;
  water_intake: 'coffee_only' | 'lt_2_glasses' | '2_6_glasses' | '7_10_glasses' | 'gt_10_glasses';
  blood_report_url?: string;
  body_composition_report_url?: string;

  // Diet and Nutrition
  current_diet_timetable: string;
  diet_type: 'vegetarian' | 'vegan' | 'keto' | 'mediterranean' | 'none';
  diet_habits: string[];
  high_calorie_favourite_foods: string[];
  other_high_calorie_sweets?: string;
  preferred_included_foods: string[];
  foods_despised: string[];
  favourite_fruits: string[];
  favourite_vegetables: string[];
  sugar_intake_frequency: 'low' | 'mid' | 'high';
  mealprep_time_preference: 'lt_30_min' | '30_60_min' | 'gt_60_min' | 'prefer_order';

  // Workout and Fitness
  current_workout_plan: string;
  daily_schedule: string;
  preferred_workout_time: string;
  has_personal_trainer: boolean;
  workout_location: 'home' | 'gym';
  equipment_access_level: 'none' | 'basic' | 'full';
  training_frequency_recent: 'none' | '1_2_per_week' | '3_per_week' | 'gt_3_per_week';
  session_duration_preference: '30_min' | '45_min' | '60_min' | 'auto_decide';
  fitness_level: number; // 1-10 scale
  pushups_max_reps_band: 'lt_10' | '10_20' | '21_30' | 'gt_30';
  pullups_max_reps_band: 'cant_do' | 'lt_5' | '5_10' | 'gt_10';
  
  // Program and Uploads
  programme_start_date: string; // ISO date string
  programme_chosen: string;

  // Measurements
  measurements?: {
    forearm_in?: number;
    bicep_in?: number;
    shoulder_in?: number;
    chest_in?: number;
    upper_waist_in?: number;
    lower_waist_in?: number;
    belly_button_circumference_in?: number;
    buttocks_in?: number;
    thighs_in?: number;
  };
  
  // Full Body Images
  images?: {
    front: string;
    rear: string;
    side_left: string;
    side_right: string;
  };
}

// Maps form fields to the `form_submissions` database table columns
export const formToDatabaseMapping: { [K in keyof FullFormData]: string } = {
  // Personal and Contact Info
  user_name: 'user_name',
  email: 'email',
  phone_number: 'phone_number',
  profession: 'profession',
  age_bracket: 'age_bracket',
  height_cm: 'height_cm',
  current_weight_kg: 'current_weight_kg',
  target_weight_kg: 'target_weight_kg',
  
  // Goals and Motivation
  fitness_goal_6_months: 'fitness_goal_6_months',
  fitness_goal_long_term: 'fitness_goal_long_term',
  primary_goal: 'primary_goal',
  ideal_physique: 'ideal_physique',
  target_body_areas: 'target_body_areas',
  aspiration_image_url: 'aspiration_image_url',

  // Health and Lifestyle
  medical_issues_allergies: 'medical_issues_allergies',
  alcohol_smoke_frequency: 'alcohol_smoke_frequency',
  resting_heart_rate: 'resting_heart_rate',
  body_fat_percent_band: 'body_fat_percent_band',
  water_intake: 'water_intake',
  blood_report_url: 'blood_report_url',
  body_composition_report_url: 'body_composition_report_url',
  
  // Diet and Nutrition
  current_diet_timetable: 'current_diet_timetable',
  diet_type: 'diet_type',
  diet_habits: 'diet_habits', // JSONB
  high_calorie_favourite_foods: 'high_calorie_favourite_foods', // JSONB
  other_high_calorie_sweets: 'other_high_calorie_sweets',
  preferred_included_foods: 'preferred_included_foods', // JSONB
  foods_despised: 'foods_despised', // JSONB
  favourite_fruits: 'favourite_fruits', // JSONB
  favourite_vegetables: 'favourite_vegetables', // JSONB
  sugar_intake_frequency: 'sugar_intake_frequency',
  mealprep_time_preference: 'mealprep_time_preference',
  
  // Workout and Fitness
  current_workout_plan: 'current_workout_plan',
  daily_schedule: 'daily_schedule',
  preferred_workout_time: 'preferred_workout_time',
  has_personal_trainer: 'has_personal_trainer',
  workout_location: 'workout_location',
  equipment_access_level: 'equipment_access_level',
  training_frequency_recent: 'training_frequency_recent',
  session_duration_preference: 'session_duration_preference',
  fitness_level: 'fitness_level',
  pushups_max_reps_band: 'pushups_max_reps_band',
  pullups_max_reps_band: 'pullups_max_reps_band',
  
  // Program Information
  programme_start_date: 'programme_start_date',
  programme_chosen: 'programme_chosen',

  // These are handled separately as they map to different tables
  measurements: 'body_measurements', // Maps to the `body_measurements` table
  images: 'full_body_images' // Maps to the `full_body_images` table
};

// Defines the logical grouping of fields for the multi-step form
export const formStepGroups = {
  '1_Introduction': ['user_name', 'email', 'phone_number', 'profession'],
  '2_PersonalDetails': ['age_bracket', 'height_cm', 'current_weight_kg', 'target_weight_kg'],
  '3_PrimaryGoals': ['primary_goal', 'ideal_physique', 'fitness_goal_6_months', 'fitness_goal_long_term', 'target_body_areas', 'aspiration_image_url'],
  '4_HealthAndLifestyle': ['medical_issues_allergies', 'alcohol_smoke_frequency', 'resting_heart_rate', 'body_fat_percent_band', 'water_intake'],
  '5_DietaryHabits': [
    'current_diet_timetable',
    'diet_type',
    'diet_habits',
    'sugar_intake_frequency',
    'mealprep_time_preference'
  ],
  '6_FoodPreferences': [
    'high_calorie_favourite_foods',
    'other_high_calorie_sweets',
    'preferred_included_foods',
    'foods_despised',
    'favourite_fruits',
    'favourite_vegetables'
  ],
  '7_WorkoutExperience': [
    'current_workout_plan',
    'daily_schedule',
    'preferred_workout_time',
    'has_personal_trainer',
    'workout_location',
    'equipment_access_level'
  ],
  '8_FitnessLevel': [
    'training_frequency_recent',
    'session_duration_preference',
    'fitness_level',
    'pushups_max_reps_band',
    'pullups_max_reps_band'
  ],
  '9_ProgramAndUploads': ['programme_start_date', 'programme_chosen', 'blood_report_url', 'body_composition_report_url'],
  '10_Measurements': ['measurements'],
  '11_Images': ['images']
};

export type FormStepName = keyof typeof formStepGroups;

