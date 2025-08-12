'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Home, 
  User, 
  Activity, 
  Target, 
  Calendar, 
  BarChart3, 
  Settings, 
  Menu,
  X,
  Dumbbell,
  Apple,
  Trophy,
  FileText
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/dashboard' },
  { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
  { id: 'workouts', label: 'Workouts', icon: Dumbbell, href: '/workouts' },
  { id: 'nutrition', label: 'Nutrition', icon: Apple, href: '/nutrition' },
  { id: 'goals', label: 'Goals', icon: Target, href: '/goals' },
  { id: 'progress', label: 'Progress', icon: Activity, href: '/progress' },
  { id: 'calendar', label: 'Calendar', icon: Calendar, href: '/calendar' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/analytics' },
  { id: 'achievements', label: 'Achievements', icon: Trophy, href: '/achievements' },
  { id: 'reports', label: 'Reports', icon: FileText, href: '/reports' },
];

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-background-secondary border border-border rounded-lg"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed left-0 top-0 h-full bg-background-secondary border-r border-border z-50 transition-all duration-300',
          isCollapsed ? 'w-16' : 'w-64',
          'lg:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-fitness-gradient rounded-lg flex items-center justify-center">
                <Dumbbell size={18} className="text-white" />
              </div>
              <h1 className="text-lg font-bold gradient-text">GrainZ</h1>
            </div>
          )}
          
          {/* Mobile close button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1"
          >
            <X size={20} />
          </button>
          
          {/* Desktop collapse button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:block p-1 hover:bg-background-tertiary rounded"
          >
            <Menu size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={cn(
                  'w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all',
                  'hover:bg-background-tertiary',
                  isActive && 'bg-primary/10 text-primary border border-primary/20',
                  isCollapsed && 'justify-center'
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon size={20} className={cn(isActive && 'text-primary')} />
                {!isCollapsed && (
                  <span className={cn('font-medium', isActive && 'text-primary')}>
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-border">
          <div className={cn(
            'flex items-center space-x-3',
            isCollapsed && 'justify-center'
          )}>
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">JD</span>
            </div>
            {!isCollapsed && (
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-foreground-muted">Premium Member</p>
              </div>
            )}
          </div>
          
          {!isCollapsed && (
            <button className="w-full mt-3 flex items-center space-x-2 px-3 py-2 text-sm text-foreground-muted hover:text-foreground hover:bg-background-tertiary rounded-lg transition-all">
              <Settings size={16} />
              <span>Settings</span>
            </button>
          )}
        </div>
      </div>

      {/* Main content spacer for desktop */}
      <div className={cn(
        'hidden lg:block',
        isCollapsed ? 'w-16' : 'w-64'
      )} />
    </>
  );
};

export default Sidebar;