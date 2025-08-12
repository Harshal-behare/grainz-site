import React from 'react';
import { FormStepProps } from '@/types/fitness';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp, Zap } from 'lucide-react';

const goals = [
  {
    id: 'lose_weight',
    title: 'Lose Weight',
    description: 'Burn fat and achieve a leaner physique',
    icon: TrendingDown,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    id: 'gain_muscle',
    title: 'Build Muscle',
    description: 'Increase muscle mass and strength',
    icon: TrendingUp,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  {
    id: 'get_shredded',
    title: 'Get Shredded',
    description: 'Achieve a defined, athletic physique',
    icon: Zap,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
  },
];

const PrimaryGoalStep: React.FC<FormStepProps> = ({ data, updateData }) => {
  const currentSelection = data.goals?.primary_goal;

  const handleSelect = (goal: 'lose_weight' | 'gain_muscle' | 'get_shredded') => {
    updateData({
      goals: {
        ...data.goals,
        primary_goal: goal,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-foreground-muted">
          What would you like to achieve? We&apos;ll customize your entire program around this goal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const isSelected = currentSelection === goal.id;
          
          return (
            <div
              key={goal.id}
              onClick={() => handleSelect(goal.id as any)}
              className={cn(
                'card-hover cursor-pointer text-center p-6',
                'transition-all duration-200',
                isSelected && 'ring-2 ring-primary bg-primary/5'
              )}
            >
              <div className={cn(
                'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4',
                goal.bgColor
              )}>
                <Icon size={24} className={goal.color} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {goal.title}
              </h3>
              <p className="text-sm text-foreground-muted">
                {goal.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="bg-background-tertiary rounded-lg p-4 mt-6">
        <h4 className="text-sm font-medium text-foreground mb-2">
          💡 Not sure which one to pick?
        </h4>
        <ul className="text-sm text-foreground-muted space-y-1">
          <li>• Choose <strong>Lose Weight</strong> if you want to reduce body fat</li>
          <li>• Choose <strong>Build Muscle</strong> if you want to get bigger and stronger</li>
          <li>• Choose <strong>Get Shredded</strong> if you want maximum definition</li>
        </ul>
      </div>
    </div>
  );
};

export default PrimaryGoalStep;