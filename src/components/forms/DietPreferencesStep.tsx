import React from 'react';
import { FormStepProps } from '@/types/fitness';
import { cn } from '@/lib/utils';
import { Leaf, Fish, Carrot, Wheat, Ban } from 'lucide-react';

const dietTypes = [
  {
    id: 'none',
    title: 'No Restrictions',
    description: 'I eat everything',
    icon: Wheat,
    color: 'text-gray-400',
  },
  {
    id: 'vegetarian',
    title: 'Vegetarian',
    description: 'No meat, but dairy and eggs are OK',
    icon: Leaf,
    color: 'text-green-400',
  },
  {
    id: 'vegan',
    title: 'Vegan',
    description: 'Plant-based only',
    icon: Carrot,
    color: 'text-orange-400',
  },
  {
    id: 'keto',
    title: 'Keto',
    description: 'Low carb, high fat',
    icon: Fish,
    color: 'text-blue-400',
  },
  {
    id: 'mediterranean',
    title: 'Mediterranean',
    description: 'Fish, olive oil, whole grains',
    icon: Fish,
    color: 'text-cyan-400',
  },
];

const sugarIntake = [
  { id: 'low', label: 'Low', description: 'Rarely eat sugary foods', emoji: '🥗' },
  { id: 'mid', label: 'Moderate', description: 'Occasional treats', emoji: '🍎' },
  { id: 'high', label: 'High', description: 'Love my sweets!', emoji: '🍰' },
];

const dietHabits = [
  { id: 'meal_prep', label: 'I meal prep regularly', emoji: '🍱' },
  { id: 'eat_out', label: 'I eat out frequently', emoji: '🍽️' },
  { id: 'late_night', label: 'I tend to eat late at night', emoji: '🌙' },
  { id: 'emotional_eating', label: 'I sometimes eat when stressed', emoji: '💔' },
  { id: 'fast_eater', label: 'I eat quickly', emoji: '⏱️' },
  { id: 'skip_meals', label: 'I sometimes skip meals', emoji: '⏭️' },
  { id: 'water_conscious', label: 'I drink plenty of water', emoji: '💧' },
  { id: 'snacker', label: 'I snack between meals', emoji: '🥨' },
];

const DietPreferencesStep: React.FC<FormStepProps> = ({ data, updateData }) => {
  const dietData = data.diet || {};

  const handleDietTypeSelect = (dietType: string) => {
    updateData({
      diet: {
        ...dietData,
        diet_type: dietType as any,
      },
    });
  };

  const handleSugarIntakeSelect = (intake: string) => {
    updateData({
      diet: {
        ...dietData,
        sugar_intake_frequency: intake as any,
      },
    });
  };

  const handleTextInput = (field: string, value: string | string[]) => {
    updateData({
      diet: {
        ...dietData,
        [field]: value,
      },
    });
  };

  const handleDietHabitToggle = (habitId: string) => {
    const currentHabits = dietData.diet_habits || [];
    const updatedHabits = currentHabits.includes(habitId)
      ? currentHabits.filter(h => h !== habitId)
      : [...currentHabits, habitId];
    
    updateData({
      diet: {
        ...dietData,
        diet_habits: updatedHabits,
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Diet Type */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Do you follow any specific diet?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {dietTypes.map((diet) => {
            const Icon = diet.icon;
            const isSelected = dietData.diet_type === diet.id;
            
            return (
              <div
                key={diet.id}
                onClick={() => handleDietTypeSelect(diet.id)}
                className={cn(
                  'card-hover cursor-pointer p-4',
                  'transition-all duration-200',
                  isSelected && 'ring-2 ring-primary bg-primary/5'
                )}
              >
                <div className="flex items-center space-x-3">
                  <Icon size={20} className={diet.color} />
                  <div>
                    <div className="font-medium text-foreground">{diet.title}</div>
                    <div className="text-xs text-foreground-muted">{diet.description}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sugar Intake */}
      <div>
        <h3 className="text-lg font-semibold mb-4">How often do you consume sugary foods?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {sugarIntake.map((level) => {
            const isSelected = dietData.sugar_intake_frequency === level.id;
            
            return (
              <div
                key={level.id}
                onClick={() => handleSugarIntakeSelect(level.id)}
                className={cn(
                  'card-hover cursor-pointer text-center p-4',
                  'transition-all duration-200',
                  isSelected && 'ring-2 ring-primary bg-primary/5'
                )}
              >
                <div className="text-2xl mb-2">{level.emoji}</div>
                <div className="font-medium text-foreground mb-1">{level.label}</div>
                <div className="text-xs text-foreground-muted">{level.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Diet Habits */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Which of these describe your eating habits?</h3>
        <p className="text-sm text-foreground-muted mb-4">Select all that apply</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dietHabits.map((habit) => {
            const isSelected = dietData.diet_habits?.includes(habit.id) || false;
            
            return (
              <div
                key={habit.id}
                onClick={() => handleDietHabitToggle(habit.id)}
                className={cn(
                  'card-hover cursor-pointer p-3',
                  'transition-all duration-200 flex items-center space-x-3',
                  isSelected && 'ring-2 ring-primary bg-primary/5'
                )}
              >
                <div className="text-xl">{habit.emoji}</div>
                <div className="flex-1 text-sm font-medium text-foreground">{habit.label}</div>
                <div className={cn(
                  'w-5 h-5 rounded border-2 flex items-center justify-center',
                  isSelected
                    ? 'bg-primary border-primary'
                    : 'bg-background border-border'
                )}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Diet */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Tell us about your current diet</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Current diet schedule (brief overview)
            </label>
            <textarea
              className="w-full h-24 px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="e.g., 3 meals a day, intermittent fasting 16:8, etc."
              value={dietData.current_diet_timetable || ''}
              onChange={(e) => handleTextInput('current_diet_timetable', e.target.value)}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Foods you absolutely despise
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., Brussels sprouts, liver, mushrooms"
              value={dietData.foods_despised?.join(', ') || ''}
              onChange={(e) => handleTextInput('foods_despised', e.target.value.split(', ').filter(Boolean))}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Favorite foods you'd like to include
            </label>
            <textarea
              className="w-full h-24 px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="e.g., Chicken, avocado, quinoa, berries, Greek yogurt"
              value={dietData.preferred_included_foods?.join(', ') || ''}
              onChange={(e) => handleTextInput('preferred_included_foods', e.target.value.split(', ').filter(Boolean))}
            />
          </div>

        </div>
      </div>

      <div className="bg-background-tertiary rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-2">
          💡 Why do we ask about your diet?
        </h4>
        <p className="text-sm text-foreground-muted">
          Understanding your dietary preferences and restrictions helps us create a nutrition plan 
          that you&apos;ll actually enjoy and stick to. No one-size-fits-all approaches here!
        </p>
      </div>
    </div>
  );
};

export default DietPreferencesStep;