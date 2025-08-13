/**
 * Utility functions for converting between form data structures and database structures
 */

import { FullFormData } from '@/types/form-schema';
import { FormSubmission, BodyMeasurements, FullBodyImage } from '@/types/database';

/**
 * Converts the comprehensive form data to the database submission format
 */
export function convertFormToDatabase(formData: Partial<FullFormData>): {
  submission: Partial<FormSubmission>;
  measurements?: Partial<BodyMeasurements>;
  images?: Partial<FullBodyImage>[];
} {
  // Extract main submission data
  const submission: Partial<FormSubmission> = {
    // Personal Information
    user_name: formData.user_name,
    email: formData.email,
    phone_number: formData.phone_number,
    profession: formData.profession,
    
    // Demographics - store in new columns
    age_bracket: formData.age_bracket,
    height_cm: formData.height_cm,
    current_weight_kg: formData.current_weight_kg,
    target_weight_kg: formData.target_weight_kg,
    
    // Fitness Goals
    fitness_goal_6_months: formData.fitness_goal_6_months,
    fitness_goal_long_term: formData.fitness_goal_long_term,
    primary_goal: formData.primary_goal,
    ideal_physique: formData.ideal_physique,
    target_body_areas: formData.target_body_areas,
    aspiration_image_url: formData.aspiration_image_url,
    
    // Health Information
    medical_issues_allergies: formData.medical_issues_allergies,
    alcohol_smoke_frequency: formData.alcohol_smoke_frequency,
    resting_heart_rate: formData.resting_heart_rate,
    body_fat_percent_band: formData.body_fat_percent_band,
    water_intake: formData.water_intake,
    blood_report_url: formData.blood_report_url,
    body_composition_report_url: formData.body_composition_report_url,
    
    // Diet Preferences
    current_diet_timetable: formData.current_diet_timetable,
    diet_type: formData.diet_type,
    diet_habits: formData.diet_habits,
    high_calorie_favourite_foods: formData.high_calorie_favourite_foods,
    other_high_calorie_sweets: formData.other_high_calorie_sweets,
    preferred_included_foods: formData.preferred_included_foods,
    foods_despised: formData.foods_despised,
    favourite_fruits: formData.favourite_fruits,
    favourite_vegetables: formData.favourite_vegetables,
    sugar_intake_frequency: formData.sugar_intake_frequency,
    mealprep_time_preference: formData.mealprep_time_preference,
    
    // Workout Information
    current_workout_plan: formData.current_workout_plan,
    daily_schedule: formData.daily_schedule,
    preferred_workout_time: formData.preferred_workout_time,
    has_personal_trainer: formData.has_personal_trainer,
    workout_location: formData.workout_location,
    equipment_access_level: formData.equipment_access_level,
    training_frequency_recent: formData.training_frequency_recent,
    session_duration_preference: formData.session_duration_preference,
    fitness_level: formData.fitness_level,
    pushups_max_reps_band: formData.pushups_max_reps_band,
    pullups_max_reps_band: formData.pullups_max_reps_band,
    
    // Program Details
    programme_start_date: formData.programme_start_date,
    programme_chosen: formData.programme_chosen,
  };

  // Extract measurements if available
  let measurements: Partial<BodyMeasurements> | undefined;
  if (formData.measurements) {
    measurements = {
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
  }

  // Extract images if available
  let images: Partial<FullBodyImage>[] | undefined;
  if (formData.images) {
    images = [];
    if (formData.images.front) {
      images.push({
        file_url: formData.images.front,
        view_type: 'front',
      });
    }
    if (formData.images.rear) {
      images.push({
        file_url: formData.images.rear,
        view_type: 'rear',
      });
    }
    if (formData.images.side_left) {
      images.push({
        file_url: formData.images.side_left,
        view_type: 'side_left',
      });
    }
    if (formData.images.side_right) {
      images.push({
        file_url: formData.images.side_right,
        view_type: 'side_right',
      });
    }
  }

  return { submission, measurements, images };
}

/**
 * Validates that all required fields are present in the form data
 */
export function validateRequiredFields(formData: Partial<FullFormData>): {
  isValid: boolean;
  missingFields: string[];
} {
  const requiredFields: (keyof FullFormData)[] = [
    // Personal Information
    'user_name',
    'email',
    'phone_number',
    'profession',
    
    // Demographics
    'age_bracket',
    'height_cm',
    'current_weight_kg',
    'target_weight_kg',
    
    // Fitness Goals
    'fitness_goal_6_months',
    'fitness_goal_long_term',
    'primary_goal',
    'ideal_physique',
    'target_body_areas',
    
    // Health Information
    'medical_issues_allergies',
    'alcohol_smoke_frequency',
    'water_intake',
    
    // Diet Preferences
    'current_diet_timetable',
    'diet_type',
    'diet_habits',
    'high_calorie_favourite_foods',
    'preferred_included_foods',
    'foods_despised',
    'favourite_fruits',
    'favourite_vegetables',
    'sugar_intake_frequency',
    'mealprep_time_preference',
    
    // Workout Information
    'current_workout_plan',
    'daily_schedule',
    'preferred_workout_time',
    'has_personal_trainer',
    'workout_location',
    'equipment_access_level',
    'training_frequency_recent',
    'session_duration_preference',
    'fitness_level',
    'pushups_max_reps_band',
    'pullups_max_reps_band',
    
    // Program Details
    'programme_start_date',
    'programme_chosen',
  ];

  const missingFields: string[] = [];
  
  for (const field of requiredFields) {
    const value = formData[field];
    if (value === undefined || value === null || value === '') {
      missingFields.push(field);
    }
    // Special check for arrays
    if (Array.isArray(value) && value.length === 0) {
      missingFields.push(field);
    }
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
}

/**
 * Groups form fields by their step for easier processing
 */
export function getFieldsByStep(stepName: string): (keyof FullFormData)[] {
  const stepGroups: Record<string, (keyof FullFormData)[]> = {
    'Introduction': ['user_name', 'email', 'phone_number', 'profession'],
    'PersonalDetails': ['age_bracket', 'height_cm', 'current_weight_kg', 'target_weight_kg'],
    'PrimaryGoals': ['primary_goal', 'ideal_physique', 'fitness_goal_6_months', 'fitness_goal_long_term', 'target_body_areas', 'aspiration_image_url'],
    'HealthAndLifestyle': ['medical_issues_allergies', 'alcohol_smoke_frequency', 'resting_heart_rate', 'body_fat_percent_band', 'water_intake'],
    'DietaryHabits': ['current_diet_timetable', 'diet_type', 'diet_habits', 'sugar_intake_frequency', 'mealprep_time_preference'],
    'FoodPreferences': ['high_calorie_favourite_foods', 'other_high_calorie_sweets', 'preferred_included_foods', 'foods_despised', 'favourite_fruits', 'favourite_vegetables'],
    'WorkoutExperience': ['current_workout_plan', 'daily_schedule', 'preferred_workout_time', 'has_personal_trainer', 'workout_location', 'equipment_access_level'],
    'FitnessLevel': ['training_frequency_recent', 'session_duration_preference', 'fitness_level', 'pushups_max_reps_band', 'pullups_max_reps_band'],
    'ProgramAndUploads': ['programme_start_date', 'programme_chosen', 'blood_report_url', 'body_composition_report_url'],
    'Measurements': ['measurements'],
    'Images': ['images'],
  };

  return stepGroups[stepName] || [];
}

/**
 * Calculate form completion percentage
 */
export function calculateCompletionPercentage(formData: Partial<FullFormData>): number {
  const validation = validateRequiredFields(formData);
  const totalRequired = 38; // Total required fields as per documentation
  const completed = totalRequired - validation.missingFields.length;
  return Math.round((completed / totalRequired) * 100);
}

/**
 * Get human-readable field labels
 */
export function getFieldLabel(fieldName: keyof FullFormData): string {
  const labels: Record<keyof FullFormData, string> = {
    user_name: 'Full Name',
    email: 'Email Address',
    phone_number: 'Phone Number',
    profession: 'Profession',
    age_bracket: 'Age Range',
    height_cm: 'Height (cm)',
    current_weight_kg: 'Current Weight (kg)',
    target_weight_kg: 'Target Weight (kg)',
    fitness_goal_6_months: '6-Month Fitness Goal',
    fitness_goal_long_term: 'Long-term Fitness Goal',
    primary_goal: 'Primary Goal',
    ideal_physique: 'Ideal Physique',
    target_body_areas: 'Target Body Areas',
    aspiration_image_url: 'Aspiration Body Image',
    medical_issues_allergies: 'Medical Issues & Allergies',
    alcohol_smoke_frequency: 'Alcohol & Smoking Frequency',
    resting_heart_rate: 'Resting Heart Rate',
    body_fat_percent_band: 'Body Fat Percentage',
    water_intake: 'Daily Water Intake',
    blood_report_url: 'Blood Report',
    body_composition_report_url: 'Body Composition Report',
    current_diet_timetable: 'Current Diet Schedule',
    diet_type: 'Diet Type',
    diet_habits: 'Dietary Habits',
    high_calorie_favourite_foods: 'Favorite High-Calorie Foods',
    other_high_calorie_sweets: 'Other High-Calorie Sweets',
    preferred_included_foods: 'Preferred Foods',
    foods_despised: 'Foods to Avoid',
    favourite_fruits: 'Favorite Fruits',
    favourite_vegetables: 'Favorite Vegetables',
    sugar_intake_frequency: 'Sugar Intake Frequency',
    mealprep_time_preference: 'Meal Prep Time Preference',
    current_workout_plan: 'Current Workout Plan',
    daily_schedule: 'Daily Schedule',
    preferred_workout_time: 'Preferred Workout Time',
    has_personal_trainer: 'Has Personal Trainer',
    workout_location: 'Workout Location',
    equipment_access_level: 'Equipment Access Level',
    training_frequency_recent: 'Recent Training Frequency',
    session_duration_preference: 'Session Duration Preference',
    fitness_level: 'Fitness Level',
    pushups_max_reps_band: 'Push-ups Capacity',
    pullups_max_reps_band: 'Pull-ups Capacity',
    programme_start_date: 'Program Start Date',
    programme_chosen: 'Selected Program',
    measurements: 'Body Measurements',
    images: 'Progress Photos',
  };

  return labels[fieldName] || fieldName;
}
