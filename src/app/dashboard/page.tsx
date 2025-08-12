'use client';

import React from 'react';
import { 
  Activity, 
  Target, 
  TrendingUp, 
  Calendar, 
  Award, 
  Clock,
  Flame,
  Dumbbell,
  Apple,
  Users
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Progress from '@/components/ui/Progress';
import Button from '@/components/ui/Button';

const DashboardPage: React.FC = () => {
  const stats = [
    { 
      title: 'Calories Burned', 
      value: '2,847', 
      change: '+12%', 
      icon: Flame,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10'
    },
    { 
      title: 'Workouts This Week', 
      value: '4', 
      change: '+2', 
      icon: Dumbbell,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    { 
      title: 'Weight Progress', 
      value: '-2.3kg', 
      change: 'On track', 
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    { 
      title: 'Streak Days', 
      value: '15', 
      change: 'Personal best!', 
      icon: Award,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
  ];

  const todayWorkout = {
    name: 'Upper Body Strength',
    duration: '45 min',
    exercises: 8,
    difficulty: 'Intermediate',
    completed: false,
  };

  const recentActivities = [
    { id: 1, type: 'workout', title: 'Completed Full Body Workout', time: '2 hours ago', icon: Dumbbell },
    { id: 2, type: 'nutrition', title: 'Logged breakfast - 420 cal', time: '6 hours ago', icon: Apple },
    { id: 3, type: 'progress', title: 'New personal record: 20 push-ups!', time: '1 day ago', icon: Award },
    { id: 4, type: 'milestone', title: 'Completed Week 3 of program', time: '2 days ago', icon: Target },
  ];

  const weeklyGoals = [
    { name: 'Workouts', current: 4, target: 5, unit: 'sessions' },
    { name: 'Calories', current: 2847, target: 3500, unit: 'kcal' },
    { name: 'Water', current: 6.5, target: 8, unit: 'glasses' },
    { name: 'Sleep', current: 7.2, target: 8, unit: 'hours' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, <span className="gradient-text">John!</span>
          </h1>
          <p className="text-foreground-muted">
            Ready to crush your fitness goals today? Let&apos;s see your progress.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="dashboard-grid mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-foreground-muted">
                    {stat.title}
                  </CardTitle>
                  <div className={`w-8 h-8 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <Icon size={16} className={stat.color} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-foreground-muted mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Today's Workout */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar size={20} className="text-primary" />
                <span>Today&apos;s Workout</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!todayWorkout.completed ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {todayWorkout.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-foreground-muted">
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{todayWorkout.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Activity size={14} />
                        <span>{todayWorkout.exercises} exercises</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Target size={14} />
                        <span>{todayWorkout.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">
                    Start Workout
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award size={48} className="mx-auto text-success mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Great job! 🎉
                  </h3>
                  <p className="text-foreground-muted">
                    You&apos;ve completed today&apos;s workout. Rest and recover!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Weekly Goals */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {weeklyGoals.map((goal, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{goal.name}</span>
                    <span className="text-foreground-muted">
                      {goal.current}/{goal.target} {goal.unit}
                    </span>
                  </div>
                  <Progress value={goal.current} max={goal.target} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon size={16} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{activity.title}</p>
                        <p className="text-xs text-foreground-muted">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button variant="ghost" className="w-full mt-4">
                View All Activity
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="secondary" className="w-full justify-start">
                  <Dumbbell size={16} className="mr-3" />
                  Log a Workout
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  <Apple size={16} className="mr-3" />
                  Log Nutrition
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  <Activity size={16} className="mr-3" />
                  Update Progress
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  <Users size={16} className="mr-3" />
                  Connect with Coach
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;