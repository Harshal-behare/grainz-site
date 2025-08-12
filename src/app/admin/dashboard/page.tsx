'use client';

import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Users, 
  FileText, 
  Calendar,
  Search,
  Filter,
  LogOut,
  RefreshCw,
  Eye,
  Mail,
  Phone
} from 'lucide-react';
import { supabase } from '@/lib/supabase-client';
import { getFormSubmissions, exportToCSV } from '@/lib/form-service';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { FormSubmission } from '@/types/database';

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);

  useEffect(() => {
    checkAuth();
    loadSubmissions();
  }, []);

  useEffect(() => {
    // Filter submissions based on search term
    const filtered = submissions.filter(submission => 
      submission.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.submission_id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubmissions(filtered);
  }, [submissions, searchTerm]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = '/admin';
      return;
    }
    setUser(user);
  };

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const data = await getFormSubmissions();
      setSubmissions(data);
    } catch (error) {
      console.error('Error loading submissions:', error);
      alert('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (filteredSubmissions.length === 0) {
      alert('No data to export');
      return;
    }
    
    const timestamp = new Date().toISOString().split('T')[0];
    exportToCSV(filteredSubmissions, `fitness-submissions-${timestamp}.csv`);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = [
    { 
      title: 'Total Submissions', 
      value: submissions.length.toString(), 
      icon: Users,
      color: 'text-blue-400'
    },
    { 
      title: 'Today', 
      value: submissions.filter(s => 
        new Date(s.submitted_at || '').toDateString() === new Date().toDateString()
      ).length.toString(), 
      icon: Calendar,
      color: 'text-green-400'
    },
    { 
      title: 'This Week', 
      value: submissions.filter(s => {
        const submissionDate = new Date(s.submitted_at || '');
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return submissionDate >= weekAgo;
      }).length.toString(), 
      icon: FileText,
      color: 'text-purple-400'
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-foreground-muted">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-foreground-muted">
                Manage fitness assessment submissions
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-foreground-muted">
                Welcome, {user?.email}
              </span>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="flex items-center p-6">
                  <div className="mr-4">
                    <Icon size={24} className={stat.color} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-foreground-muted">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={loadSubmissions}
              variant="outline"
              size="sm"
            >
              <RefreshCw size={16} className="mr-2" />
              Refresh
            </Button>
            <Button
              onClick={handleExport}
              size="sm"
            >
              <Download size={16} className="mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Submissions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions ({filteredSubmissions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredSubmissions.length === 0 ? (
              <div className="text-center py-8">
                <FileText size={48} className="mx-auto text-foreground-muted mb-4" />
                <p className="text-foreground-muted">No submissions found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4">Submission ID</th>
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Phone</th>
                      <th className="text-left py-3 px-4">Submitted</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.map((submission) => (
                      <tr key={submission.id} className="border-b border-border hover:bg-background-secondary">
                        <td className="py-3 px-4 font-mono text-xs">
                          {submission.submission_id}
                        </td>
                        <td className="py-3 px-4">
                          {submission.user_name || 'N/A'}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Mail size={14} className="mr-2 text-foreground-muted" />
                            {submission.email || 'N/A'}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Phone size={14} className="mr-2 text-foreground-muted" />
                            {submission.phone_number || 'N/A'}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-foreground-muted">
                          {submission.submitted_at ? formatDate(submission.submitted_at) : 'N/A'}
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            onClick={() => setSelectedSubmission(submission)}
                            size="sm"
                            variant="outline"
                          >
                            <Eye size={14} className="mr-1" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background-secondary rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Submission Details</h2>
                <Button
                  onClick={() => setSelectedSubmission(null)}
                  variant="outline"
                  size="sm"
                >
                  Close
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Basic Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>ID:</strong> {selectedSubmission.submission_id}</p>
                    <p><strong>Name:</strong> {selectedSubmission.user_name || 'N/A'}</p>
                    <p><strong>Email:</strong> {selectedSubmission.email || 'N/A'}</p>
                    <p><strong>Phone:</strong> {selectedSubmission.phone_number || 'N/A'}</p>
                    <p><strong>Profession:</strong> {selectedSubmission.profession || 'N/A'}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Goals</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>6-month goal:</strong> {selectedSubmission.fitness_goal_6_months || 'N/A'}</p>
                    <p><strong>Long-term goal:</strong> {selectedSubmission.fitness_goal_long_term || 'N/A'}</p>
                    <p><strong>Target areas:</strong> {selectedSubmission.target_body_areas || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;