import React from 'react';
import { FormStepProps } from '@/types/fitness';
import { cn } from '@/lib/utils';
import { Home, Building2, Clock, UserCheck } from 'lucide-react';

const workoutLocations = [
  {
    id: 'home',
    title: 'Home Workouts',
    description: 'I prefer working out at home',
    icon: Home,
    benefits: ['No gym fees', 'Privacy', 'Flexible timing', 'No commute'],
  },
  {
    id: 'gym',
    title: 'Gym Workouts',
    description: 'I prefer working out at the gym',
    icon: Building2,
    benefits: ['Full equipment', 'Motivation', 'Social aspect', 'Expert guidance'],
  },
];

const equipmentLevels = [
  { id: 'none', title: 'No Equipment', description: 'Just my bodyweight', emoji: '🤸‍♂️' },
  { id: 'basic', title: 'Basic Equipment', description: 'Dumbbells, resistance bands', emoji: '🏋️‍♂️' },
  { id: 'full', title: 'Full Gym Access', description: 'All machines and equipment', emoji: '💪' },
];

const workoutTimes = [
  { id: 'early_morning', label: 'Early Morning', description: '5-7 AM', emoji: '🌅' },
  { id: 'morning', label: 'Morning', description: '7-10 AM', emoji: '☀️' },
  { id: 'lunch', label: 'Lunch Time', description: '11 AM-1 PM', emoji: '🌞' },
  { id: 'afternoon', label: 'Afternoon', description: '2-5 PM', emoji: '🌤️' },
  { id: 'evening', label: 'Evening', description: '5-8 PM', emoji: '🌆' },
  { id: 'night', label: 'Night', description: '8-11 PM', emoji: '🌙' },
];

const WorkoutPreferencesStep: React.FC<FormStepProps> = ({ data, updateData }) => {
  const workoutData = data.workout || {};

  const handleLocationSelect = (location: 'home' | 'gym') => {
    updateData({
      workout: {
        ...workoutData,
        workout_location: location,
      },
    });
  };

  const handleEquipmentSelect = (level: 'none' | 'basic' | 'full') => {
    updateData({
      workout: {
        ...workoutData,
        equipment_access_level: level,
      },
    });
  };

  const handleWorkoutTimeSelect = (time: string) => {
    updateData({
      workout: {
        ...workoutData,
        preferred_workout_time: time,
      },
    });
  };

  const handlePersonalTrainerToggle = () => {
    updateData({
      workout: {
        ...workoutData,
        has_personal_trainer: !workoutData.has_personal_trainer,
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Workout Location */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Where do you prefer to work out?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workoutLocations.map((location) => {
            const Icon = location.icon;
            const isSelected = workoutData.workout_location === location.id;
            
            return (
              <div
                key={location.id}
                onClick={() => handleLocationSelect(location.id as any)}
                className={cn(
                  'card-hover cursor-pointer p-6',
                  'transition-all duration-200',
                  isSelected && 'ring-2 ring-primary bg-primary/5'
                )}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">{location.title}</h4>
                    <p className="text-sm text-foreground-muted mb-3">{location.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {location.benefits.map((benefit, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-background-tertiary text-foreground-muted rounded"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Equipment Access */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What equipment do you have access to?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {equipmentLevels.map((level) => {
            const isSelected = workoutData.equipment_access_level === level.id;
            
            return (
              <div
                key={level.id}
                onClick={() => handleEquipmentSelect(level.id as any)}
                className={cn(
                  'card-hover cursor-pointer text-center p-4',
                  'transition-all duration-200',
                  isSelected && 'ring-2 ring-primary bg-primary/5'
                )}
              >
                <div className="text-3xl mb-2">{level.emoji}</div>
                <div className="font-medium text-foreground mb-1">{level.title}</div>
                <div className="text-sm text-foreground-muted">{level.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preferred Workout Time */}
      <div>
        <h3 className="text-lg font-semibold mb-4">When do you prefer to work out?</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {workoutTimes.map((time) => {
            const isSelected = workoutData.preferred_workout_time === time.id;
            
            return (
              <div
                key={time.id}
                onClick={() => handleWorkoutTimeSelect(time.id)}
                className={cn(
                  'card-hover cursor-pointer text-center p-3',
                  'transition-all duration-200',
                  isSelected && 'ring-2 ring-primary bg-primary/5'
                )}
              >
                <div className="text-2xl mb-1">{time.emoji}</div>
                <div className="text-sm font-medium text-foreground">{time.label}</div>
                <div className="text-xs text-foreground-muted">{time.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Personal Trainer */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Do you work with a personal trainer?</h3>
        <div
          onClick={handlePersonalTrainerToggle}
          className={cn(
            'card-hover cursor-pointer p-4',
            'transition-all duration-200',
            workoutData.has_personal_trainer && 'ring-2 ring-primary bg-primary/5'
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <UserCheck size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground">
                  {workoutData.has_personal_trainer ? 'Yes, I have a trainer' : 'No, I train independently'}
                </div>
                <div className="text-sm text-foreground-muted">
                  {workoutData.has_personal_trainer 
                    ? 'I work with a certified personal trainer'
                    : 'I prefer to work out on my own'}
                </div>
              </div>
            </div>
            <div className={cn(
              'w-5 h-5 rounded-full border-2',
              workoutData.has_personal_trainer
                ? 'bg-primary border-primary'
                : 'bg-background border-border'
            )}>
              {workoutData.has_personal_trainer && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background-tertiary rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-2">
          💡 Don&apos;t have equipment? No problem!
        </h4>
        <p className="text-sm text-foreground-muted">
          We have amazing bodyweight routines that can be just as effective as gym workouts. 
          You can always upgrade your equipment later as you progress!
        </p>
      </div>
    </div>
  );
};

export default WorkoutPreferencesStep;