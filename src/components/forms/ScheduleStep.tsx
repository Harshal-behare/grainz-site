import React from 'react';
import { FormStepProps } from '@/types/fitness';
import Input from '@/components/ui/Input';
import { cn } from '@/lib/utils';

const ScheduleStep: React.FC<FormStepProps> = ({ data, updateData }) => {
  const handleScheduleChange = (schedule: string) => {
    updateData({
      workout: {
        ...data.workout,
        daily_schedule: schedule,
      },
    });
  };

  const handleProgrammeStartDateChange = (date: string) => {
    updateData({
      profile: {
        ...data.profile,
        programme_start_date: new Date(date),
      },
    });
  };

  const formatDateForInput = (date: Date | undefined) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="space-y-8">
      {/* Daily Schedule */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What's your daily schedule like?</h3>
        <div className="space-y-4">
          <textarea
            className={cn(
              'w-full min-h-[150px] p-3 rounded-lg',
              'bg-background-secondary border border-foreground-muted/20',
              'focus:outline-none focus:ring-2 focus:ring-primary/50',
              'resize-y'
            )}
            placeholder="Describe your typical daily routine (e.g., Wake up at 7 AM, work 9-5, gym after work, sleep by 11 PM)"
            value={data.workout?.daily_schedule || ''}
            onChange={(e) => handleScheduleChange(e.target.value)}
          />
          <p className="text-sm text-foreground-muted">
            Include wake time, work hours, meal times, and any fixed commitments
          </p>
        </div>
      </div>

      {/* Programme Start Date */}
      <div>
        <h3 className="text-lg font-semibold mb-4">When would you like to start?</h3>
        <Input
          type="date"
          label="Programme Start Date"
          value={formatDateForInput(data.profile?.programme_start_date)}
          onChange={(e) => handleProgrammeStartDateChange(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          helperText="Choose a date that works best for your schedule"
        />
      </div>

      <div className="bg-background-tertiary rounded-lg p-4">
        <p className="text-sm text-foreground-muted">
          💡 <strong>Tip:</strong> Understanding your daily routine helps us recommend 
          the best workout times and meal schedules that fit seamlessly into your life.
        </p>
      </div>
    </div>
  );
};

export default ScheduleStep;
