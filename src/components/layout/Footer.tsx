import React from 'react';
// import Link from 'next/link';
// import { Dumbbell, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Commented out as requested - keeping data structure for future use
  /*
  const footerLinks = {
    company: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Assessment', href: '/questionnaire' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Get Started', href: '/questionnaire' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
  ];
  */

  return (
    <footer className="bg-background-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

        <div className="text-center">
          <p className="text-foreground-muted text-sm">
            © {currentYear} grainZ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;