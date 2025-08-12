import React from 'react';
import { Target, Users, Heart, Award, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Personalization',
      description: 'Every fitness journey is unique. We create plans tailored specifically to your goals, lifestyle, and preferences.',
    },
    {
      icon: Heart,
      title: 'Health First',
      description: 'Your health and safety are our top priorities. All recommendations are based on scientific research and best practices.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We believe in the power of support and motivation. Join thousands of others on their fitness transformation journey.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from our assessment tools to our personalized recommendations.',
    },
  ];

  const achievements = [
    '10,000+ successful transformations',
    '95% customer satisfaction rate',
    'Certified fitness professionals',
    'Evidence-based methodologies',
    '24/7 support availability',
    'Continuous improvement approach',
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            About <span className="gradient-text">FitnessPro</span>
          </h1>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            We&apos;re on a mission to make personalized fitness accessible to everyone. 
            Our comprehensive assessment and expert analysis help you achieve your fitness goals faster and more effectively.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-foreground-muted mb-6">
                To empower individuals with personalized fitness solutions that fit their unique lifestyle, 
                goals, and preferences. We believe that everyone deserves access to expert fitness guidance, 
                regardless of their current fitness level or experience.
              </p>
              <p className="text-lg text-foreground-muted">
                Through our comprehensive assessment process and expert analysis, we eliminate the guesswork 
                from fitness planning and provide you with a clear, actionable roadmap to success.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
              <div className="text-center">
                <div className="w-24 h-24 bg-fitness-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Transform Your Life</h3>
                <p className="text-foreground-muted mb-6">
                  Join thousands who have already transformed their bodies and lives with our personalized approach.
                </p>
                <Button onClick={() => window.location.href = '/questionnaire'}>
                  Start Your Journey
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Values
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              These core values guide everything we do and shape how we serve our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center h-full">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground-muted text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Expert Team
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Our team consists of certified fitness professionals, nutritionists, and wellness experts 
              dedicated to helping you achieve your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Sarah Johnson',
                role: 'Lead Fitness Consultant',
                credentials: 'PhD Exercise Science, ACSM Certified',
              },
              {
                name: 'Mike Chen',
                role: 'Nutrition Specialist',
                credentials: 'MS Nutrition, RD, Sports Nutritionist',
              },
              {
                name: 'Lisa Rodriguez',
                role: 'Wellness Coach',
                credentials: 'NASM-CPT, Wellness Specialist',
              },
            ].map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-foreground-muted">{member.credentials}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Trust Us?
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Our track record speaks for itself. Here&apos;s what makes us a trusted partner in your fitness journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-background rounded-lg p-4 border border-border"
              >
                <CheckCircle size={20} className="text-success flex-shrink-0" />
                <span className="text-foreground">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Start Your Transformation?
          </h2>
          <p className="text-xl text-foreground-secondary mb-8">
            Take our comprehensive assessment and get your personalized fitness plan today.
          </p>
          <Button 
            size="lg"
            onClick={() => window.location.href = '/questionnaire'}
            className="text-lg px-8 py-4"
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;