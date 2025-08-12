import React from 'react';
import { FormStepProps } from '@/types/fitness';
import Input from '@/components/ui/Input';

const measurements = [
  { key: 'forearm_in', label: 'Forearm', placeholder: 'Forearm circumference' },
  { key: 'bicep_in', label: 'Bicep', placeholder: 'Bicep circumference' },
  { key: 'shoulder_in', label: 'Shoulders', placeholder: 'Shoulder width' },
  { key: 'chest_in', label: 'Chest', placeholder: 'Chest circumference' },
  { key: 'upper_waist_in', label: 'Upper Waist', placeholder: 'Upper waist circumference' },
  { key: 'lower_waist_in', label: 'Lower Waist', placeholder: 'Lower waist circumference' },
  { key: 'belly_button_circumference_in', label: 'Belly Button', placeholder: 'Belly button circumference' },
  { key: 'buttocks_in', label: 'Buttocks', placeholder: 'Buttocks circumference' },
  { key: 'thighs_in', label: 'Thighs', placeholder: 'Thigh circumference' },
];

const MeasurementsStep: React.FC<FormStepProps> = ({ data, updateData }) => {
  const measurementData = data.measurements || {};

  const handleMeasurementChange = (key: string, value: string) => {
    const numericValue = parseFloat(value) || 0;
    updateData({
      measurements: {
        ...measurementData,
        [key]: numericValue,
      },
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <p className="text-foreground-muted">
          Body measurements help us track your progress more accurately. All measurements should be in inches.
        </p>
        <p className="text-sm text-foreground-muted mt-2">
          💡 Don&apos;t have a measuring tape? You can skip this step and add measurements later.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {measurements.map((measurement) => {
          const value = measurementData[measurement.key as keyof typeof measurementData];
          const displayValue = value !== undefined && value !== null ? String(value) : '';
          
          return (
            <Input
              key={measurement.key}
              type="number"
              label={measurement.label}
              placeholder={measurement.placeholder}
              value={displayValue}
              onChange={(e) => handleMeasurementChange(measurement.key, e.target.value)}
              helperText="in inches"
            />
          );
        })}
      </div>

      <div className="bg-background-tertiary rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-2">
          📏 How to measure correctly:
        </h4>
        <ul className="text-sm text-foreground-muted space-y-1">
          <li>• Measure at the same time of day (preferably morning)</li>
          <li>• Keep the measuring tape snug but not tight</li>
          <li>• Measure over bare skin when possible</li>
          <li>• Stand relaxed in a natural position</li>
          <li>• Take measurements on the dominant side of your body</li>
        </ul>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-2">
          🎯 Why measurements matter:
        </h4>
        <p className="text-sm text-foreground-muted">
          While the scale might not always show progress, body measurements reveal changes in muscle mass and body composition. 
          You might be losing fat and gaining muscle simultaneously!
        </p>
      </div>
    </div>
  );
};

export default MeasurementsStep;