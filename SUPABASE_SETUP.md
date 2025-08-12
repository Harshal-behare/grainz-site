# Fitness Site - Supabase Integration Setup Guide

## ✅ What Has Been Fixed

1. **Environment Variables**: Fixed the Supabase client initialization error by:
   - Creating a new `supabase-client.ts` file with proper environment variable handling
   - Adding fallback values to prevent "supabaseKey is required" errors
   - Updated all imports to use the new client configuration

2. **Admin Authentication**: Set up admin user with:
   - Email: maitriramaiya03@gmail.com
   - Password: Admin@123456 (please change after first login)

3. **Database Structure**: Your Supabase database has tables for:
   - `form_submissions` - Main form data
   - `body_measurements` - Physical measurements
   - `full_body_images` - Image uploads
   - `admin_profiles` - Admin user management
   - `form_export_view` - View for easy CSV export

## 🚨 Important: Manual Database Setup Required

You need to configure Row Level Security (RLS) policies in your Supabase dashboard to allow form submissions:

### Step 1: Access Supabase SQL Editor
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click on "SQL Editor" in the left sidebar

### Step 2: Run Setup SQL
Copy and paste the entire contents of `scripts/setup-database.sql` into the SQL editor and click "Run".

This will:
- Drop any existing conflicting policies
- Create new policies to allow:
  - Anonymous users to submit forms
  - Authenticated admin users to read all submissions
  - File uploads to storage bucket

### Step 3: Verify Setup
After running the SQL, test the setup:
```bash
node scripts/test-submission.js
```

## 📁 File Structure

```
fitness_site/
├── src/
│   ├── lib/
│   │   ├── supabase.ts           # Original client (for server-side)
│   │   ├── supabase-client.ts    # Fixed client (for client-side)
│   │   └── form-service.ts       # Form submission logic
│   ├── app/
│   │   ├── admin/
│   │   │   ├── page.tsx          # Admin login page
│   │   │   └── dashboard/
│   │   │       └── page.tsx      # Admin dashboard
├── scripts/
│   ├── setup-admin.js            # Creates/updates admin user
│   ├── setup-database.sql        # SQL for RLS policies
│   ├── setup-database.js         # Instructions for database setup
│   └── test-submission.js        # Tests form submission
└── .env.local                    # Environment variables
```

## 🔑 Environment Variables

Your `.env.local` file contains:
```env
NEXT_PUBLIC_SUPABASE_URL=https://pnvdzxfwwtykzsgsicbb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
ADMIN_EMAIL=maitriramaiya03@gmail.com
```

## 🎯 How It Works

### Form Submission Flow:
1. User fills out fitness assessment form
2. Form data is sent to Supabase using anonymous access
3. Data is stored in `form_submissions`, `body_measurements`, and `full_body_images` tables
4. Files are uploaded to `fitness-uploads` storage bucket

### Admin Dashboard Flow:
1. Admin logs in at `/admin` with credentials
2. Dashboard loads all submissions from database
3. Admin can view, search, and filter submissions
4. Export to CSV downloads all data in spreadsheet format

## 🧪 Testing

### Test Form Submission:
```bash
node scripts/test-submission.js
```

### Test Admin Login:
1. Start the development server: `npm run dev`
2. Navigate to http://localhost:3000/admin
3. Login with:
   - Email: maitriramaiya03@gmail.com
   - Password: Admin@123456

### Test Dashboard:
After logging in, you'll be redirected to `/admin/dashboard` where you can:
- View submission statistics
- Search and filter submissions
- Export data to CSV
- View detailed submission information

## 🔧 Troubleshooting

### Error: "new row violates row-level security policy"
**Solution**: Run the SQL commands in `scripts/setup-database.sql` via Supabase SQL Editor

### Error: "supabaseKey is required"
**Solution**: Already fixed - using `supabase-client.ts` with fallback values

### Error: "Failed to load submissions" in admin dashboard
**Solution**: Ensure you're logged in as admin and RLS policies are configured

### Cannot login as admin
**Solution**: Run `node scripts/setup-admin.js` to reset admin password

## 📊 Database Schema

### form_submissions
- `submission_id`: Unique identifier (FIT-timestamp-random)
- User information: name, email, phone, profession
- Fitness data: goals, diet, workout plans
- Health info: medical issues, heart rate
- File URLs for uploaded documents

### body_measurements
- Physical measurements in inches
- Linked to submission via `submission_id`

### full_body_images
- Image URLs and view types
- Linked to submission via `submission_id`

## 🚀 Next Steps

1. **Configure RLS Policies**: Run the SQL setup as described above
2. **Test Everything**: Use the test scripts to verify functionality
3. **Change Admin Password**: Login and update the default password
4. **Deploy**: The system is ready for production use

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify environment variables are set correctly
3. Ensure RLS policies are configured in Supabase
4. Check Supabase dashboard logs for detailed error messages

The system is now properly configured to:
- Accept form submissions from anonymous users
- Store all fitness assessment data
- Allow admin to view and export submissions
- Handle file uploads for documents and images
