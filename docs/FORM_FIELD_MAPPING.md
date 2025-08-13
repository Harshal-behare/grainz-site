# Comprehensive Form Field Mapping Documentation

## Overview
This document provides a complete mapping of all 43 required form fields for the fitness consultation form. Each field is mapped to its appropriate database column and includes type information, validation rules, and UI considerations.

## Complete Field List (43 Fields)

### 1. Personal Information (4 fields)
| Field Name | Type | Database Column | Required | Description |
|------------|------|-----------------|----------|-------------|
| user_name | string | user_name | Yes | Full name of the user |
| email | string | email | Yes | Email address for communication |
| phone_number | string | phone_number | Yes | Contact phone number |
| profession | string | profession | Yes | Current occupation/profession |

### 2. Demographics (4 fields)
| Field Name | Type | Database Column | Required | Description |
|------------|------|-----------------|----------|-------------|
| age_bracket | enum | age_bracket | Yes | Age range: 18_29, 30_39, 40_49, 50_plus |
| height_cm | number | height_cm | Yes | Height in centimeters |
| current_weight_kg | number | current_weight_kg | Yes | Current body weight in kg |
| target_weight_kg | number | target_weight_kg | Yes | Target/goal weight in kg |

### 3. Fitness Goals (5 fields)
| Field Name | Type | Database Column | Required | Description |
|------------|------|-----------------|----------|-------------|
| fitness_goal_6_months | string | fitness_goal_6_months | Yes | Short-term fitness goal (6 months) |
| fitness_goal_long_term | string | fitness_goal_long_term | Yes | Long-term fitness goal |
| primary_goal | enum | primary_goal | Yes | Main goal: lose_weight, gain_muscle, get_shredded |
| ideal_physique | enum | ideal_physique | Yes | Target body type: athlete, hero, bodybuilder |
| target_body_areas | string | target_body_areas | Yes | Specific body areas to focus on |

### 4. Health Information (5 fields)
| Field Name | Type | Database Column | Required | Description |
|------------|------|-----------------|----------|-------------|
| medical_issues_allergies | string | medical_issues_allergies | Yes | Medical conditions and food allergies |
| alcohol_smoke_frequency | string | alcohol_smoke_frequency | Yes | Frequency of alcohol consumption and smoking |
| resting_heart_rate | number | resting_heart_rate | No | Resting heart rate in BPM |
| body_fat_percent_band | string | body_fat_percent_band | No | Estimated body fat percentage range |
| water_intake | enum | water_intake | Yes | Daily water consumption level |

### 5. Diet Preferences (10 fields)
| Field Name | Type | Database Column | Required | Description |
|------------|------|-----------------|----------|-------------|
| current_diet_timetable | string | current_diet_timetable | Yes | Current eating schedule and habits |
| diet_type | enum | diet_type | Yes | Type of diet: vegetarian, vegan, keto, mediterranean, none |
| diet_habits | string[] | diet_habits (JSONB) | Yes | Array of dietary habits |
| high_calorie_favourite_foods | string[] | high_calorie_favourite_foods (JSONB) | Yes | List of favorite high-calorie foods |
| other_high_calorie_sweets | string | other_high_calorie_sweets | No | Additional high-calorie sweets not listed |
| preferred_included_foods | string[] | preferred_included_foods (JSONB) | Yes | Foods to include in meal plan |
| foods_despised | string[] | foods_despised (JSONB) | Yes | Foods to avoid in meal plan |
| favourite_fruits | string[] | favourite_fruits (JSONB) | Yes | Preferred fruits |
| favourite_vegetables | string[] | favourite_vegetables (JSONB) | Yes | Preferred vegetables |
| sugar_intake_frequency | enum | sugar_intake_frequency | Yes | Frequency of sugar consumption: low, mid, high |
| mealprep_time_preference | enum | mealprep_time_preference | Yes | Time available for meal prep |

### 6. Workout Information (11 fields)
| Field Name | Type | Database Column | Required | Description |
|------------|------|-----------------|----------|-------------|
| current_workout_plan | string | current_workout_plan | Yes | Current exercise routine |
| daily_schedule | string | daily_schedule | Yes | Daily schedule with timings |
| preferred_workout_time | string | preferred_workout_time | Yes | Preferred time for workouts |
| has_personal_trainer | boolean | has_personal_trainer | Yes | Currently working with a trainer |
| workout_location | enum | workout_location | Yes | Primary workout location: home, gym |
| equipment_access_level | enum | equipment_access_level | Yes | Access to equipment: none, basic, full |
| training_frequency_recent | enum | training_frequency_recent | Yes | Recent training frequency |
| session_duration_preference | enum | session_duration_preference | Yes | Preferred workout duration |
| fitness_level | number | fitness_level | Yes | Self-assessed fitness level (1-10) |
| pushups_max_reps_band | enum | pushups_max_reps_band | Yes | Push-up capacity range |
| pullups_max_reps_band | enum | pullups_max_reps_band | Yes | Pull-up capacity range |

### 7. Program Details (2 fields)
| Field Name | Type | Database Column | Required | Description |
|------------|------|-----------------|----------|-------------|
| programme_start_date | string | programme_start_date | Yes | Program start date (ISO format) |
| programme_chosen | string | programme_chosen | Yes | Selected fitness program |

