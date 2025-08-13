import React from 'react';
import { FormStepProps } from '@/types/fitness';
import { cn } from '@/lib/utils';

const CurrentRoutineStep: React.FC<FormStepProps> = ({ data, updateData }) => {
  const handleDietTimetableChange = (timetable: string) => {
    updateData({
      diet: {
        ...data.diet,
        current_diet_timetable: timetable,
      },
    });
  };

  const handleWorkoutPlanChange = (plan: string) => {
    updateData({
      workout: {
        ...data.workout,
        current_workout_plan: plan,
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Current Diet Timetable */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What's your current diet routine?</h3>
        <div className="space-y-4">
          <textarea
            className={cn(
              'w-full min-h-[200px] p-3 rounded-lg',
              'bg-background-secondary border border-foreground-muted/20',
              'focus:outline-none focus:ring-2 focus:ring-primary/50',
              'resize-y'
            )}
            placeholder={`Describe your typical daily meals:
              
Breakfast (8 AM): Oatmeal with fruits
Snack (10 AM): Protein shake
Lunch (1 PM): Grilled chicken with rice
Snack (4 PM): Apple with peanut butter
Dinner (7 PM): Salmon with vegetables
Late snack (9 PM): Greek yogurt`}
            value={data.diet?.current_diet_timetable || ''}
            onChange={(e) => handleDietTimetableChange(e.target.value)}
          />
          <p className="text-sm text-foreground-muted">
            Include meal times, portion sizes, and typical foods you eat
          </p>
        </div>
      </div>

      {/* Current Workout Plan */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What's your current workout routine?</h3>
        <div className="space-y-4">
          <textarea
            className={cn(
              'w-full min-h-[200px] p-3 rounded-lg',
              'bg-background-secondary border border-foreground-muted/20',
              'focus:outline-none focus:ring-2 focus:ring-primary/50',
              'resize-y'
            )}
            placeholder={`Describe your current workout plan:
              
Monday: Upper body (chest, shoulders, triceps)
Tuesday: Cardio (30 min running)
Wednesday: Lower body (legs, glutes)
Thursday: Rest
Friday: Back and biceps
Saturday: Full body workout
Sunday: Rest or light yoga`}
            value={data.workout?.current_workout_plan || ''}
            onChange={(e) => handleWorkoutPlanChange(e.target.value)}
          />
          <p className="text-sm text-foreground-muted">
            Include days, exercises, sets/reps, and duration. If you don't currently work out, write "None"
          </p>
        </div>
      </div>

      <div className="bg-background-tertiary rounded-lg p-4">
        <p className="text-sm text-foreground-muted">
          💡 <strong>Current Habits:</strong> Be honest about your current routine. 
          This helps us create a realistic plan that builds on your existing habits.
        </p>
      </div>
    </div>
  );
};

export default CurrentRoutineStep;
