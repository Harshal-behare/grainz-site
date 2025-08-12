import React from 'react';
import { Shield } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield size={24} className="text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-foreground-muted">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>

        <div className="bg-background-secondary rounded-xl border border-border p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground-muted mb-4">
                We collect information you provide directly to us through our fitness assessment form, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground-muted">
                <li>Personal information (name, email, phone number, profession)</li>
                <li>Health and fitness information (goals, current status, medical conditions)</li>
                <li>Dietary preferences and restrictions</li>
                <li>Workout preferences and fitness level</li>
                <li>Body measurements and physical characteristics</li>
                <li>Optional file uploads (health reports, photos)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">How We Use Your Information</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground-muted mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground-muted">
                <li>Create personalized fitness and nutrition plans</li>
                <li>Provide expert analysis and recommendations</li>
                <li>Communicate with you about your fitness journey</li>
                <li>Improve our services and user experience</li>
                <li>Send you relevant fitness content and updates (with your consent)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Information Sharing</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground-muted mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground-muted">
                <li>To qualified fitness professionals who create your personalized plans</li>
                <li>To service providers who help us operate our platform (with strict confidentiality agreements)</li>
                <li>When required by law or to protect our rights and safety</li>
                <li>With your explicit consent for specific purposes</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Data Security</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground-muted mb-4">
                We implement robust security measures to protect your information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground-muted">
                <li>End-to-end encryption for data transmission</li>
                <li>Secure cloud storage with industry-standard encryption</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication requirements</li>
                <li>Employee training on data protection practices</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Your Rights</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground-muted mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground-muted">
                <li>Access and review your personal information</li>
                <li>Request corrections to inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability and export your information</li>
                <li>Withdraw consent for specific data uses</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Cookies and Analytics</h2>
            <p className="text-foreground-muted">
              We use cookies and similar technologies to improve your experience on our website. These help us understand 
              how you use our services and remember your preferences. You can control cookie settings through your browser.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Changes to This Policy</h2>
            <p className="text-foreground-muted">
              We may update this privacy policy from time to time. We will notify you of any significant changes by 
              posting the new policy on our website and sending you an email notification.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
            <p className="text-foreground-muted mb-4">
              If you have any questions about this privacy policy or our practices, please contact us:
            </p>
            <div className="bg-background-tertiary rounded-lg p-4">
              <p className="text-foreground-muted">
                <strong>Email:</strong> privacy@fitnesspro.com<br />
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

export default PrivacyPolicyPage;