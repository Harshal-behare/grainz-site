import React from 'react';
import { FormStepProps } from '@/types/fitness';
import { cn } from '@/lib/utils';

const programmes = [
  {
    id: 'lite',
    name: 'Lite Programme',
    emoji: '🌱',
    features: [
      'Basic workout plan',
      'Nutrition guidelines',
      'Weekly check-ins',
      'Community support',
    ],
    description: 'Perfect for beginners starting their fitness journey',
    price: '$49/month',
  },
  {
    id: 'pro',
    name: 'Pro Programme',
    emoji: '🚀',
    features: [
      'Customized workout plan',
      'Personalized meal plans',
      'Daily progress tracking',
      'Priority support',
      'Supplement guidance',
    ],
    description: 'For serious fitness enthusiasts ready to level up',
    price: '$99/month',
    recommended: true,
  },
  {
    id: 'one_on_one',
    name: '1-on-1 Coaching',
    emoji: '👨‍🏫',
    features: [
      'Personal fitness coach',
      'Custom everything',
      'Daily accountability',
      'Video calls',
      'Form checks',
      'Unlimited support',
    ],
    description: 'Premium coaching for maximum results',
    price: '$299/month',
  },
];

const ProgrammeSelectionStep: React.FC<FormStepProps> = ({ data, updateData }) => {
  const handleProgrammeSelect = (programmeId: string) => {
    updateData({
      additional: {
        ...data.additional,
        programme_chosen: programmeId,
      },
    });
  };

  const selectedProgramme = data.additional?.programme_chosen;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-semibold mb-2">Choose Your Programme</h3>
        <p className="text-foreground-muted">Select the programme that best fits your goals and commitment level</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {programmes.map((programme) => (
          <div
            key={programme.id}
            onClick={() => handleProgrammeSelect(programme.id)}
            className={cn(
              'relative card-hover cursor-pointer p-6',
              'transition-all duration-200',
              'border-2',
              selectedProgramme === programme.id
                ? 'border-primary bg-primary/5'
                : 'border-transparent',
              programme.recommended && 'ring-2 ring-accent/50'
            )}
          >
            {programme.recommended && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                  RECOMMENDED
                </span>
              </div>
            )}

            <div className="text-center mb-4">
              <div className="text-4xl mb-3">{programme.emoji}</div>
              <h4 className="text-lg font-semibold">{programme.name}</h4>
              <p className="text-2xl font-bold text-primary mt-2">{programme.price}</p>
            </div>

            <p className="text-sm text-foreground-muted mb-4">{programme.description}</p>

            <ul className="space-y-2">
              {programme.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {selectedProgramme === programme.id && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-background-tertiary rounded-lg p-4">
        <p className="text-sm text-foreground-muted">
          💡 <strong>Not sure?</strong> Start with Lite and upgrade anytime. All programmes 
          include a 30-day money-back guarantee if you're not satisfied.
        </p>
      </div>
    </div>
  );
};

export default ProgrammeSelectionStep;
