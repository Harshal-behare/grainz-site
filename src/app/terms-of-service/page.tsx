import React from 'react';
import { FileText } from 'lucide-react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText size={24} className="text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-foreground-muted">
            Please read these terms carefully before using our fitness assessment service.
          </p>
        </div>

        <div className="bg-background-secondary rounded-xl border border-border p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Acceptance of Terms</h2>
            <p className="text-foreground-muted">
              By accessing and using FitnessPro&apos;s services, you accept and agree to be bound by the terms and 
              provision of this agreement. These terms apply to all users of the service, including but not limited 
              to users who are browsers, customers, and contributors of content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Service Description</h2>
            <p className="text-foreground-muted mb-4">
              FitnessPro provides:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground-muted">
              <li>Comprehensive fitness assessment questionnaires</li>
              <li>Personalized fitness and nutrition plan recommendations</li>
              <li>Expert analysis of your fitness profile</li>
              <li>Educational content and fitness guidance</li>
              <li>Progress tracking and support tools</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">User Responsibilities</h2>
            <p className="text-foreground-muted mb-4">
              As a user of our service, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground-muted">
              <li>Provide accurate and truthful information in all assessments</li>
              <li>Use the service for lawful purposes only</li>
              <li>Respect the intellectual property rights of FitnessPro</li>
              <li>Not share your account credentials with others</li>
              <li>Notify us of any unauthorized use of your account</li>
              <li>Follow all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Health and Medical Disclaimers</h2>
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-4">
              <p className="text-warning font-semibold mb-2">Important Health Notice:</p>
              <p className="text-foreground-muted text-sm">
                Our fitness assessments and recommendations are for informational purposes only and do not constitute 
                medical advice. Always consult with qualified healthcare professionals before starting any fitness or 
                nutrition program.
              </p>
            </div>
            <ul className="list-disc list-inside space-y-2 text-foreground-muted">
              <li>We are not medical professionals and do not provide medical advice</li>
              <li>Results may vary based on individual circumstances</li>
              <li>You assume full responsibility for your health and safety</li>
              <li>Consult your doctor before starting any new exercise program</li>
              <li>Stop any activity if you experience pain or discomfort</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Intellectual Property</h2>
            <p className="text-foreground-muted mb-4">
              All content, features, and functionality of our service, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground-muted">
              <li>Text, graphics, logos, and images</li>
              <li>Software, algorithms, and assessment tools</li>
              <li>Fitness plans and nutritional recommendations</li>
              <li>Educational materials and content</li>
            </ul>
            <p className="text-foreground-muted mt-4">
              Are owned by FitnessPro and protected by copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Privacy and Data Protection</h2>
            <p className="text-foreground-muted">
              Your privacy is important to us. Our collection, use, and protection of your personal information is 
              governed by our Privacy Policy, which is incorporated by reference into these Terms of Service. 
              By using our service, you consent to the collection and use of your information as described in our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Limitation of Liability</h2>
            <p className="text-foreground-muted mb-4">
              FitnessPro shall not be liable for any direct, indirect, incidental, special, consequential, or punitive 
              damages, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground-muted">
              <li>Loss of profits, revenue, or data</li>
              <li>Personal injury or health complications</li>
              <li>Service interruptions or technical issues</li>
              <li>Third-party actions or content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Service Availability</h2>
            <p className="text-foreground-muted">
              We strive to maintain high service availability but cannot guarantee uninterrupted access. We reserve the 
              right to modify, suspend, or discontinue any part of our service at any time without prior notice. We may 
              also impose usage limits or restrict access to certain features.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Termination</h2>
            <p className="text-foreground-muted">
              We reserve the right to terminate or suspend your access to our service immediately, without prior notice, 
              for any reason, including but not limited to breach of these Terms of Service. Upon termination, your right 
              to use the service will cease immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Changes to Terms</h2>
            <p className="text-foreground-muted">
              We reserve the right to update these Terms of Service at any time. We will notify users of any material 
              changes by posting the new terms on our website and sending an email notification. Continued use of our 
              service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
            <p className="text-foreground-muted mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-background-tertiary rounded-lg p-4">
              <p className="text-foreground-muted">
                <strong>Email:</strong> legal@fitnesspro.com<br />
                <strong>Phone:</strong> +1 (555) 123-4567<br />
                <strong>Address:</strong> 123 Fitness Street, Gym City, GC 12345
              </p>
            </div>
          </section>

          <div className="border-t border-border pt-6">
            <p className="text-sm text-foreground-muted">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;