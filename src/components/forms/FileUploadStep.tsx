import React, { useState } from 'react';
import { FormStepProps, FullBodyImage } from '@/types/fitness';
import { Upload, FileText, Image, Loader2, X, AlertCircle, Camera } from 'lucide-react';
import { uploadFile } from '@/lib/form-service';

const FileUploadStep: React.FC<FormStepProps> = ({ data, updateData }) => {
  const [uploadingFiles, setUploadingFiles] = useState<Record<string, boolean>>({});
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [uploadErrors, setUploadErrors] = useState<Record<string, string>>({});

  // Maximum file size in bytes (10MB)
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const validateFile = (file: File, acceptedTypes: string[]): string | null => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return `File size must be less than 10MB. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`;
    }

    // Check file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const validExtensions = acceptedTypes.map(type => type.replace('.', ''));
    if (!fileExtension || !validExtensions.includes(fileExtension)) {
      return `Invalid file type. Accepted types: ${acceptedTypes.join(', ')}`;
    }

    return null;
  };

  const handleFileUpload = async (type: 'blood_report' | 'body_composition' | 'aspiration_image', file: File) => {
    // Validate file
    const acceptedTypes = type === 'aspiration_image' ? ['.jpg', '.jpeg', '.png'] : ['.pdf', '.jpg', '.jpeg', '.png'];
    const validationError = validateFile(file, acceptedTypes);
    if (validationError) {
      setUploadErrors({ ...uploadErrors, [type]: validationError });
      return;
    }

    // Clear any previous errors
    setUploadErrors({ ...uploadErrors, [type]: '' });
    setUploadingFiles({ ...uploadingFiles, [type]: true });
    setUploadProgress({ ...uploadProgress, [type]: 0 });

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const current = prev[type] || 0;
          if (current >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return { ...prev, [type]: current + 10 };
        });
      }, 200);

      const publicUrl = await uploadFile(file, 'fitness-uploads');
      
      clearInterval(progressInterval);
      setUploadProgress({ ...uploadProgress, [type]: 100 });

      updateData({
        files: {
          ...data.files,
          [`${type}_url`]: publicUrl,
        },
      });

      // Clear progress after a short delay
      setTimeout(() => {
        setUploadProgress({ ...uploadProgress, [type]: 0 });
      }, 1000);
    } catch (error: any) {
      console.error(`Failed to upload ${type}:`, error);
      setUploadErrors({ ...uploadErrors, [type]: error.message || 'Upload failed' });
    } finally {
      setUploadingFiles({ ...uploadingFiles, [type]: false });
    }
  };

  const handleBodyImageUpload = async (file: File, view: 'front' | 'rear' | 'side_left' | 'side_right') => {
    const validationError = validateFile(file, ['.jpg', '.jpeg', '.png']);
    if (validationError) {
      setUploadErrors({ ...uploadErrors, [`body_${view}`]: validationError });
      return;
    }

    setUploadErrors({ ...uploadErrors, [`body_${view}`]: '' });
    setUploadingFiles({ ...uploadingFiles, [`body_${view}`]: true });
    setUploadProgress({ ...uploadProgress, [`body_${view}`]: 0 });

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const current = prev[`body_${view}`] || 0;
          if (current >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return { ...prev, [`body_${view}`]: current + 10 };
        });
      }, 200);

      const publicUrl = await uploadFile(file, 'body-images');
      
      clearInterval(progressInterval);
      setUploadProgress({ ...uploadProgress, [`body_${view}`]: 100 });

      // Update images array
      const currentImages = data.images || [];
      const existingIndex = currentImages.findIndex(img => img.view === view);
      const newImage: FullBodyImage = {
        id: `${view}_${Date.now()}`,
        user_id: '', // Will be set during submission
        file_url: publicUrl,
        view,
        uploaded_at: new Date(),
      };

      if (existingIndex >= 0) {
        currentImages[existingIndex] = newImage;
      } else {
        currentImages.push(newImage);
      }

      updateData({ images: currentImages });

      setTimeout(() => {
        setUploadProgress({ ...uploadProgress, [`body_${view}`]: 0 });
      }, 1000);
    } catch (error: any) {
      console.error(`Failed to upload body image ${view}:`, error);
      setUploadErrors({ ...uploadErrors, [`body_${view}`]: error.message || 'Upload failed' });
    } finally {
      setUploadingFiles({ ...uploadingFiles, [`body_${view}`]: false });
    }
  };

  const removeFile = (type: string) => {
    if (type.startsWith('body_')) {
      const view = type.replace('body_', '');
      const currentImages = data.images || [];
      const filteredImages = currentImages.filter(img => img.view !== view);
      updateData({ images: filteredImages });
    } else {
      updateData({
        files: {
          ...data.files,
          [`${type}_url`]: undefined,
        },
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <p className="text-foreground-muted">
          These uploads are optional but help us create a more personalized plan for you.
        </p>
      </div>

      <div className="space-y-6">
        {/* Blood Report */}
        <div className="border-2 border-dashed border-border rounded-lg p-6 relative">
          <div className="text-center">
            <FileText size={48} className="mx-auto text-foreground-muted mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Blood Report (Optional)
            </h3>
            <p className="text-sm text-foreground-muted mb-4">
              Upload your recent blood test results to help us understand your health baseline.
            </p>
            
            {uploadingFiles['blood_report'] && (
              <div className="mb-4">
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Uploading...</span>
                </div>
                {uploadProgress['blood_report'] > 0 && (
                  <div className="w-full bg-background-tertiary rounded-full h-2 mt-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress['blood_report']}%` }}
                    />
                  </div>
                )}
              </div>
            )}
            
            {uploadErrors['blood_report'] && (
              <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg">
                <div className="flex items-center space-x-2 text-error">
                  <AlertCircle size={16} />
                  <span className="text-sm">{uploadErrors['blood_report']}</span>
                </div>
              </div>
            )}
            
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload('blood_report', file);
                e.target.value = ''; // Reset input
              }}
              className="hidden"
              id="blood-report"
              disabled={uploadingFiles['blood_report']}
            />
            <label
              htmlFor="blood-report"
              className={`inline-flex items-center justify-center px-4 py-2 border rounded-lg cursor-pointer transition-colors ${
                uploadingFiles['blood_report'] 
                  ? 'bg-background-tertiary border-border text-foreground-muted cursor-not-allowed' 
                  : 'bg-background-secondary border-border text-foreground hover:bg-background-tertiary'
              }`}
            >
              <Upload size={16} className="mr-2" />
              {uploadingFiles['blood_report'] ? 'Uploading...' : 'Upload Blood Report'}
            </label>
            
            {data.files?.blood_report_url && !uploadingFiles['blood_report'] && (
              <div className="mt-4">
                <p className="text-xs text-success mb-2">✓ File uploaded successfully</p>
                <button
                  onClick={() => removeFile('blood_report')}
                  className="text-xs text-foreground-muted hover:text-error transition-colors"
                >
                  Remove file
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Body Composition */}
        <div className="border-2 border-dashed border-border rounded-lg p-6">
          <div className="text-center">
            <FileText size={48} className="mx-auto text-foreground-muted mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Body Composition Report (Optional)
            </h3>
            <p className="text-sm text-foreground-muted mb-4">
              Upload your DEXA scan, InBody, or other body composition analysis.
            </p>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload('body_composition', file);
              }}
              className="hidden"
              id="body-composition"
            />
            <label
              htmlFor="body-composition"
              className="inline-flex items-center justify-center px-4 py-2 bg-background-secondary border border-border rounded-lg text-foreground hover:bg-background-tertiary cursor-pointer"
            >
              <Upload size={16} className="mr-2" />
              Upload Body Composition
            </label>
            {data.files?.body_composition_report_url && (
              <p className="text-xs text-success mt-2">✓ File uploaded successfully</p>
            )}
          </div>
        </div>

        {/* Aspiration Image */}
        <div className="border-2 border-dashed border-border rounded-lg p-6">
          <div className="text-center">
            <Image size={48} className="mx-auto text-foreground-muted mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Goal Physique Image (Optional)
            </h3>
            <p className="text-sm text-foreground-muted mb-4">
              Upload an image of the physique you aspire to achieve.
            </p>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload('aspiration_image', file);
              }}
              className="hidden"
              id="aspiration-image"
            />
            <label
              htmlFor="aspiration-image"
              className="inline-flex items-center justify-center px-4 py-2 bg-background-secondary border border-border rounded-lg text-foreground hover:bg-background-tertiary cursor-pointer"
            >
              <Upload size={16} className="mr-2" />
              Upload Goal Image
            </label>
            {data.files?.aspiration_image_url && (
              <p className="text-xs text-success mt-2">✓ File uploaded successfully</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-background-tertiary rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-2">
          🔐 File Security & Privacy
        </h4>
        <ul className="text-sm text-foreground-muted space-y-1">
          <li>• All files are encrypted and stored securely</li>
          <li>• Only you and your assigned coach can access these files</li>
          <li>• You can delete uploaded files anytime from your profile</li>
          <li>• We never share your files with third parties</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUploadStep;