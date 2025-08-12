'use client';

import React, { useState, useEffect } from 'react';
import { LogIn, Mail, Lock } from 'lucide-react';
import { supabase } from '@/lib/supabase-client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const AdminPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(`Login failed: ${error.message}`);
        return;
      }

      if (data.user) {
        // Redirect to admin dashboard
        window.location.href = '/admin/dashboard';
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Welcome Back!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-foreground-muted">
              Logged in as: {user.email}
            </p>
            <div className="space-y-2">
              <Button 
                onClick={() => window.location.href = '/admin/dashboard'}
                className="w-full"
              >
                Go to Dashboard
              </Button>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="w-full"
              >
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn size={24} className="text-primary" />
          </div>
          <CardTitle className="text-center text-2xl">Admin Login</CardTitle>
          <p className="text-center text-foreground-muted">
            Access the admin dashboard to manage form submissions
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              label="Email"
              placeholder="admin@grainz.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <Button
              type="submit"
              className="w-full"
              isLoading={loading}
              disabled={!email || !password}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-foreground-muted">
              Don&apos;t have an account? Contact your system administrator.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;