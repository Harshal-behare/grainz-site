-- Migration: Add missing columns to form_submissions table
-- This migration adds all missing fields identified in the comprehensive form mapping

-- Add demographic fields
ALTER TABLE public.form_submissions 
ADD COLUMN IF NOT EXISTS age_bracket VARCHAR(20),
ADD COLUMN IF NOT EXISTS height_cm NUMERIC,
ADD COLUMN IF NOT EXISTS current_weight_kg NUMERIC,
ADD COLUMN IF NOT EXISTS target_weight_kg NUMERIC;

-- Add fitness goal fields
ALTER TABLE public.form_submissions
ADD COLUMN IF NOT EXISTS primary_goal VARCHAR(50),
ADD COLUMN IF NOT EXISTS ideal_physique VARCHAR(50);

-- Add health and lifestyle fields
ALTER TABLE public.form_submissions
ADD COLUMN IF NOT EXISTS body_fat_percent_band VARCHAR(50),
ADD COLUMN IF NOT EXISTS water_intake VARCHAR(50);

-- Add diet preference fields
ALTER TABLE public.form_submissions
ADD COLUMN IF NOT EXISTS diet_type VARCHAR(50),
ADD COLUMN IF NOT EXISTS sugar_intake_frequency VARCHAR(20),
ADD COLUMN IF NOT EXISTS mealprep_time_preference VARCHAR(50);

-- Add workout preference fields
ALTER TABLE public.form_submissions
ADD COLUMN IF NOT EXISTS workout_location VARCHAR(20),
ADD COLUMN IF NOT EXISTS equipment_access_level VARCHAR(20),
ADD COLUMN IF NOT EXISTS training_frequency_recent VARCHAR(50),
ADD COLUMN IF NOT EXISTS session_duration_preference VARCHAR(20),
ADD COLUMN IF NOT EXISTS fitness_level INTEGER CHECK (fitness_level >= 1 AND fitness_level <= 10),
ADD COLUMN IF NOT EXISTS pushups_max_reps_band VARCHAR(20),
ADD COLUMN IF NOT EXISTS pullups_max_reps_band VARCHAR(20);

-- Add constraints for enum-like fields
ALTER TABLE public.form_submissions
ADD CONSTRAINT check_age_bracket CHECK (age_bracket IN ('18_29', '30_39', '40_49', '50_plus') OR age_bracket IS NULL),
ADD CONSTRAINT check_primary_goal CHECK (primary_goal IN ('lose_weight', 'gain_muscle', 'get_shredded') OR primary_goal IS NULL),
ADD CONSTRAINT check_ideal_physique CHECK (ideal_physique IN ('athlete', 'hero', 'bodybuilder') OR ideal_physique IS NULL),
ADD CONSTRAINT check_water_intake CHECK (water_intake IN ('coffee_only', 'lt_2_glasses', '2_6_glasses', '7_10_glasses', 'gt_10_glasses') OR water_intake IS NULL),
ADD CONSTRAINT check_diet_type CHECK (diet_type IN ('vegetarian', 'vegan', 'keto', 'mediterranean', 'none') OR diet_type IS NULL),
ADD CONSTRAINT check_sugar_intake CHECK (sugar_intake_frequency IN ('low', 'mid', 'high') OR sugar_intake_frequency IS NULL),
ADD CONSTRAINT check_workout_location CHECK (workout_location IN ('home', 'gym') OR workout_location IS NULL),
ADD CONSTRAINT check_equipment_access CHECK (equipment_access_level IN ('none', 'basic', 'full') OR equipment_access_level IS NULL);

-- Add comments for documentation
COMMENT ON COLUMN public.form_submissions.age_bracket IS 'User age range: 18_29, 30_39, 40_49, 50_plus';
COMMENT ON COLUMN public.form_submissions.height_cm IS 'User height in centimeters';
COMMENT ON COLUMN public.form_submissions.current_weight_kg IS 'Current body weight in kilograms';
COMMENT ON COLUMN public.form_submissions.target_weight_kg IS 'Target/goal weight in kilograms';
COMMENT ON COLUMN public.form_submissions.primary_goal IS 'Main fitness goal: lose_weight, gain_muscle, get_shredded';
COMMENT ON COLUMN public.form_submissions.ideal_physique IS 'Target body type: athlete, hero, bodybuilder';
COMMENT ON COLUMN public.form_submissions.body_fat_percent_band IS 'Estimated body fat percentage range';
COMMENT ON COLUMN public.form_submissions.water_intake IS 'Daily water consumption level';
COMMENT ON COLUMN public.form_submissions.diet_type IS 'Type of diet followed';
COMMENT ON COLUMN public.form_submissions.sugar_intake_frequency IS 'Frequency of sugar consumption';
COMMENT ON COLUMN public.form_submissions.mealprep_time_preference IS 'Time available for meal preparation';
COMMENT ON COLUMN public.form_submissions.workout_location IS 'Primary workout location';
COMMENT ON COLUMN public.form_submissions.equipment_access_level IS 'Level of equipment access';
COMMENT ON COLUMN public.form_submissions.training_frequency_recent IS 'Recent training frequency';
COMMENT ON COLUMN public.form_submissions.session_duration_preference IS 'Preferred workout session duration';
COMMENT ON COLUMN public.form_submissions.fitness_level IS 'Self-assessed fitness level (1-10 scale)';
COMMENT ON COLUMN public.form_submissions.pushups_max_reps_band IS 'Push-up capacity range';
COMMENT ON COLUMN public.form_submissions.pullups_max_reps_band IS 'Pull-up capacity range';

-- Create indexes for commonly queried fields
CREATE INDEX IF NOT EXISTS idx_form_submissions_age_bracket ON public.form_submissions(age_bracket);
CREATE INDEX IF NOT EXISTS idx_form_submissions_primary_goal ON public.form_submissions(primary_goal);
CREATE INDEX IF NOT EXISTS idx_form_submissions_workout_location ON public.form_submissions(workout_location);
CREATE INDEX IF NOT EXISTS idx_form_submissions_programme_start_date ON public.form_submissions(programme_start_date);
