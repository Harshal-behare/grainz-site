import React, { useState } from 'react';
import { FormStepProps } from '@/types/fitness';
import Input from '@/components/ui/Input';
import { cn } from '@/lib/utils';

const ageBrackets = [
  { id: '18_29', label: '18-29', emoji: '🌟' },
  { id: '30_39', label: '30-39', emoji: '💪' },
  { id: '40_49', label: '40-49', emoji: '🔥' },
  { id: '50_plus', label: '50+', emoji: '👑' },
];

const PersonalInfoStep: React.FC<FormStepProps> = ({ data, updateData }) => {
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft_in'>('cm');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');

  const currentAge = data.personal?.age_bracket;
  const currentHeight = data.personal?.height || 0;
  const currentWeight = data.personal?.weight || { current: 0, target: 0 };

  const handleAgeSelect = (age: '18_29' | '30_39' | '40_49' | '50_plus') => {
    updateData({
      personal: {
        ...data.personal,
        age_bracket: age,
      },
    });
  };

  const handleHeightChange = (value: string) => {
    const height = parseFloat(value) || 0;
    updateData({
      personal: {
        ...data.personal,
        height: height,
      },
    });
  };

  const handleWeightChange = (type: 'current' | 'target', value: string) => {
    const weight = parseFloat(value) || 0;
    updateData({
      personal: {
        ...data.personal,
        weight: {
          ...currentWeight,
          [type]: weight,
        },
      },
    });
  };

  const handleNameChange = (name: string) => {
    updateData({
      personal: {
        ...data.personal,
        profile_display_name: name,
      },
    });
  };


  return (
    <div className="space-y-8">
      {/* Name */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What should we call you?</h3>
        <Input
          label="Display Name"
          placeholder="Enter your preferred name"
          value={data.personal?.profile_display_name || ''}
          onChange={(e) => handleNameChange(e.target.value)}
        />
      </div>

      {/* Age */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What&apos;s your age range?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {ageBrackets.map((bracket) => (
            <div
              key={bracket.id}
              onClick={() => handleAgeSelect(bracket.id as any)}
              className={cn(
                'card-hover cursor-pointer text-center p-4',
                'transition-all duration-200',
                currentAge === bracket.id && 'ring-2 ring-primary bg-primary/5'
              )}
            >
              <div className="text-2xl mb-2">{bracket.emoji}</div>
              <div className="text-sm font-medium">{bracket.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Height */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What&apos;s your height?</h3>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setHeightUnit('cm')}
              className={cn(
                'px-3 py-1 rounded text-sm',
                heightUnit === 'cm'
                  ? 'bg-primary text-white'
                  : 'bg-background-tertiary text-foreground-muted'
              )}
            >
              cm
            </button>
            <button
              onClick={() => setHeightUnit('ft_in')}
              className={cn(
                'px-3 py-1 rounded text-sm',
                heightUnit === 'ft_in'
                  ? 'bg-primary text-white'
                  : 'bg-background-tertiary text-foreground-muted'
              )}
            >
              ft/in
            </button>
          </div>
          <Input
            type="number"
            placeholder={heightUnit === 'cm' ? 'Height in cm' : 'Height in inches'}
            value={currentHeight || ''}
            onChange={(e) => handleHeightChange(e.target.value)}
          />
        </div>
      </div>

      {/* Weight */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What&apos;s your current and target weight?</h3>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setWeightUnit('kg')}
              className={cn(
                'px-3 py-1 rounded text-sm',
                weightUnit === 'kg'
                  ? 'bg-primary text-white'
                  : 'bg-background-tertiary text-foreground-muted'
              )}
            >
              kg
            </button>
            <button
              onClick={() => setWeightUnit('lb')}
              className={cn(
                'px-3 py-1 rounded text-sm',
                weightUnit === 'lb'
                  ? 'bg-primary text-white'
                  : 'bg-background-tertiary text-foreground-muted'
              )}
            >
              lb
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="number"
              label="Current Weight"
              placeholder={`Current weight in ${weightUnit}`}
              value={currentWeight.current || ''}
              onChange={(e) => handleWeightChange('current', e.target.value)}
            />
            <Input
              type="number"
              label="Target Weight"
              placeholder={`Target weight in ${weightUnit}`}
              value={currentWeight.target || ''}
              onChange={(e) => handleWeightChange('target', e.target.value)}
            />
          </div>
        </div>
      </div>


      <div className="bg-background-tertiary rounded-lg p-4">
        <p className="text-sm text-foreground-muted">
          💡 <strong>Privacy Note:</strong> This information helps us create a personalized plan for you. 
          All data is kept secure and private.
        </p>
      </div>
    </div>
  );
};

export default PersonalInfoStep;