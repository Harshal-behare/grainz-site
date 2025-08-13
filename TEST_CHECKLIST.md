# Fitness Form End-to-End Testing Checklist

## Pre-Test Setup
1. Clear browser cache and localStorage
2. Open http://localhost:3001/questionnaire
3. Open browser Developer Console to monitor for errors
4. Have test data ready (see below)

## Test Flow - All 43 Fields

### Step 1: Body Type
- [ ] Select body type (slim/average/heavy)
- [ ] Select ideal physique (athlete/hero/bodybuilder)
- [ ] Body fat percentage should be captured

### Step 2: Primary Goal  
- [ ] Select primary goal (lose weight/gain muscle/get shredded)

### Step 3: Personal Details
- [ ] Enter display name
- [ ] Select age bracket (18-29, 30-39, 40-49, 50+)
- [ ] Enter height (cm or ft/in)
- [ ] Enter current weight
- [ ] Enter target weight
- [ ] Enter daily schedule (this saves to workout.daily_schedule)

### Step 4: Contact Information
- [ ] Enter full name (user_name)
- [ ] Enter email address
- [ ] Enter phone number (10-15 digits)
- [ ] Enter profession

### Step 5: Diet Preferences
- [ ] Select diet type (vegetarian/vegan/keto/mediterranean/none)
- [ ] Select sugar intake frequency (low/mid/high)
- [ ] Select diet habits (multiple checkboxes)
- [ ] Enter meal prep time preference

### Step 6: Workout Preferences
- [ ] Select workout location (home/gym)
- [ ] Select equipment access level
- [ ] Select preferred workout time
- [ ] Toggle personal trainer (yes/no)

### Step 7: Current Routine
- [ ] Enter current diet timetable (text area)
- [ ] Enter current workout plan (text area)

### Step 8: Food Preferences
- [ ] Enter high calorie favorite foods (comma separated)
- [ ] Enter other high calorie sweets
- [ ] Enter preferred foods to include
- [ ] Enter foods despised
- [ ] Enter favorite fruits
- [ ] Enter favorite vegetables

### Step 9: Fitness Goals
- [ ] Enter 6-month fitness goal
- [ ] Enter long-term fitness goal
- [ ] Select target body areas (multiple)

### Step 10: Schedule
- [ ] Daily schedule (already filled from step 3)
- [ ] Select programme start date

### Step 11: Health & Medical Info
- [ ] Enter medical issues/allergies
- [ ] Enter resting heart rate
- [ ] Select alcohol/smoke frequency

### Step 12: Programme Selection
- [ ] Select programme (Lite/Pro/1-on-1)

### Step 13: File Uploads (Optional)
- [ ] Upload blood report (PDF/image, max 10MB)
- [ ] Upload body composition report
- [ ] Upload aspiration image
- [ ] Verify upload progress indicators
- [ ] Verify file type validation

### Step 14: Body Measurements (Optional)
- [ ] Enter all measurements in inches
- [ ] Can skip if no measuring tape

### Step 15: Full Body Images (Optional)
- [ ] Upload up to 5 images
- [ ] Select view type for each image
- [ ] Verify upload progress

## Submission Testing
- [ ] Click "Complete Assessment"
- [ ] Confirm submission in dialog
- [ ] Check console for submission data (should show all 43 fields)
- [ ] Verify success message appears
- [ ] Verify redirect to success page

## Database Verification (Supabase)
- [ ] Check form_submissions table for new entry
- [ ] Verify all 43 fields are populated correctly
- [ ] Check body_measurements table if measurements were entered
- [ ] Check full_body_images table if images were uploaded
- [ ] Verify file URLs are valid and accessible

## Admin Dashboard Testing
1. Go to http://localhost:3001/admin
2. Login with admin credentials
3. Check submissions list:
   - [ ] New submission appears
   - [ ] Search functionality works
   - [ ] Click "View" to see details

4. In detailed view, verify:
   - [ ] All personal information displays
   - [ ] All fitness goals display
   - [ ] All health information displays
   - [ ] All diet preferences display
   - [ ] Body measurements show (if entered)
   - [ ] Images display inline (not as links)
   - [ ] File documents show as clickable items

5. Test CSV Export:
   - [ ] Click "Export CSV"
   - [ ] Open downloaded file
   - [ ] Verify all 43 columns present
   - [ ] Verify data matches submission
   - [ ] Check image URLs are included

## Mobile Testing
- [ ] Test form on mobile device/responsive view
- [ ] Verify all inputs are accessible
- [ ] Test image uploads from mobile
- [ ] Verify navigation works smoothly

## Error Handling Testing
- [ ] Try to proceed without filling required fields
- [ ] Test invalid email format
- [ ] Test invalid phone number
- [ ] Test file upload with >10MB file
- [ ] Test file upload with wrong type
- [ ] Test network disconnection during submission

## Data Persistence Testing
- [ ] Fill partial form and refresh page
- [ ] Verify data is restored from localStorage
- [ ] Verify completed steps are tracked
- [ ] Clear localStorage and verify fresh start

## Sample Test Data

```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "phone": "+1234567890",
  "profession": "Software Engineer",
  "age": "30-39",
  "height": 180,
  "currentWeight": 85,
  "targetWeight": 75,
  "dailySchedule": "Wake 6am, work 9-5, gym 6pm, sleep 11pm",
  "6monthGoal": "Lose 10kg and build lean muscle",
  "longTermGoal": "Maintain healthy lifestyle and run marathon"
}
```

## Known Issues to Watch For
1. Validation should now accept age brackets with underscores (18_29, etc.)
2. Height/weight cannot be 0
3. Daily schedule saves to workout.daily_schedule not personal.daily_schedule
4. Programme start date must be today or future

## Success Criteria
- [ ] All 43 fields successfully saved to database
- [ ] No console errors during form completion
- [ ] File uploads work correctly
- [ ] Admin dashboard displays all data properly
- [ ] CSV export contains complete data
- [ ] Mobile experience is smooth

## Post-Test Cleanup
1. Note any issues found
2. Document steps to reproduce bugs
3. Save submission ID for reference
4. Clear test data if needed
