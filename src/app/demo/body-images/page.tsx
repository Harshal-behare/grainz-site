'use client';

import React, { useState } from 'react';
import FullBodyImagesStep from '@/components/forms/FullBodyImagesStep';
import { CompleteUserData } from '@/types/fitness';
import { submitFormData } from '@/lib/form-service';

export default function BodyImagesDemo() {
  const [formData, setFormData] = useState<Partial<CompleteUserData>>({
    images: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  const updateData = (updates: Partial<CompleteUserData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // In a real form, you'd include all the other form data
      const mockFormData: Partial<CompleteUserData> = {
        ...formData,
        profile: {
          user_name: 'Demo User',
          email: 'demo@example.com',
          phone_number: '+1234567890',
          profession: 'Developer'
        }
      };
      
      const id = await submitFormData(mockFormData);
      setSubmissionId(id);
      alert(`Form submitted successfully! Submission ID: ${id}`);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit form. Please check console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Body Images Upload Demo</h1>
          <p className="text-foreground-muted mb-8">
            This demo shows the full body images upload component with all features.
          </p>

          <div className="bg-background-secondary rounded-lg p-6 mb-6">
            <FullBodyImagesStep
              data={formData}
              updateData={updateData}
              onNext={() => console.log('Next clicked')}
              onPrevious={() => console.log('Previous clicked')}
              isFirstStep={false}
              isLastStep={false}
            />
          </div>

          <div className="bg-background-tertiary rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Current Form Data</h2>
            <pre className="text-sm overflow-auto max-h-64 bg-background p-4 rounded">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.images?.length}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Form'}
            </button>
            
            {submissionId && (
              <div className="flex items-center text-green-600">
                ✓ Submitted with ID: {submissionId}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
