// User basic information types
export interface UserProfile {
  id: string;
  user_name: string;
  email: string;
  phone_number: string;
  profession: string;
  programme_start_date: Date;
  created_at: Date;
  updated_at: Date;
}

// Fitness assessment types
export interface FitnessGoals {
  fitness_goal_6_months: string;
  fitness_goal_long_term: string;
  target_body_areas: string;
  body_type: 'slim' | 'average' | 'heavy';
  primary_goal: 'lose_weight' | 'gain_muscle' | 'get_shredded';
  physique_target: 'athlete' | 'hero' | 'bodybuilder';
}

// Health and medical information
export interface HealthInfo {
  medical_issues_allergies: string;
  resting_heart_rate: number;
  alcohol_smoke_frequency: string;
  body_fat_percent_band: string;
  problem_areas: string[];
  water_intake: 'coffee_only' | 'lt_2_glasses' | '2_6_glasses' | '7_10_glasses' | 'gt_10_glasses';
}

// Diet and nutrition preferences
export interface DietPreferences {
  current_diet_timetable: string;
  diet_habits: string[];
  high_calorie_favourite_foods: string[];
  other_high_calorie_sweets: string;
  preferred_included_foods: string[];
  foods_despised: string[];
  favourite_fruits: string[];
  favourite_vegetables: string[];
  diet_type: 'vegetarian' | 'vegan' | 'keto' | 'mediterranean' | 'none';
  sugar_intake_frequency: 'low' | 'mid' | 'high';
  mealprep_time_preference: 'lt_30_min' | '30_60_min' | 'gt_60_min' | 'prefer_order';
}

// Workout and fitness preferences
export interface WorkoutPreferences {
  current_workout_plan: string;
  daily_schedule: string;
  preferred_workout_time: string;
  has_personal_trainer: boolean;
  workout_location: 'home' | 'gym';
  equipment_access_level: 'none' | 'basic' | 'full';
  training_frequency_recent: 'none' | '1_2_per_week' | '3_per_week' | 'gt_3_per_week';
  session_duration_preference: '30_min' | '45_min' | '60_min' | 'auto_decide';
  fitness_level: number; // 1-10 scale
  exercise_feedback: {
    pullups: 'dislike' | 'neutral' | 'like';
    squats: 'dislike' | 'neutral' | 'like';
    pushups: 'dislike' | 'neutral' | 'like';
  };
  pushups_max_reps_band: 'lt_10' | '10_20' | '21_30' | 'gt_30';
  pullups_max_reps_band: 'cant_do' | 'lt_5' | '5_10' | 'gt_10';
  sports_interests: string[];
  fitness_barriers: string[];
}

// Personal information and demographics
export interface PersonalInfo {
  age_bracket: '18_29' | '30_39' | '40_49' | '50_plus';
  height: number;
  weight: {
    current: number;
    target: number;
  };
  profile_display_name: string;
  date_of_birth: Date;
}

// Additional goals and challenges
export interface AdditionalPreferences {
  additional_goals: string[];
  extra_challenge: 'walk_10k_steps_7d' | 'burpee_25_10d' | 'no_sugar_21d' | 'all_challenges' | 'none';
  wants_supplements_guide: boolean;
}

// File upload types
export interface FileUploads {
  blood_report_url?: string;
  body_composition_report_url?: string;
  aspiration_image_url?: string;
}

// Body measurements (separate table)
export interface BodyMeasurements {
  id: string;
  user_id: string;
  forearm_in: number;
  bicep_in: number;
  shoulder_in: number;
  chest_in: number;
  upper_waist_in: number;
  lower_waist_in: number;
  belly_button_circumference_in: number;
  buttocks_in: number;
  thighs_in: number;
  measured_at: Date;
}

// Full body images (separate table)
export interface FullBodyImage {
  id: string;
  user_id: string;
  file_url: string;
  view: 'front' | 'rear' | 'side_left' | 'side_right' | 'other';
  uploaded_at: Date;
}

// Complete user data combining all interfaces
export interface CompleteUserData {
  profile: UserProfile;
  goals: FitnessGoals;
  health: HealthInfo;
  diet: DietPreferences;
  workout: WorkoutPreferences;
  personal: PersonalInfo;
  additional: AdditionalPreferences;
  files: FileUploads;
  measurements?: BodyMeasurements;
  images?: FullBodyImage[];
}

// Form step types for the questionnaire
export type FormStep = 
  | 'body-type'
  | 'primary-goal' 
  | 'ideal-physique'
  | 'body-fat'
  | 'problem-areas'
  | 'diet-type'
  | 'sugar-intake'
  | 'age-bracket'
  | 'height'
  | 'weight'
  | 'fitness-level'
  | 'exercise-preferences'
  | 'sports-interests'
  | 'fitness-barriers'
  | 'water-intake'
  | 'workout-location'
  | 'equipment-access'
  | 'training-frequency'
  | 'meal-prep-time'
  | 'additional-goals'
  | 'pushups-capacity'
  | 'pullups-capacity'
  | 'profile-info'
  | 'contact-info'
  | 'personal-details'
  | 'file-uploads'
  | 'body-measurements';

// UI Component types
export interface FormStepProps {
  data: Partial<CompleteUserData>;
  updateData: (updates: Partial<CompleteUserData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export interface ProgressData {
  currentStep: number;
  totalSteps: number;
  completedSteps: FormStep[];
  currentFormStep: FormStep;
}

// Dashboard types
export interface DashboardStats {
  totalUsers: number;
  activeWorkouts: number;
  completedGoals: number;
  averageProgress: number;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  duration: number; // in weeks
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: number; // seconds
  instructions: string;
  muscle_groups: string[];
  equipment: string[];
}

// Nutrition types
export interface NutritionPlan {
  id: string;
  name: string;
  daily_calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  meals: Meal[];
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
  calories: number;
}