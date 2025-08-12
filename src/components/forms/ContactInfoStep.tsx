import React from 'react';
import { FormStepProps } from '@/types/fitness';
import Input from '@/components/ui/Input';
import { validateEmail, validatePhone } from '@/lib/utils';

const ContactInfoStep: React.FC<FormStepProps> = ({ data, updateData }) => {
  const profile = data.profile || {};

  const handleInputChange = (field: keyof typeof profile, value: string) => {
    updateData({
      profile: {
        ...profile,
        [field]: value,
      },
    });
  };

  const isEmailValid = profile.email ? validateEmail(profile.email) : true;
  const isPhoneValid = profile.phone_number ? validatePhone(profile.phone_number) : true;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-foreground-muted">
          We&apos;ll use this information to send you your personalized fitness plan and important updates.
        </p>
      </div>

      <div className="space-y-6">
        <Input
          type="text"
          label="Full Name"
          placeholder="Enter your full name"
          value={profile.user_name || ''}
          onChange={(e) => handleInputChange('user_name', e.target.value)}
          helperText="This will appear on your profile and certificates"
        />

        <Input
          type="email"
          label="Email Address"
          placeholder="Enter your email address"
          value={profile.email || ''}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={!isEmailValid ? 'Please enter a valid email address' : undefined}
          helperText="We'll send your personalized plan and progress updates here"
        />

        <Input
          type="tel"
          label="Phone Number"
          placeholder="Enter your phone number"
          value={profile.phone_number || ''}
          onChange={(e) => handleInputChange('phone_number', e.target.value)}
          error={!isPhoneValid ? 'Please enter a valid phone number' : undefined}
          helperText="Optional: For important notifications and support"
        />

        <Input
          type="text"
          label="Profession"
          placeholder="What do you do for work?"
          value={profile.profession || ''}
          onChange={(e) => handleInputChange('profession', e.target.value)}
          helperText="Helps us understand your lifestyle and schedule constraints"
        />
      </div>

      <div className="bg-background-tertiary rounded-lg p-4 space-y-3">
        <h4 className="text-sm font-medium text-foreground flex items-center">
          🔒 Your Privacy Matters
        </h4>
        <ul className="text-sm text-foreground-muted space-y-1">
          <li>• We never share your personal information with third parties</li>
          <li>• Your data is encrypted and stored securely</li>
          <li>• You can update or delete your information anytime</li>
          <li>• We only send relevant fitness content, no spam</li>
        </ul>
      </div>
    </div>
  );
};

export default ContactInfoStep;