'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle, Download, Mail, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const SuccessPage: React.FC = () => {
  const [submissionId, setSubmissionId] = useState<string>('');

  useEffect(() => {
    const id = localStorage.getItem('submissionId');
    if (id) {
      setSubmissionId(id);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="text-center">
          <CardHeader>
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-success" />
            </div>
            <CardTitle className="text-2xl md:text-3xl mb-4">
              Assessment Complete! 🎉
            </CardTitle>
            <p className="text-foreground-muted">
              Thank you for completing our comprehensive fitness assessment. 
              Your personalized plan is being prepared by our experts.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {submissionId && (
              <div className="bg-background-tertiary rounded-lg p-4">
                <p className="text-sm text-foreground-muted mb-2">Your Submission ID:</p>
                <p className="font-mono text-lg font-semibold text-primary">{submissionId}</p>
                <p className="text-xs text-foreground-muted mt-2">
                  Save this ID for your records
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <Mail size={24} className="text-primary mb-3" />
                <h3 className="font-semibold mb-2">Check Your Email</h3>
                <p className="text-sm text-foreground-muted">
                  We&apos;ve sent a confirmation email with your submission details.
                </p>
              </div>
              
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                <Download size={24} className="text-accent mb-3" />
                <h3 className="font-semibold mb-2">Plan Ready Soon</h3>
                <p className="text-sm text-foreground-muted">
                  Your personalized plan will be ready within 24-48 hours.
                </p>
              </div>
            </div>

            <div className="bg-background-secondary rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">What Happens Next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Expert Review</p>
                    <p className="text-sm text-foreground-muted">Our fitness professionals analyze your responses</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Plan Creation</p>
                    <p className="text-sm text-foreground-muted">A customized workout and nutrition plan is created</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Delivery</p>
                    <p className="text-sm text-foreground-muted">Your plan is delivered via email with detailed instructions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="flex-1"
              >
                Back to Home
              </Button>
              <Button 
                onClick={() => window.location.href = '/contact'}
                className="flex-1"
              >
                Contact Support
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </div>

            <p className="text-xs text-foreground-muted">
              Questions? Contact us at{' '}
              <a href="mailto:support@fitnesspro.com" className="text-primary hover:underline">
                support@fitnesspro.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuccessPage;