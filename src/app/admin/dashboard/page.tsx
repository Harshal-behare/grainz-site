'use client';

import React, { useState, useEffect } from 'react';
import { 
  Download, Eye, Search, Calendar, User, 
  Mail, Phone, Briefcase, Target, Heart, Clock,
  FileText, Image as ImageIcon, Activity,
  X, Maximize2, LogOut, RefreshCw, Users, TrendingUp,
  Award, File, CheckCircle
} from 'lucide-react';
import { supabase } from '@/lib/supabase-client';
import { getFormSubmissions, exportToCSV, fetchSubmissionsWithDetails } from '@/lib/form-service';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { FormSubmission } from '@/types/database';

interface BodyMeasurements {
  submission_id: string;
  forearm_in?: number;
  bicep_in?: number;
  shoulder_in?: number;
  chest_in?: number;
  upper_waist_in?: number;
  lower_waist_in?: number;
  belly_button_circumference_in?: number;
  buttocks_in?: number;
  thighs_in?: number;
}

interface FullBodyImage {
  submission_id: string;
  file_url: string;
  view_type: string;
}

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [measurements, setMeasurements] = useState<BodyMeasurements | null>(null);
  const [images, setImages] = useState<FullBodyImage[]>([]);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  // Helper function to check if a URL is an image
  const isImageUrl = (url: string): boolean => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    return imageExtensions.some(ext => url.toLowerCase().includes(ext));
  };

  // Helper function to check if a URL is a PDF
  const isPdfUrl = (url: string): boolean => {
    return url.toLowerCase().includes('.pdf');
  };

  useEffect(() => {
    checkAuth();
    loadSubmissions();
  }, []);

  useEffect(() => {
    filterSubmissions();
  }, [searchTerm, submissions]);

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
      setFilteredSubmissions(data);
    } catch (error) {
      console.error('Error loading submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterSubmissions = () => {
    if (!searchTerm) {
      setFilteredSubmissions(submissions);
      return;
    }

    const filtered = submissions.filter(submission => {
      const searchLower = searchTerm.toLowerCase();
      return (
        submission.user_name?.toLowerCase().includes(searchLower) ||
        submission.email?.toLowerCase().includes(searchLower) ||
        submission.phone_number?.includes(searchTerm) ||
        submission.submission_id?.toLowerCase().includes(searchLower)
      );
    });

    setFilteredSubmissions(filtered);
  };

  const fetchSubmissionDetails = async (submission: FormSubmission) => {
    setSelectedSubmission(submission);
    
    // Fetch measurements
    const { data: measurementData } = await supabase
      .from('body_measurements')
      .select('*')
      .eq('submission_id', submission.submission_id)
      .single();
    
    setMeasurements(measurementData);

    // Fetch images
    const { data: imageData } = await supabase
      .from('full_body_images')
      .select('*')
      .eq('submission_id', submission.submission_id);
    
    setImages(imageData || []);
  };

  const handleExport = async () => {
    try {
      // Show loading state
      const originalText = document.querySelector('.export-button')?.textContent;
      const exportButton = document.querySelector('.export-button');
      if (exportButton) {
        exportButton.textContent = 'Exporting...';
        exportButton.setAttribute('disabled', 'true');
      }
      
      // Fetch complete data with measurements and images
      const completeData = await fetchSubmissionsWithDetails();
      
      // Filter based on current search term
      const filteredCompleteData = completeData.filter(item => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return (
          item.user_name?.toLowerCase().includes(searchLower) ||
          item.email?.toLowerCase().includes(searchLower) ||
          item.phone_number?.includes(searchTerm) ||
          item.submission_id?.toLowerCase().includes(searchLower)
        );
      });
      
      // Export the complete data
      exportToCSV(filteredCompleteData);
      
      // Restore button state
      if (exportButton && originalText) {
        exportButton.textContent = originalText;
        exportButton.removeAttribute('disabled');
      }
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Failed to export data. Please try again.');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin';
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatArray = (arr: string[] | string | null | undefined) => {
    if (!arr) return 'None';
    // Handle if arr is a string (not an array)
    if (typeof arr === 'string') {
      return arr || 'None';
    }
    // Handle array
    if (Array.isArray(arr) && arr.length === 0) return 'None';
    if (Array.isArray(arr)) return arr.join(', ');
    return 'None';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background-secondary border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                <span className="gradient-text">grainZ</span> Admin Dashboard
              </h1>
              <p className="text-foreground-muted text-sm">
                Manage fitness assessment submissions
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-foreground-muted hidden md:inline">
                {user?.email}
              </span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground-muted flex items-center">
                <Users size={16} className="mr-2" />
                Total Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{submissions.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground-muted flex items-center">
                <Calendar size={16} className="mr-2" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {submissions.filter(s => {
                  const date = new Date(s.created_at || '');
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return date > weekAgo;
                }).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground-muted flex items-center">
                <TrendingUp size={16} className="mr-2" />
                With Trainer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {submissions.filter(s => s.has_personal_trainer).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground-muted flex items-center">
                <Award size={16} className="mr-2" />
                Completed Programs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {submissions.filter(s => s.programme_chosen).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-muted" size={20} />
                <input
                  type="text"
                  placeholder="Search by name, email, phone or ID..."
                  className="w-full pl-10 pr-4 py-2 bg-background-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={handleExport} variant="outline" className="export-button">
                <Download size={18} className="mr-2" />
                Export CSV
              </Button>
              <Button onClick={loadSubmissions} variant="outline">
                <RefreshCw size={18} className="mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Submissions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Submissions ({filteredSubmissions.length})</CardTitle>
            <CardDescription>
              Click on any submission to view detailed information
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-foreground-muted">Loading submissions...</p>
              </div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-foreground-muted">No submissions found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium">ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Phone</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Files</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Submitted</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.map((submission) => (
                      <tr key={submission.submission_id} className="border-b border-border hover:bg-background-secondary transition-colors">
                        <td className="py-3 px-4 font-mono text-xs">
                          {submission.submission_id}
                        </td>
                        <td className="py-3 px-4">
                          {submission.user_name || 'N/A'}
                        </td>
                        <td className="py-3 px-4">
                          {submission.email || 'N/A'}
                        </td>
                        <td className="py-3 px-4">
                          {submission.phone_number || 'N/A'}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-1">
                            {submission.blood_report_url && (
                              <div className="group relative">
                                <FileText size={16} className="text-primary" />
                                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                  Blood Report
                                </span>
                              </div>
                            )}
                            {submission.body_composition_report_url && (
                              <div className="group relative">
                                <FileText size={16} className="text-primary" />
                                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                  Body Composition
                                </span>
                              </div>
                            )}
                            {submission.aspiration_image_url && (
                              <div className="group relative">
                                <ImageIcon size={16} className="text-primary" />
                                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                  Aspiration Image
                                </span>
                              </div>
                            )}
                            {!submission.blood_report_url && !submission.body_composition_report_url && !submission.aspiration_image_url && (
                              <span className="text-xs text-foreground-muted">None</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-foreground-muted">
                          {formatDate(submission.created_at || null)}
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => fetchSubmissionDetails(submission)}
                          >
                            <Eye size={16} className="mr-1" />
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

      {/* Detailed View Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Submission Details</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedSubmission(null);
                  setMeasurements(null);
                  setImages([]);
                }}
              >
                <X size={20} />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User size={20} className="mr-2" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-foreground-muted">Your Name</label>
                    <p className="font-medium">{selectedSubmission.user_name || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-foreground-muted">Email Address</label>
                    <p className="font-medium">{selectedSubmission.email || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-foreground-muted">Phone Number</label>
                    <p className="font-medium">{selectedSubmission.phone_number || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-foreground-muted">Profession</label>
                    <p className="font-medium">{selectedSubmission.profession || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-foreground-muted">Programme Start Date</label>
                    <p className="font-medium">{selectedSubmission.programme_start_date || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-foreground-muted">Programme Chosen</label>
                    <p className="font-medium">{selectedSubmission.programme_chosen || 'N/A'}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Fitness Goals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target size={20} className="mr-2" />
                    Fitness Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-foreground-muted">Fitness Goal (6 Months)</label>
                    <p className="font-medium">{selectedSubmission.fitness_goal_6_months || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-foreground-muted">Long-term Fitness Goal</label>
                    <p className="font-medium">{selectedSubmission.fitness_goal_long_term || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-foreground-muted">Target Body Areas</label>
                    <p className="font-medium">{selectedSubmission.target_body_areas || 'N/A'}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Health & Workout */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity size={20} className="mr-2" />
                    Health & Workout Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-sm text-foreground-muted">Medical Issues/Food Allergies</label>
                    <p className="font-medium">{selectedSubmission.medical_issues_allergies || 'None'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-foreground-muted">Resting Heart Rate</label>
                    <p className="font-medium">{selectedSubmission.resting_heart_rate ? `${selectedSubmission.resting_heart_rate} BPM` : 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-foreground-muted">Has Personal Trainer</label>
                    <p className="font-medium">{selectedSubmission.has_personal_trainer ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-foreground-muted">Preferred Workout Time</label>
                    <p className="font-medium">{selectedSubmission.preferred_workout_time || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-foreground-muted">Alcohol/Smoke Frequency</label>
                    <p className="font-medium">{selectedSubmission.alcohol_smoke_frequency || 'N/A'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-foreground-muted">Current Workout Plan</label>
                    <p className="font-medium whitespace-pre-wrap">{selectedSubmission.current_workout_plan || 'N/A'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-foreground-muted">Daily Schedule with Timings</label>
                    <p className="font-medium whitespace-pre-wrap">{selectedSubmission.daily_schedule || 'N/A'}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Diet Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText size={20} className="mr-2" />
                    Diet Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-foreground-muted">Current Diet Timetable</label>
                    <p className="font-medium whitespace-pre-wrap">{selectedSubmission.current_diet_timetable || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-foreground-muted">High Calorie Favourite Foods</label>
                    <p className="font-medium">{formatArray(selectedSubmission.high_calorie_favourite_foods)}</p>
                  </div>
                  <div>
                    <label className="text-sm text-foreground-muted">Other High Calorie Sweets</label>
                    <p className="font-medium">{selectedSubmission.other_high_calorie_sweets || 'None'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-foreground-muted">Preferred Foods to Include</label>
                    <p className="font-medium">{formatArray(selectedSubmission.preferred_included_foods)}</p>
                  </div>
                  <div>
                    <label className="text-sm text-foreground-muted">Foods You Despise</label>
                    <p className="font-medium">{formatArray(selectedSubmission.foods_despised)}</p>
                  </div>
                  <div>
                    <label className="text-sm text-foreground-muted">Favourite Fruits</label>
                    <p className="font-medium">{formatArray(selectedSubmission.favourite_fruits)}</p>
                  </div>
                  <div>
                    <label className="text-sm text-foreground-muted">Favourite Vegetables</label>
                    <p className="font-medium">{formatArray(selectedSubmission.favourite_vegetables)}</p>
                  </div>
                  <div>
                    <label className="text-sm text-foreground-muted">Diet Habits</label>
                    <p className="font-medium">{formatArray(selectedSubmission.diet_habits)}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Body Measurements */}
              {measurements && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity size={20} className="mr-2" />
                      Body Measurements (inches)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm text-foreground-muted">Forearm</label>
                        <p className="font-medium">{measurements.forearm_in || 'N/A'}"</p>
                      </div>
                      <div>
                        <label className="text-sm text-foreground-muted">Bicep</label>
                        <p className="font-medium">{measurements.bicep_in || 'N/A'}"</p>
                      </div>
                      <div>
                        <label className="text-sm text-foreground-muted">Shoulder</label>
                        <p className="font-medium">{measurements.shoulder_in || 'N/A'}"</p>
                      </div>
                      <div>
                        <label className="text-sm text-foreground-muted">Chest</label>
                        <p className="font-medium">{measurements.chest_in || 'N/A'}"</p>
                      </div>
                      <div>
                        <label className="text-sm text-foreground-muted">Upper Waist</label>
                        <p className="font-medium">{measurements.upper_waist_in || 'N/A'}"</p>
                      </div>
                      <div>
                        <label className="text-sm text-foreground-muted">Lower Waist</label>
                        <p className="font-medium">{measurements.lower_waist_in || 'N/A'}"</p>
                      </div>
                      <div>
                        <label className="text-sm text-foreground-muted">Belly Button</label>
                        <p className="font-medium">{measurements.belly_button_circumference_in || 'N/A'}"</p>
                      </div>
                      <div>
                        <label className="text-sm text-foreground-muted">Buttocks</label>
                        <p className="font-medium">{measurements.buttocks_in || 'N/A'}"</p>
                      </div>
                      <div>
                        <label className="text-sm text-foreground-muted">Thighs</label>
                        <p className="font-medium">{measurements.thighs_in || 'N/A'}"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

{/* Uploaded Files */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText size={20} className="mr-2" />
                    Uploaded Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedSubmission.blood_report_url && (
                    <div className="relative group">
                      {isImageUrl(selectedSubmission.blood_report_url) ? (
                        <>
                          <img
                            src={selectedSubmission.blood_report_url}
                            alt="Blood Report"
                            className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setExpandedImage(selectedSubmission.blood_report_url || null)}
                          />
                          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                            Blood Report
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="sm" variant="ghost" className="bg-black/50 text-white hover:bg-black/70">
                              <Maximize2 size={16} />
                            </Button>
                          </div>
                        </>
                      ) : (
                        <a
                          href={selectedSubmission.blood_report_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <div className="w-full h-48 bg-background-secondary rounded-lg flex flex-col items-center justify-center hover:bg-background-tertiary transition-colors">
                            <File size={48} className="text-foreground-muted mb-2" />
                            <span className="text-sm font-medium">Blood Report</span>
                            <span className="text-xs text-foreground-muted mt-1">PDF Document</span>
                            <span className="text-xs text-primary mt-2">Click to view</span>
                          </div>
                        </a>
                      )}
                    </div>
                  )}
                  {selectedSubmission.body_composition_report_url && (
                    <div className="relative group">
                      {isImageUrl(selectedSubmission.body_composition_report_url) ? (
                        <>
                          <img
                            src={selectedSubmission.body_composition_report_url}
                            alt="Body Composition Report"
                            className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setExpandedImage(selectedSubmission.body_composition_report_url || null)}
                          />
                          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                            Body Composition
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="sm" variant="ghost" className="bg-black/50 text-white hover:bg-black/70">
                              <Maximize2 size={16} />
                            </Button>
                          </div>
                        </>
                      ) : (
                        <a
                          href={selectedSubmission.body_composition_report_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <div className="w-full h-48 bg-background-secondary rounded-lg flex flex-col items-center justify-center hover:bg-background-tertiary transition-colors">
                            <File size={48} className="text-foreground-muted mb-2" />
                            <span className="text-sm font-medium">Body Composition</span>
                            <span className="text-xs text-foreground-muted mt-1">PDF Document</span>
                            <span className="text-xs text-primary mt-2">Click to view</span>
                          </div>
                        </a>
                      )}
                    </div>
                  )}
                  {selectedSubmission.aspiration_image_url && (
                    <div className="relative group">
                      {isImageUrl(selectedSubmission.aspiration_image_url) ? (
                        <>
                          <img
                            src={selectedSubmission.aspiration_image_url}
                            alt="Aspiration Body Image"
                            className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setExpandedImage(selectedSubmission.aspiration_image_url || null)}
                          />
                          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                            Aspiration Image
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="sm" variant="ghost" className="bg-black/50 text-white hover:bg-black/70">
                              <Maximize2 size={16} />
                            </Button>
                          </div>
                        </>
                      ) : (
                        <a
                          href={selectedSubmission.aspiration_image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <div className="w-full h-48 bg-background-secondary rounded-lg flex flex-col items-center justify-center hover:bg-background-tertiary transition-colors">
                            <File size={48} className="text-foreground-muted mb-2" />
                            <span className="text-sm font-medium">Aspiration Document</span>
                            <span className="text-xs text-foreground-muted mt-1">PDF Document</span>
                            <span className="text-xs text-primary mt-2">Click to view</span>
                          </div>
                        </a>
                      )}
                    </div>
                  )}
                  {!selectedSubmission.blood_report_url && !selectedSubmission.body_composition_report_url && !selectedSubmission.aspiration_image_url && (
                    <p className="text-foreground-muted col-span-full text-center">No documents uploaded</p>
                  )}
                </CardContent>
              </Card>

              {/* Body Images */}
              {images.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ImageIcon size={20} className="mr-2" />
                      Full Body Images
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image.file_url}
                            alt={`${image.view_type} view`}
                            className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setExpandedImage(image.file_url)}
                          />
                          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                            {image.view_type}
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white hover:bg-black/70"
                            onClick={() => setExpandedImage(image.file_url)}
                          >
                            <Maximize2 size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Submission Metadata */}
              <Card>
                <CardHeader>
                  <CardTitle>Submission Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Submission ID:</span>
                    <span className="font-mono">{selectedSubmission.submission_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Submitted At:</span>
                    <span>{formatDate(selectedSubmission.created_at || null)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">IP Address:</span>
                    <span>{selectedSubmission.ip_address || 'N/A'}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Image Modal */}
      {expandedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={expandedImage}
              alt="Expanded view"
              className="max-w-full max-h-full object-contain"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setExpandedImage(null)}
            >
              <X size={24} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
