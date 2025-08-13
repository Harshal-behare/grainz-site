'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { CompleteUserData, FormStep } from '@/types/fitness';
import Button from '@/components/ui/Button';
import Progress from '@/components/ui/Progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { submitFormData } from '@/lib/form-service';
import { useToast, ToastContainer } from '@/components/ui/Toast';
import { useConfirmDialog } from '@/components/ui/ConfirmDialog';
import { 
  validateRequired, 
  validateEmail, 
  validatePhoneNumber,
  validateAgeBracket,
  validateHeight,
  validateWeight,
  validateFields 
} from '@/lib/validation';

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
import CurrentRoutineStep from '@/components/forms/CurrentRoutineStep';
import FoodPreferencesStep from '@/components/forms/FoodPreferencesStep';
import FitnessGoalsStep from '@/components/forms/FitnessGoalsStep';
import ScheduleStep from '@/components/forms/ScheduleStep';
import ProgrammeSelectionStep from '@/components/forms/ProgrammeSelectionStep';
import FullBodyImagesStep from '@/components/forms/FullBodyImagesStep';
import HealthInfoStep from '@/components/forms/HealthInfoStep';

const formSteps: FormStep[] = [
  'body-type',
  'primary-goal',
  'personal-details',
  'contact-info',
  'diet-type',
  'workout-location',
  'current-routine',
  'food-preferences',
  'fitness-goals',
  'schedule',
  'medical-info',
  'file-uploads',
  'body-measurements',
  'full-body-images',
];

const stepTitles: Record<FormStep | string, string> = {
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
  'current-routine': 'Your Current Workout Routine',
  'food-preferences': 'Food Preferences & Dietary Habits',
  'fitness-goals': 'Your Fitness Goals',
  'schedule': 'Your Daily Schedule',
  'medical-info': 'Health & Medical Information',
  'programme-selection': 'Choose Your Programme',
  'full-body-images': 'Full Body Progress Photos',
};

const QuestionnairePage: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<Partial<CompleteUserData>>(() => {
    // Retrieve stored data from localStorage
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : {};
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedStepIndices, setCompletedStepIndices] = useState<number[]>(() => {
    const saved = localStorage.getItem('completedSteps');
    return saved ? JSON.parse(saved) : [];
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const { toasts, showSuccess, showError, showWarning, showInfo } = useToast();
  const { confirm, ConfirmDialog } = useConfirmDialog();

  const currentStep = formSteps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === formSteps.length - 1;
  const progress = ((completedStepIndices.length) / formSteps.length) * 100;

  // Auto-save form data every 5 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (Object.keys(formData).length > 0) {
        localStorage.setItem('formData', JSON.stringify(formData));
        localStorage.setItem('completedSteps', JSON.stringify(completedStepIndices));
      }
    }, 5000);

    return () => clearInterval(autoSaveInterval);
  }, [formData, completedStepIndices]);

