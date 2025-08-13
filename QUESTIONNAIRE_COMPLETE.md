# Fitness Assessment Questionnaire - Complete List

## Total Fields: 42 (after removing programme selection)

### Step 1: Body Type & Physique
1. **What's your current body type?**
   - Options: Slim / Average / Heavy

2. **What's your ideal physique?**
   - Options: Athlete / Hero / Bodybuilder

3. **What's your current body fat percentage?** (Stored but not explicitly asked)
   - Auto-calculated based on body type

### Step 2: Primary Fitness Goal
4. **What's your primary fitness goal?**
   - Options: Lose Weight / Gain Muscle / Get Shredded

### Step 3: Personal Details
5. **What should we call you?** (Display Name)
   - Text input

6. **What's your age range?**
   - Options: 18-29 / 30-39 / 40-49 / 50+

7. **What's your height?**
   - Number input (cm or ft/in)

8. **What's your current weight?**
   - Number input (kg or lb)

9. **What's your target weight?**
   - Number input (kg or lb)

10. **What's your typical daily schedule?**
    - Text area (e.g., Wake 6am, work 9-5, gym 6pm, sleep 11pm)

### Step 4: Contact Information
11. **Your Name** (Full name for records)
    - Text input

12. **Email Address**
    - Email input

13. **Phone Number**
    - Phone input (10-15 digits)

14. **Profession**
    - Text input

### Step 5: Diet Preferences
15. **Do you follow any specific diet?**
    - Options: No Restrictions / Vegetarian / Vegan / Keto / Mediterranean

16. **How often do you consume sugary foods?**
    - Options: Low / Moderate / High

17. **Which of these describe your eating habits?**
    - Multiple checkboxes: Meal prep / Eat out frequently / Late night eating / Emotional eating / Fast eater / Skip meals / Drink plenty of water / Snack between meals

18. **How much time can you spend on meal prep?** (Asked in DietPreferencesStep)
    - Options: Less than 30 min / 30-60 min / More than 60 min / Prefer to order

### Step 6: Workout Preferences
19. **Where do you prefer to work out?**
    - Options: Home / Gym

20. **What equipment do you have access to?**
    - Options: No Equipment / Basic Equipment / Full Gym Access

21. **When do you prefer to work out?**
    - Options: Early Morning / Morning / Lunch Time / Afternoon / Evening / Night

22. **Do you work with a personal trainer?**
    - Toggle: Yes / No

23. **How often do you currently train?** (Stored but not shown in UI)
    - Auto-set based on other inputs

24. **How long can you workout per session?** (Stored but not shown in UI)
    - Auto-set based on other inputs

25. **What's your fitness level (1-10)?** (Stored but not shown in UI)
    - Auto-calculated

26. **How many push-ups can you do?** (Stored but not shown in UI)
    - Auto-calculated

27. **How many pull-ups can you do?** (Stored but not shown in UI)
    - Auto-calculated

### Step 7: Current Routine
28. **What's your current diet routine?**
    - Text area (describe typical daily meals)

29. **What's your current workout routine?**
    - Text area (describe current workout plan)

### Step 8: Food Preferences
30. **What are your favorite high-calorie foods?**
    - Text input (comma separated)

31. **Any other sweets or treats you enjoy?**
    - Text area

32. **What healthy foods do you enjoy?**
    - Text input (comma separated)

33. **What foods do you absolutely dislike?**
    - Text input (comma separated)

34. **What are your favorite fruits?**
    - Text input (comma separated)

35. **What are your favorite vegetables?**
    - Text input (comma separated)

### Step 9: Fitness Goals
36. **What's your 6-month fitness goal?**
    - Text area

37. **What's your long-term fitness vision?**
    - Text area

38. **Which areas do you want to focus on?**
    - Multiple selection: Abs / Arms / Chest / Shoulders / Back / Legs / Glutes / Full Body

### Step 10: Schedule
39. **When would you like to start?** (Programme Start Date)
    - Date picker

### Step 11: Health & Medical Information
40. **Do you have any medical conditions or allergies?**
    - Text area

41. **What's your resting heart rate?**
    - Number input (BPM)

42. **How often do you drink alcohol or smoke?**
    - Options: Never / Rarely / 1-2 times per week / 3+ times per week / Daily

### Step 12: File Uploads (Optional)
- Blood Report Upload
- Body Composition Report Upload
- Aspiration Image Upload

### Step 13: Body Measurements (Optional)
- All measurements in inches: Forearm, Bicep, Shoulder, Chest, Upper Waist, Lower Waist, Belly Button, Buttocks, Thighs

### Step 14: Full Body Progress Photos (Optional)
- Up to 5 images with view type selection

---

## Fields Removed
- **Programme Selection** - Removed as requested

## Hidden/Auto-calculated Fields
Some fields are stored in the database but not explicitly asked:
- Body fat percentage (derived from body type)
- Training frequency (derived from current routine)
- Session duration preference (auto-set)
- Fitness level (auto-calculated)
- Push-ups/Pull-ups capacity (auto-calculated)
- Water intake (captured in diet habits)

## Notes on Duplicate Questions
- **Daily Schedule** is only asked once in Personal Details (Step 3)
- All other questions are unique and asked only once
- Some fields are auto-calculated to reduce form length while maintaining data completeness
