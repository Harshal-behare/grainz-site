import React from 'react';
import { FormStepProps } from '@/types/fitness';
import Input from '@/components/ui/Input';
import { cn } from '@/lib/utils';

const targetAreas = [
  { id: 'abs', label: 'Abs', emoji: '🎯' },
  { id: 'arms', label: 'Arms', emoji: '💪' },
  { id: 'chest', label: 'Chest', emoji: '🦾' },
  { id: 'shoulders', label: 'Shoulders', emoji: '🏋️' },
  { id: 'back', label: 'Back', emoji: '🔙' },
  { id: 'legs', label: 'Legs', emoji: '🦵' },
  { id: 'glutes', label: 'Glutes', emoji: '🍑' },
  { id: 'full_body', label: 'Full Body', emoji: '🏃' },
];

const FitnessGoalsStep: React.FC<FormStepProps> = ({ data, updateData }) => {
  const handleGoalChange = (type: 'fitness_goal_6_months' | 'fitness_goal_long_term', value: string) => {
    updateData({
      goals: {
        ...data.goals,
        [type]: value,
      },
    });
  };

  const handleTargetAreasChange = (areas: string) => {
    updateData({
      goals: {
        ...data.goals,
        target_body_areas: areas,
      },
    });
  };

  const toggleTargetArea = (area: string) => {
    const currentAreas = data.goals?.target_body_areas?.split(',').filter(a => a) || [];
    const index = currentAreas.indexOf(area);
    
    if (index > -1) {
      currentAreas.splice(index, 1);
    } else {
      currentAreas.push(area);
    }
    
    handleTargetAreasChange(currentAreas.join(','));
  };

  const selectedAreas = data.goals?.target_body_areas?.split(',').filter(a => a) || [];

  return (
    <div className="space-y-8">
      {/* 6-Month Goal */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What's your 6-month fitness goal?</h3>
        <textarea
          className={cn(
            'w-full min-h-[100px] p-3 rounded-lg',
            'bg-background-secondary border border-foreground-muted/20',
            'focus:outline-none focus:ring-2 focus:ring-primary/50',
            'resize-y'
          )}
          placeholder="Describe what you want to achieve in the next 6 months (e.g., lose 20 lbs, run a 5K, get visible abs)"
          value={data.goals?.fitness_goal_6_months || ''}
          onChange={(e) => handleGoalChange('fitness_goal_6_months', e.target.value)}
        />
      </div>

      {/* Long-term Goal */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What's your long-term fitness vision?</h3>
        <textarea
          className={cn(
            'w-full min-h-[100px] p-3 rounded-lg',
            'bg-background-secondary border border-foreground-muted/20',
            'focus:outline-none focus:ring-2 focus:ring-primary/50',
            'resize-y'
          )}
          placeholder="Describe your ultimate fitness goal (e.g., maintain a healthy lifestyle, compete in bodybuilding, complete an Ironman)"
          value={data.goals?.fitness_goal_long_term || ''}
          onChange={(e) => handleGoalChange('fitness_goal_long_term', e.target.value)}
        />
      </div>

      {/* Target Body Areas */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Which areas do you want to focus on?</h3>
        <p className="text-sm text-foreground-muted mb-4">Select all that apply</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {targetAreas.map((area) => (
            <div
              key={area.id}
              onClick={() => toggleTargetArea(area.id)}
              className={cn(
                'card-hover cursor-pointer text-center p-4',
                'transition-all duration-200',
                selectedAreas.includes(area.id) && 'ring-2 ring-primary bg-primary/5'
              )}
            >
              <div className="text-2xl mb-2">{area.emoji}</div>
              <div className="text-sm font-medium">{area.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-background-tertiary rounded-lg p-4">
        <p className="text-sm text-foreground-muted">
          💡 <strong>Goal Setting:</strong> Be specific with your goals. The more detailed 
          you are, the better we can tailor your program to help you achieve them.
        </p>
      </div>
    </div>
  );
};

export default FitnessGoalsStep;
