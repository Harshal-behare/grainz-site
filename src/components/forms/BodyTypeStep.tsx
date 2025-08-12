import React from 'react';
import { FormStepProps } from '@/types/fitness';
import { cn } from '@/lib/utils';

const bodyTypes = [
  {
    id: 'slim',
    title: 'Slim',
    description: 'Naturally thin build, difficulty gaining weight',
    image: '👤', // Placeholder - you can replace with actual images
  },
  {
    id: 'average',
    title: 'Average',
    description: 'Medium build, can gain or lose weight with effort',
    image: '🧍',
  },
  {
    id: 'heavy',
    title: 'Heavy',
    description: 'Larger build, tends to gain weight easily',
    image: '🧍‍♂️',
  },
];

const BodyTypeStep: React.FC<FormStepProps> = ({ data, updateData }) => {
  const currentSelection = data.goals?.body_type;

  const handleSelect = (bodyType: 'slim' | 'average' | 'heavy') => {
    updateData({
      goals: {
        ...data.goals,
        body_type: bodyType,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-foreground-muted">
          Help us understand your starting point to create the perfect plan for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bodyTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => handleSelect(type.id as any)}
            className={cn(
              'card-hover cursor-pointer text-center p-6',
              'transition-all duration-200',
              currentSelection === type.id && 'ring-2 ring-primary bg-primary/5'
            )}
          >
            <div className="text-4xl mb-4">{type.image}</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {type.title}
            </h3>
            <p className="text-sm text-foreground-muted">
              {type.description}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center text-sm text-foreground-muted">
        <p>💡 Don&apos;t worry if you&apos;re not sure - we can always adjust your plan later!</p>
      </div>
    </div>
  );
};

export default BodyTypeStep;