import React from 'react';
import { FormStepProps } from '@/types/fitness';
import Input from '@/components/ui/Input';
import { cn } from '@/lib/utils';

const alcoholSmokeOptions = [
  { id: 'never', label: 'Never', emoji: '🚫' },
  { id: 'rarely', label: 'Rarely (special occasions)', emoji: '🎉' },
  { id: 'weekly', label: '1-2 times per week', emoji: '📅' },
  { id: 'frequently', label: '3+ times per week', emoji: '📊' },
  { id: 'daily', label: 'Daily', emoji: '📆' },
];

const HealthInfoStep: React.FC<FormStepProps> = ({ data, updateData }) => {
  const handleMedicalIssuesChange = (issues: string) => {
    updateData({
      health: {
        ...data.health,
        medical_issues_allergies: issues,
      },
    });
  };

  const handleHeartRateChange = (rate: string) => {
    const heartRate = parseInt(rate) || 0;
    updateData({
      health: {
        ...data.health,
        resting_heart_rate: heartRate > 0 ? heartRate : undefined,
      },
    });
  };

  const handleAlcoholSmokeChange = (frequency: string) => {
    updateData({
      health: {
        ...data.health,
        alcohol_smoke_frequency: frequency,
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Medical Issues/Allergies */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Do you have any medical conditions or allergies?</h3>
        <div className="space-y-4">
          <textarea
            className={cn(
              'w-full min-h-[120px] p-3 rounded-lg',
              'bg-background-secondary border border-foreground-muted/20',
              'focus:outline-none focus:ring-2 focus:ring-primary/50',
              'resize-y'
            )}
            placeholder="List any medical conditions, injuries, allergies, or medications (e.g., diabetes, knee injury, peanut allergy, blood pressure medication)"
            value={data.health?.medical_issues_allergies || ''}
            onChange={(e) => handleMedicalIssuesChange(e.target.value)}
          />
          <p className="text-sm text-foreground-muted">
            If none, write "None". This information is kept strictly confidential.
          </p>
        </div>
      </div>

      {/* Resting Heart Rate */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What's your resting heart rate?</h3>
        <div className="space-y-4">
          <Input
            type="number"
            label="Resting Heart Rate (BPM)"
            placeholder="60-100 is typical"
            value={data.health?.resting_heart_rate || ''}
            onChange={(e) => handleHeartRateChange(e.target.value)}
            min="40"
            max="120"
          />
          <p className="text-sm text-foreground-muted">
            Measure when you first wake up, before getting out of bed. If unknown, leave blank.
          </p>
        </div>
      </div>

      {/* Alcohol/Smoke Frequency */}
      <div>
        <h3 className="text-lg font-semibold mb-4">How often do you drink alcohol or smoke?</h3>
        <p className="text-sm text-foreground-muted mb-4">This helps us tailor your nutrition and recovery plan</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {alcoholSmokeOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleAlcoholSmokeChange(option.id)}
              className={cn(
                'card-hover cursor-pointer text-center p-4',
                'transition-all duration-200',
                data.health?.alcohol_smoke_frequency === option.id && 'ring-2 ring-primary bg-primary/5'
              )}
            >
              <div className="text-2xl mb-2">{option.emoji}</div>
              <div className="text-sm font-medium">{option.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-background-tertiary rounded-lg p-4">
        <p className="text-sm text-foreground-muted">
          💡 <strong>Health First:</strong> Your safety is our priority. We'll adjust your 
          program based on any health considerations you share with us.
        </p>
      </div>
    </div>
  );
};

export default HealthInfoStep;
