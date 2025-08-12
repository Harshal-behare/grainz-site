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

      {/* Current Diet */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Tell us about your current diet</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Current diet schedule (brief overview)
            </label>
            <textarea
              className="w-full h-24 px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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