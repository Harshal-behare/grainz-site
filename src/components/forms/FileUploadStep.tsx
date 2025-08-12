import React from 'react';
import { FormStepProps } from '@/types/fitness';
import { Upload, FileText, Image } from 'lucide-react';

const FileUploadStep: React.FC<FormStepProps> = ({ data, updateData }) => {
  const handleFileUpload = (type: 'blood_report' | 'body_composition' | 'aspiration_image', file: File) => {
    // In a real implementation, you would upload the file to your server/cloud storage
    // For now, we'll just store the file name as a placeholder
    const fileUrl = `uploaded_${type}_${file.name}`;
    
    updateData({
      files: {
        ...data.files,
        [`${type}_url`]: fileUrl,
      },
    });
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
        <div className="border-2 border-dashed border-border rounded-lg p-6">
          <div className="text-center">
            <FileText size={48} className="mx-auto text-foreground-muted mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Blood Report (Optional)
            </h3>
            <p className="text-sm text-foreground-muted mb-4">
              Upload your recent blood test results to help us understand your health baseline.
            </p>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload('blood_report', file);
              }}
              className="hidden"
              id="blood-report"
            />
            <label
              htmlFor="blood-report"
              className="inline-flex items-center justify-center px-4 py-2 bg-background-secondary border border-border rounded-lg text-foreground hover:bg-background-tertiary cursor-pointer"
            >
              <Upload size={16} className="mr-2" />
              Upload Blood Report
            </label>
            {data.files?.blood_report_url && (
              <p className="text-xs text-success mt-2">✓ File uploaded successfully</p>
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