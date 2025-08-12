import React from 'react';
import { FormStepProps } from '@/types/fitness';

const MedicalInfoStep: React.FC<FormStepProps> = ({ data, updateData }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Medical Information</h3>
        <p className="text-foreground-muted">This step is being implemented...</p>
      </div>
    </div>
  );
};

export default MedicalInfoStep;