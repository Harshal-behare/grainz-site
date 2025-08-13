import React from 'react';
import { FormStepProps } from '@/types/fitness';
import { cn } from '@/lib/utils';

const FoodPreferencesStep: React.FC<FormStepProps> = ({ data, updateData }) => {
  const handleArrayFieldChange = (field: string, value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    updateData({
      diet: {
        ...data.diet,
        [field]: items,
      },
    });
  };

  const handleTextFieldChange = (field: string, value: string) => {
    updateData({
      diet: {
        ...data.diet,
        [field]: value,
      },
    });
  };

  const arrayToString = (arr: string[] | undefined) => {
    return arr ? arr.join(', ') : '';
  };

  return (
    <div className="space-y-8">
      {/* High Calorie Favourite Foods */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What are your favorite high-calorie foods?</h3>
        <div className="space-y-4">
          <textarea
            className={cn(
              'w-full min-h-[80px] p-3 rounded-lg',
              'bg-background-secondary border border-foreground-muted/20',
              'focus:outline-none focus:ring-2 focus:ring-primary/50',
              'resize-y'
            )}
            placeholder="Pizza, burgers, ice cream, chocolate, french fries, pasta..."
            value={arrayToString(data.diet?.high_calorie_favourite_foods)}
            onChange={(e) => handleArrayFieldChange('high_calorie_favourite_foods', e.target.value)}
          />
          <p className="text-sm text-foreground-muted">
            Separate items with commas. Be honest - this helps us create sustainable meal plans!
          </p>
        </div>
      </div>

      {/* Other High Calorie Sweets */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Any other sweets or treats you enjoy?</h3>
        <textarea
          className={cn(
            'w-full min-h-[80px] p-3 rounded-lg',
            'bg-background-secondary border border-foreground-muted/20',
            'focus:outline-none focus:ring-2 focus:ring-primary/50',
            'resize-y'
          )}
          placeholder="Cookies, cakes, donuts, candy bars, soda..."
          value={data.diet?.other_high_calorie_sweets || ''}
          onChange={(e) => handleTextFieldChange('other_high_calorie_sweets', e.target.value)}
        />
      </div>

      {/* Preferred Included Foods */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What healthy foods do you enjoy?</h3>
        <div className="space-y-4">
          <textarea
            className={cn(
              'w-full min-h-[80px] p-3 rounded-lg',
              'bg-background-secondary border border-foreground-muted/20',
              'focus:outline-none focus:ring-2 focus:ring-primary/50',
              'resize-y'
            )}
            placeholder="Chicken, salmon, quinoa, Greek yogurt, eggs, avocado..."
            value={arrayToString(data.diet?.preferred_included_foods)}
            onChange={(e) => handleArrayFieldChange('preferred_included_foods', e.target.value)}
          />
          <p className="text-sm text-foreground-muted">
            These will be prioritized in your meal plans
          </p>
        </div>
      </div>

      {/* Foods Despised */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What foods do you absolutely dislike?</h3>
        <div className="space-y-4">
          <textarea
            className={cn(
              'w-full min-h-[80px] p-3 rounded-lg',
              'bg-background-secondary border border-foreground-muted/20',
              'focus:outline-none focus:ring-2 focus:ring-primary/50',
              'resize-y'
            )}
            placeholder="Brussels sprouts, liver, mushrooms, tofu..."
            value={arrayToString(data.diet?.foods_despised)}
            onChange={(e) => handleArrayFieldChange('foods_despised', e.target.value)}
          />
          <p className="text-sm text-foreground-muted">
            We'll avoid these in your meal recommendations
          </p>
        </div>
      </div>

      {/* Favourite Fruits */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What are your favorite fruits?</h3>
        <textarea
          className={cn(
            'w-full min-h-[80px] p-3 rounded-lg',
            'bg-background-secondary border border-foreground-muted/20',
            'focus:outline-none focus:ring-2 focus:ring-primary/50',
            'resize-y'
          )}
          placeholder="Apples, bananas, berries, oranges, mango, watermelon..."
          value={arrayToString(data.diet?.favourite_fruits)}
          onChange={(e) => handleArrayFieldChange('favourite_fruits', e.target.value)}
        />
      </div>

      {/* Favourite Vegetables */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What are your favorite vegetables?</h3>
        <textarea
          className={cn(
            'w-full min-h-[80px] p-3 rounded-lg',
            'bg-background-secondary border border-foreground-muted/20',
            'focus:outline-none focus:ring-2 focus:ring-primary/50',
            'resize-y'
          )}
          placeholder="Broccoli, spinach, carrots, bell peppers, sweet potatoes..."
          value={arrayToString(data.diet?.favourite_vegetables)}
          onChange={(e) => handleArrayFieldChange('favourite_vegetables', e.target.value)}
        />
      </div>

      <div className="bg-background-tertiary rounded-lg p-4">
        <p className="text-sm text-foreground-muted">
          💡 <strong>Sustainable Nutrition:</strong> We believe in creating meal plans 
          you'll actually enjoy. Your preferences help us design a diet you can stick to long-term.
        </p>
      </div>
    </div>
  );
};

export default FoodPreferencesStep;