const updateFormData = useCallback((updates: Partial<CompleteUserData>) => {
    setFormData(prev => {
      const updatedData = {
        ...prev,
        ...updates,
      };
      // Store updated data in localStorage
      localStorage.setItem('formData', JSON.stringify(updatedData));
      return updatedData;
    });
  }, []);

  const validateCurrentStep = useCallback(() => {
    const errors: string[] = [];

    switch (currentStep) {
      case 'personal-details':
        errors.push(...validateFields([
          { validation: () => validateRequired(formData.personal?.age_bracket, 'Age Bracket'), stopOnError: true },
          { validation: () => validateAgeBracket(formData.personal?.age_bracket!) },
          { validation: () => validateRequired(formData.personal?.height, 'Height'), stopOnError: true },
          { validation: () => validateHeight(formData.personal?.height!) },
          { validation: () => validateRequired(formData.personal?.weight?.current, 'Current Weight'), stopOnError: true },
          { validation: () => validateWeight(formData.personal?.weight?.current!) },
          { validation: () => validateRequired(formData.personal?.weight?.target, 'Target Weight'), stopOnError: true },
          { validation: () => validateWeight(formData.personal?.weight?.target!) },
        ]).errors);
        break;
      case 'contact-info':
        errors.push(...validateFields([
          { validation: () => validateRequired(formData.profile?.email, 'Email'), stopOnError: true },
          { validation: () => validateEmail(formData.profile?.email!) },
          { validation: () => validateRequired(formData.profile?.phone_number, 'Phone Number'), stopOnError: true },
          { validation: () => validatePhoneNumber(formData.profile?.phone_number!) },
        ]).errors);
        break;
      case 'primary-goal':
        if (!formData.goals?.primary_goal) {
          errors.push('Primary goal is required');
        }
        break;
    }

    setValidationErrors(errors);
    if (errors.length > 0) {
      console.log('Validation errors:', errors);
      console.log('Current form data:', {
        age_bracket: formData.personal?.age_bracket,
        height: formData.personal?.height,
        current_weight: formData.personal?.weight?.current,
        target_weight: formData.personal?.weight?.target
      });
    }
    return errors.length === 0;
  }, [currentStep, formData]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      console.log('Submitting form data:', formData);
      const submissionId = await submitFormData(formData);
      
      // Store submission ID for success page
      localStorage.setItem('submissionId', submissionId);
      
      // Clear form data from localStorage after successful submission
      localStorage.removeItem('formData');
      localStorage.removeItem('completedSteps');

      // Show success notification
      showSuccess('Submission Successful', 'Your assessment has been submitted successfully.');

      // Redirect to success page
      setTimeout(() => {
        window.location.href = '/success';
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      showError('Submission Error', 'There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = useCallback(() => {
    if (!validateCurrentStep()) {
      showWarning('Validation Error', 'Please complete all required fields before proceeding.');
      return;
    }

    // Show confirmation dialog before proceeding to the final submission
    if (isLastStep) {
      confirm({
        title: 'Confirm Submission',
        message: 'Are you sure you want to submit the assessment?',
      }).then((confirmed) => {
        if (confirmed) {
          handleSubmit();
        }
      });
    } else {
      // Mark current step as completed
      if (!completedStepIndices.includes(currentStepIndex)) {
        const updatedCompleted = [...completedStepIndices, currentStepIndex];
        setCompletedStepIndices(updatedCompleted);
        localStorage.setItem('completedSteps', JSON.stringify(updatedCompleted));
      }
      setCurrentStepIndex(prev => prev + 1);
    }
  }, [isLastStep, validateCurrentStep, currentStepIndex, completedStepIndices, confirm, showWarning, handleSubmit]);

  const handlePrevious = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStepIndex(prev => prev - 1);
    }
  }, [isFirstStep]);


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
      case 'current-routine':
        return <CurrentRoutineStep {...stepProps} />;
      case 'food-preferences':
        return <FoodPreferencesStep {...stepProps} />;
      case 'fitness-goals':
        return <FitnessGoalsStep {...stepProps} />;
      case 'schedule':
        return <ScheduleStep {...stepProps} />;
      case 'medical-info':
        return <HealthInfoStep {...stepProps} />;
      case 'programme-selection':
        return <ProgrammeSelectionStep {...stepProps} />;
      case 'file-uploads':
        return <FileUploadStep {...stepProps} />;
      case 'body-measurements':
        return <MeasurementsStep {...stepProps} />;
      case 'full-body-images':
        return <FullBodyImagesStep {...stepProps} />;
      default:
        return <div>Step not implemented: {currentStep}</div>;
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
              <div className="text-xs text-foreground-muted mt-1">
                {Math.round(progress)}% Complete
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <ToastContainer toasts={toasts} />
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Confirmation Dialog */}
      <ConfirmDialog />
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
                  completedStepIndices.includes(index)
                    ? 'bg-green-500'
                    : index === currentStepIndex
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