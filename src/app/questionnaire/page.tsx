'use client';

import React, { useState, useCallback } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { CompleteUserData, FormStep } from '@/types/fitness';
import Button from '@/components/ui/Button';
import Progress from '@/components/ui/Progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { submitFormData } from '@/lib/form-service';

// Import form step components
import BodyTypeStep from '@/components/forms/BodyTypeStep';
import PrimaryGoalStep from '@/components/forms/PrimaryGoalStep';
import PersonalInfoStep from '@/components/forms/PersonalInfoStep';
import ContactInfoStep from '@/components/forms/ContactInfoStep';
import MedicalInfoStep from '@/components/forms/MedicalInfoStep';
import DietPreferencesStep from '@/components/forms/DietPreferencesStep';
import WorkoutPreferencesStep from '@/components/forms/WorkoutPreferencesStep';
import FileUploadStep from '@/components/forms/FileUploadStep';
import MeasurementsStep from '@/components/forms/MeasurementsStep';

const formSteps: FormStep[] = [
  'body-type',
  'primary-goal',
  'personal-details',
  'contact-info',
  'diet-type',
  'workout-location',
  'file-uploads',
  'body-measurements',
];

const stepTitles: Record<FormStep, string> = {
  'body-type': 'What\'s your current body type?',
  'primary-goal': 'What\'s your primary fitness goal?',
  'ideal-physique': 'What\'s your ideal physique?',
  'body-fat': 'What\'s your current body fat percentage?',
  'problem-areas': 'Which areas would you like to focus on?',
  'diet-type': 'Do you follow any specific diet?',
  'sugar-intake': 'How often do you consume sugar?',
  'age-bracket': 'What\'s your age range?',
  'height': 'What\'s your height?',
  'weight': 'What\'s your current and target weight?',
  'fitness-level': 'What\'s your current fitness level?',
  'exercise-preferences': 'How do you feel about these exercises?',
  'sports-interests': 'Which sports or activities interest you?',
  'fitness-barriers': 'What challenges have you faced?',
  'water-intake': 'How much water do you drink daily?',
  'workout-location': 'Where do you prefer to work out?',
  'equipment-access': 'What equipment do you have access to?',
  'training-frequency': 'How often do you currently train?',
  'meal-prep-time': 'How much time can you spend on meal prep?',
  'additional-goals': 'Any additional goals you\'d like to achieve?',
  'pushups-capacity': 'How many push-ups can you do?',
  'pullups-capacity': 'How many pull-ups can you do?',
  'profile-info': 'Let\'s create your profile',
  'contact-info': 'Contact Information',
  'personal-details': 'Personal Details',
  'file-uploads': 'Upload Your Reports',
  'body-measurements': 'Body Measurements',
};

const QuestionnairePage: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<Partial<CompleteUserData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStep = formSteps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === formSteps.length - 1;
  const progress = ((currentStepIndex + 1) / formSteps.length) * 100;

  const updateFormData = useCallback((updates: Partial<CompleteUserData>) => {
    setFormData(prev => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const handleNext = useCallback(() => {
    if (!isLastStep) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  }, [isLastStep]);

  const handlePrevious = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStepIndex(prev => prev - 1);
    }
  }, [isFirstStep]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      console.log('Submitting form data:', formData);
      const submissionId = await submitFormData(formData);
      
      // Store submission ID for success page
      localStorage.setItem('submissionId', submissionId);
      
      // Redirect to success page
      window.location.href = '/success';
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    const stepProps = {
      data: formData,
      updateData: updateFormData,
      onNext: handleNext,
      onPrevious: handlePrevious,
      isFirstStep,
      isLastStep,
    };

    switch (currentStep) {
      case 'body-type':
        return <BodyTypeStep {...stepProps} />;
      case 'primary-goal':
        return <PrimaryGoalStep {...stepProps} />;
      case 'personal-details':
        return <PersonalInfoStep {...stepProps} />;
      case 'contact-info':
        return <ContactInfoStep {...stepProps} />;
      case 'diet-type':
        return <DietPreferencesStep {...stepProps} />;
      case 'workout-location':
        return <WorkoutPreferencesStep {...stepProps} />;
      case 'file-uploads':
        return <FileUploadStep {...stepProps} />;
      case 'body-measurements':
        return <MeasurementsStep {...stepProps} />;
      default:
        return <div>Step not implemented</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background-secondary border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Fitness Assessment
              </h1>
              <p className="text-foreground-muted">
                Step {currentStepIndex + 1} of {formSteps.length}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-foreground-muted mb-1">Progress</div>
              <div className="w-32">
                <Progress value={progress} showLabel={false} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle className="text-center text-xl md:text-2xl">
              {stepTitles[currentStep]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderCurrentStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={isFirstStep}
            className="flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            Previous
          </Button>

          <div className="flex space-x-2">
            {formSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index <= currentStepIndex
                    ? 'bg-primary'
                    : 'bg-background-tertiary'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={isSubmitting}
            isLoading={isSubmitting}
            className="flex items-center"
          >
            {isLastStep ? (
              <>
                <CheckCircle size={16} className="mr-2" />
                Complete Assessment
              </>
            ) : (
              <>
                Next
                <ArrowRight size={16} className="ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionnairePage;