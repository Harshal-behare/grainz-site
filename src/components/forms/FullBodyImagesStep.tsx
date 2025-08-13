import React, { useState } from 'react';
import { FormStepProps, FullBodyImage } from '@/types/fitness';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase-client';

const viewTypes = [
  { id: 'front', label: 'Front View', emoji: '👤' },
  { id: 'rear', label: 'Rear View', emoji: '🔙' },
  { id: 'side_left', label: 'Left Side', emoji: '⬅️' },
  { id: 'side_right', label: 'Right Side', emoji: '➡️' },
  { id: 'other', label: 'Other', emoji: '📸' },
];

interface ImageUpload {
  id: string;
  file: File | null;
  preview: string;
  view: 'front' | 'rear' | 'side_left' | 'side_right' | 'other';
  progress: number;
  isUploading: boolean;
}

const FullBodyImagesStep: React.FC<FormStepProps> = ({ data, updateData }) => {
  const [uploads, setUploads] = useState<ImageUpload[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, uploadId: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploads(prev => 
        prev.map(upload => 
          upload.id === uploadId 
            ? { ...upload, file, preview: reader.result as string, isUploading: true }
            : upload
        )
      );

      // Upload to Supabase
      uploadImageToSupabase(file, uploadId);
    };
    reader.readAsDataURL(file);
  };

  // Upload image to Supabase with progress tracking
  const uploadImageToSupabase = async (file: File, uploadId: string) => {
    try {
      // Update progress to show upload started
      setUploads(prev => 
        prev.map(upload => 
          upload.id === uploadId 
            ? { ...upload, progress: 10 }
            : upload
        )
      );

      // Generate unique filename with proper naming convention
      const fileExt = file.name.split('.').pop();
      const fileName = `${uploadId}_${Date.now()}.${fileExt}`;
      const filePath = `body-images/${fileName}`;

      // Upload to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('fitness-uploads')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Update progress to 50%
      setUploads(prev => 
        prev.map(upload => 
          upload.id === uploadId 
            ? { ...upload, progress: 50 }
            : upload
        )
      );

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('fitness-uploads')
        .getPublicUrl(filePath);

      const currentUpload = uploads.find(u => u.id === uploadId);
      const viewType = currentUpload?.view || 'other';

      // Create image record
      const newImage: FullBodyImage = {
        id: uploadId,
        user_id: 'current-user', // This should be replaced with actual user ID
        file_url: urlData.publicUrl,
        view: viewType,
        uploaded_at: new Date(),
      };

      // Update progress to 100%
      setUploads(prev => 
        prev.map(upload => 
          upload.id === uploadId 
            ? { ...upload, progress: 100, isUploading: false }
            : upload
        )
      );

      // Update form data
      const currentImages = data.images || [];
      const updatedImages = currentImages.filter(img => img.id !== uploadId);
      updatedImages.push(newImage);
      
      updateData({
        images: updatedImages,
      });

    } catch (error) {
      console.error('Upload error:', error);
      alert(`Failed to upload image: ${error.message}`);
      
      // Reset upload state on error
      setUploads(prev => 
        prev.map(upload => 
          upload.id === uploadId 
            ? { ...upload, progress: 0, isUploading: false, file: null, preview: '' }
            : upload
        )
      );
    }
  };

  const handleViewChange = (uploadId: string, view: ImageUpload['view']) => {
    setUploads(prev =>
      prev.map(upload =>
        upload.id === uploadId ? { ...upload, view } : upload
      )
    );

    // Update data
    const currentImages = data.images || [];
    const updatedImages = currentImages.map(img =>
      img.id === uploadId ? { ...img, view } : img
    );
    updateData({ images: updatedImages });
  };

  const addNewUpload = () => {
    const newUpload: ImageUpload = {
      id: `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file: null,
      preview: '',
      view: 'front',
      progress: 0,
      isUploading: false,
    };
    if (uploads.length < 5) {
      setUploads(prev => [...prev, newUpload]);
    } else {
      alert('You can only upload up to 5 images.');
    }
  };

  const removeUpload = (uploadId: string) => {
    setUploads(prev => prev.filter(upload => upload.id !== uploadId));
    
    // Update data
    const currentImages = data.images || [];
    const updatedImages = currentImages.filter(img => img.id !== uploadId);
    updateData({ images: updatedImages });
  };

  // Initialize with at least one upload slot
  React.useEffect(() => {
    if (uploads.length === 0) {
      addNewUpload();
    }
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">Upload Full Body Photos</h3>
        <p className="text-foreground-muted">
          Upload photos from different angles to help us track your progress. 
          Photos are kept strictly confidential.
        </p>
      </div>

      <div className="space-y-6">
        {uploads.map((upload) => (
          <div key={upload.id} className="space-y-4 p-6 bg-background-secondary rounded-lg">
            {/* View Type Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">Select View Type</label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                {viewTypes.map((viewType) => (
                  <button
                    key={viewType.id}
                    type="button"
                    onClick={() => handleViewChange(upload.id, viewType.id as ImageUpload['view'])}
                    className={cn(
                      'p-3 rounded-lg text-center transition-all',
                      'border border-foreground-muted/20',
                      upload.view === viewType.id
                        ? 'bg-primary text-white border-primary'
                        : 'bg-background hover:bg-background-tertiary'
                    )}
                  >
                    <div className="text-xl mb-1">{viewType.emoji}</div>
                    <div className="text-xs">{viewType.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="text-sm font-medium mb-2 block">Upload Photo</label>
              <div className="relative">
                {upload.preview ? (
                  <div className="relative">
                    <img
                      src={upload.preview}
                      alt={`Body photo - ${upload.view}`}
                      className="w-full max-h-64 object-contain rounded-lg bg-background"
                      style={{ opacity: upload.progress < 100 ? 0.5 : 1 }}
                    />
                    {upload.isUploading && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="mb-2">
                            <svg className="animate-spin h-8 w-8 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </div>
                          <div className="text-white font-semibold">{upload.progress}%</div>
                        </div>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeUpload(upload.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <span className="sr-only">Remove</span>
                      ✕
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor={`file-${upload.id}`}
                    className={cn(
                      'flex flex-col items-center justify-center',
                      'w-full h-48 rounded-lg cursor-pointer',
                      'bg-background border-2 border-dashed border-foreground-muted/30',
                      'hover:border-primary hover:bg-background-tertiary transition-all'
                    )}
                  >
                    <div className="text-4xl mb-2">📷</div>
                    <span className="text-sm text-foreground-muted">Click to upload photo</span>
                    <span className="text-xs text-foreground-muted mt-1">JPG, PNG up to 5MB</span>
                  </label>
                )}
                <input
                  id={`file-${upload.id}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e, upload.id)}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {uploads.length < 5 && (
        <button
          type="button"
          onClick={addNewUpload}
          disabled={isProcessing}
          className="w-full p-4 rounded-lg border-2 border-dashed border-foreground-muted/30 hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-primary">+ Add Another Photo ({uploads.length}/5)</span>
        </button>
      )}

      <div className="bg-background-tertiary rounded-lg p-4 space-y-3">
        <p className="text-sm text-foreground-muted">
          💡 <strong>Photo Tips:</strong>
        </p>
        <ul className="text-sm text-foreground-muted space-y-1 ml-4">
          <li>• Take photos in good lighting</li>
          <li>• Wear form-fitting clothes or swimwear</li>
          <li>• Use the same poses for progress tracking</li>
          <li>• Include front, back, and side views if possible</li>
        </ul>
      </div>
    </div>
  );
};

export default FullBodyImagesStep;
