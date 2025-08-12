'use client';

import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const ContactPage: React.FC = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'support@fitnesspro.com',
      description: 'Get a response within 24 hours',
      action: 'mailto:support@fitnesspro.com',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      description: 'Monday to Friday, 9 AM - 6 PM EST',
      action: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '123 Fitness Street',
      description: 'Gym City, GC 12345, United States',
      action: '#',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle size={24} className="text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            Have questions about our fitness assessment or need support? 
            We&apos;re here to help you on your fitness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-8">Contact Information</h2>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index} className="hover:shadow-glow transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon size={20} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                          <p className="text-foreground font-medium mb-1">{info.content}</p>
                          <p className="text-sm text-foreground-muted">{info.description}</p>
                          <a
                            href={info.action}
                            className="text-primary hover:text-primary/80 text-sm font-medium inline-block mt-2"
                          >
                            Contact Now →
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock size={20} className="text-primary" />
                  <span>Business Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Monday - Friday</span>
                    <span className="text-foreground">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Saturday</span>
                    <span className="text-foreground">10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Sunday</span>
                    <span className="text-foreground">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <p className="text-foreground-muted">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      placeholder="Enter your first name"
                      required
                    />
                    <Input
                      label="Last Name"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                  
                  <Input
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    required
                  />
                  
                  <Input
                    label="Subject"
                    placeholder="What is this about?"
                    required
                  />
                  
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Message
                    </label>
                    <textarea
                      className="w-full h-32 px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-foreground-muted">
              Quick answers to common questions about our fitness assessment service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'How long does the assessment take?',
                answer: 'The comprehensive assessment typically takes 10-15 minutes to complete. We recommend taking your time to provide accurate information for the best results.',
              },
              {
                question: 'Is the assessment really free?',
                answer: 'Yes! Our fitness assessment is completely free with no hidden costs or credit card required. You only pay if you choose to purchase additional services.',
              },
              {
                question: 'How quickly will I get my results?',
                answer: 'You\'ll receive your personalized fitness plan within 24-48 hours via email. Complex assessments may take slightly longer for thorough analysis.',
              },
              {
                question: 'Can I update my information later?',
                answer: 'Absolutely! Contact our support team to update your information or retake the assessment. We want to ensure your plan stays current with your goals.',
              },
              {
                question: 'Do I need any equipment for the recommended workouts?',
                answer: 'We tailor recommendations based on your available equipment. Whether you have a full gym or just bodyweight, we\'ll create a plan that works for you.',
              },
              {
                question: 'Is my personal information secure?',
                answer: 'Yes, we take data security seriously. All information is encrypted and stored securely. We never share your personal data with third parties.',
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">{faq.question}</h3>
                  <p className="text-foreground-muted text-sm">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;