'use client';

import React, { useEffect } from 'react';
import { ArrowRight, Play, Star, Users, Target, Award, CheckCircle, Zap, Heart, Shield } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
  const router = useRouter();
  
  // Redirect to questionnaire immediately
  useEffect(() => {
    router.push('/questionnaire');
  }, [router]);
  const stats = [
    { label: 'Active Users', value: '10,000+', icon: Users },
    { label: 'Workouts Completed', value: '500K+', icon: Target },
    { label: 'Success Stories', value: '2,500+', icon: Award },
    { label: 'Average Rating', value: '4.9', icon: Star },
  ];

  const features = [
    {
      title: 'Personalized Assessment',
      description: 'Complete our comprehensive fitness questionnaire to get a plan tailored specifically to your goals, lifestyle, and preferences.',
      icon: Target,
      color: 'text-primary'
    },
    {
      title: 'Expert Analysis',
      description: 'Our fitness professionals analyze your responses to create a customized workout and nutrition plan just for you.',
      icon: Zap,
      color: 'text-accent'
    },
    {
      title: 'Comprehensive Reports',
      description: 'Get detailed insights into your fitness profile, including recommendations for diet, exercise, and lifestyle changes.',
      icon: Heart,
      color: 'text-success'
    },
    {
      title: 'Ongoing Support',
      description: 'Receive continuous guidance and adjustments to your plan as you progress towards your fitness goals.',
      icon: Shield,
      color: 'text-warning'
    },
  ];

  const benefits = [
    'Personalized fitness assessment',
    'Custom workout plans',
    'Nutrition guidance',
    'Progress tracking',
    'Expert support',
    '24/7 access to your plan'
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
              Transform Your Body,{' '}
              <span className="gradient-text">Transform Your Life</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground-secondary mb-8 max-w-4xl mx-auto text-balance">
              Get a personalized fitness plan based on your unique goals, lifestyle, and preferences. 
              Start your transformation journey with our comprehensive assessment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 h-14"
                onClick={() => window.location.href = '/questionnaire'}
              >
                Take Free Assessment
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 h-14"
              >
                <Play className="mr-2" size={20} />
                Watch How It Works
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-foreground-muted">
              <div className="flex items-center space-x-1">
                <CheckCircle size={16} className="text-success" />
                <span>100% Free Assessment</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle size={16} className="text-success" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle size={16} className="text-success" />
                <span>Get Results Instantly</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/5 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-success/5 rounded-full blur-xl animate-pulse" />
        </div>
      </section>


      {/* Stats Section */}
      <section className="py-16 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-foreground-muted">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Get your personalized fitness plan in just a few simple steps. 
              Our comprehensive assessment ensures you get exactly what you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="text-center animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="w-16 h-16 bg-background-tertiary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon size={24} className={feature.color} />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose <span className="gradient-text">grainZ?</span>
              </h2>
              <p className="text-xl text-foreground-secondary mb-8">
                Join thousands of people who have transformed their lives with our 
                personalized approach to fitness and wellness.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CheckCircle size={20} className="text-success flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
              <div className="text-center">
                <div className="w-24 h-24 bg-fitness-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-foreground-muted mb-6">
                  Take our free assessment and get your personalized fitness plan in minutes.
                </p>
                <Button 
                  size="lg"
                  onClick={() => window.location.href = '/questionnaire'}
                  className="w-full"
                >
                  Start Your Assessment
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;