### 8. File Uploads (3 fields)
| Field Name | Type | Database Column | Required | Description |
|------------|------|-----------------|----------|-------------|
| blood_report_url | string | blood_report_url | No | URL to uploaded blood report |
| body_composition_report_url | string | body_composition_report_url | No | URL to body composition analysis |
| aspiration_image_url | string | aspiration_image_url | No | URL to aspiration/goal body image |

### 9. Body Measurements (9 fields - separate table)
| Field Name | Type | Database Table.Column | Required | Description |
|------------|------|------------------------|----------|-------------|
| forearm_in | number | body_measurements.forearm_in | No | Forearm circumference in inches |
| bicep_in | number | body_measurements.bicep_in | No | Bicep circumference in inches |
| shoulder_in | number | body_measurements.shoulder_in | No | Shoulder circumference in inches |
| chest_in | number | body_measurements.chest_in | No | Chest circumference in inches |
| upper_waist_in | number | body_measurements.upper_waist_in | No | Upper waist circumference in inches |
| lower_waist_in | number | body_measurements.lower_waist_in | No | Lower waist circumference in inches |
| belly_button_circumference_in | number | body_measurements.belly_button_circumference_in | No | Belly button level circumference in inches |
| buttocks_in | number | body_measurements.buttocks_in | No | Buttocks circumference in inches |
| thighs_in | number | body_measurements.thighs_in | No | Thigh circumference in inches |

### 10. Body Images (4 fields - separate table)
| Field Name | Type | Database Table.Column | Required | Description |
|------------|------|------------------------|----------|-------------|
| front_image | string | full_body_images.file_url (view_type='front') | No | Front view body image URL |
| rear_image | string | full_body_images.file_url (view_type='rear') | No | Rear view body image URL |
| side_left_image | string | full_body_images.file_url (view_type='side_left') | No | Left side view body image URL |
| side_right_image | string | full_body_images.file_url (view_type='side_right') | No | Right side view body image URL |

## Total Field Count: 43 Fields
- Main form fields: 43
- Body measurements: 9 (stored in separate table)
- Body images: 4 (stored in separate table)

## Database Table Structure

### Primary Table: `form_submissions`
- Contains 43 main form fields
- Uses JSONB for array fields (diet_habits, favourite_fruits, etc.)
- Auto-generates submission_id on insert

### Related Tables:
1. **body_measurements**: Links via submission_id, stores 9 measurement fields
2. **full_body_images**: Links via submission_id, stores image URLs with view_type

## Multi-Step Form Flow

### Recommended Step Grouping:
1. **Welcome & Contact** (4 fields)
   - user_name, email, phone_number, profession

2. **Personal Details** (4 fields)  
   - age_bracket, height_cm, current_weight_kg, target_weight_kg

3. **Fitness Goals** (5 fields)
   - primary_goal, ideal_physique, fitness_goal_6_months, fitness_goal_long_term, target_body_areas

4. **Health Assessment** (5 fields)
   - medical_issues_allergies, alcohol_smoke_frequency, resting_heart_rate, body_fat_percent_band, water_intake

5. **Diet Habits** (5 fields)
   - current_diet_timetable, diet_type, diet_habits, sugar_intake_frequency, mealprep_time_preference

6. **Food Preferences** (6 fields)
   - high_calorie_favourite_foods, other_high_calorie_sweets, preferred_included_foods, foods_despised, favourite_fruits, favourite_vegetables

7. **Workout Experience** (6 fields)
   - current_workout_plan, daily_schedule, preferred_workout_time, has_personal_trainer, workout_location, equipment_access_level

8. **Fitness Level** (5 fields)
   - training_frequency_recent, session_duration_preference, fitness_level, pushups_max_reps_band, pullups_max_reps_band

9. **Program Setup** (2 fields)
   - programme_start_date, programme_chosen

10. **Medical Documents** (3 fields)
    - blood_report_url, body_composition_report_url, aspiration_image_url

11. **Body Measurements** (9 fields)
    - All measurement fields

12. **Progress Photos** (4 fields)
    - All body image fields

## Validation Rules

### Required Fields (38 total):
- All personal info fields
- All demographic fields  
- All fitness goal fields
- Key health fields (medical_issues_allergies, alcohol_smoke_frequency, water_intake)
- All diet preference fields except other_high_calorie_sweets
- All workout fields
- Both program detail fields

### Optional Fields (5 in main form):
- resting_heart_rate
- body_fat_percent_band
- other_high_calorie_sweets
- All file upload URLs
- All measurements and images

### Field-Specific Validations:
- **email**: Must be valid email format
- **phone_number**: Must be valid phone format
- **height_cm**: Must be between 100-250
- **weight fields**: Must be between 30-300 kg
- **fitness_level**: Must be between 1-10
- **Array fields**: Must be valid JSON arrays
- **Date fields**: Must be valid ISO date strings
- **URL fields**: Must be valid URL format

## Notes for Implementation

1. **Data Persistence**: Store partial form data in localStorage to prevent data loss
2. **Progress Tracking**: Show progress bar with step indicators
3. **Validation**: Validate on step change, not just on final submit
4. **File Uploads**: Handle file uploads asynchronously with progress indicators
5. **Error Handling**: Provide clear error messages for validation failures
6. **Accessibility**: Ensure all form fields have proper labels and ARIA attributes
7. **Mobile Responsiveness**: Optimize form layout for mobile devices
8. **Data Security**: Encrypt sensitive health information before storage
