# FullBodyImagesStep Component Documentation

## Overview
The `FullBodyImagesStep` component is a dedicated React component for uploading multiple body photos with view type selection, preview functionality, and Supabase storage integration.

## Features
- ✅ Upload up to 5 body images
- ✅ View type selection (front, rear, left side, right side, other)
- ✅ Image preview before submission
- ✅ Automatic upload to Supabase storage
- ✅ Progress tracking for each upload
- ✅ Proper file validation (type and size)
- ✅ Responsive design

## Setup

### 1. Database Setup
First, ensure your Supabase database has the required storage bucket and table:

```sql
-- Run the contents of scripts/setup-storage.sql in your Supabase SQL editor
```

This will:
- Create a `fitness-uploads` storage bucket
- Set up the `full_body_images` table
- Configure proper RLS policies

### 2. Environment Variables
Ensure your `.env.local` file has:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Usage

### Basic Integration
```tsx
import FullBodyImagesStep from '@/components/forms/FullBodyImagesStep';
import { CompleteUserData } from '@/types/fitness';

function MyForm() {
  const [formData, setFormData] = useState<Partial<CompleteUserData>>({
    images: []
  });

  const updateData = (updates: Partial<CompleteUserData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return (
    <FullBodyImagesStep
      data={formData}
      updateData={updateData}
      onNext={() => console.log('Next')}
      onPrevious={() => console.log('Previous')}
      isFirstStep={false}
      isLastStep={false}
    />
  );
}
```

### Data Structure
The component updates the `images` array in your form data:

```typescript
interface FullBodyImage {
  id: string;
  user_id: string;
  file_url: string;
  view: 'front' | 'rear' | 'side_left' | 'side_right' | 'other';
  uploaded_at: Date;
}
```

### Submitting to Database
When submitting the complete form:

```typescript
import { submitFormData } from '@/lib/form-service';

const handleSubmit = async () => {
  try {
    const submissionId = await submitFormData(formData);
    console.log('Submitted with ID:', submissionId);
  } catch (error) {
    console.error('Submission failed:', error);
  }
};
```

## Component Workflow

1. **Initial State**: Component starts with one empty upload slot
2. **Select View Type**: User selects the view type for the image
3. **Upload Image**: User clicks to select and upload an image
4. **Preview & Progress**: Image preview is shown with upload progress
5. **Add More**: User can add up to 5 images total
6. **Submit**: Images are automatically saved to Supabase during upload

## File Storage

Images are stored in Supabase with the following structure:
- Bucket: `fitness-uploads`
- Path: `body-images/{uploadId}_{timestamp}.{extension}`
- Naming convention ensures uniqueness and easy identification

## Validation

The component includes built-in validation:
- **File Type**: Only image files (JPEG, PNG, WebP)
- **File Size**: Maximum 5MB per image
- **Upload Limit**: Maximum 5 images per submission

## Error Handling

Errors are handled gracefully:
- Upload failures show an alert and reset the upload slot
- Failed uploads don't block other uploads
- Network errors are logged to console

## Styling

The component uses Tailwind CSS with custom design tokens:
- `bg-background-secondary`: Upload area background
- `bg-primary`: Selected view type highlight
- `text-foreground-muted`: Muted text color

## Demo

View the live demo at: `/demo/body-images`

## Troubleshooting

### Common Issues

1. **"Failed to upload image" error**
   - Check Supabase storage bucket exists
   - Verify RLS policies are configured
   - Check network connection

2. **Images not showing after upload**
   - Verify bucket is set to public
   - Check CORS settings in Supabase

3. **"You can only upload up to 5 images" alert**
   - This is by design to limit storage usage
   - Remove existing images to add new ones

### Debug Mode

Enable console logging by checking browser developer tools for:
- Upload progress updates
- Supabase responses
- Error details

## Future Enhancements

Potential improvements:
- [ ] Drag and drop support
- [ ] Bulk upload functionality
- [ ] Image cropping/editing
- [ ] Automatic image optimization
- [ ] Mobile camera integration
