# 🏋️‍♂️ FitnessPro - Complete Fitness Assessment Platform

A modern, comprehensive fitness website built with Next.js, TypeScript, Tailwind CSS, and Supabase featuring a sleek dark theme, complete form management system, and admin dashboard.

## 🌟 Features

### Core Functionality
- **🏠 Modern Homepage**: Hero section with animated elements and fitness-focused design
- **📋 Comprehensive Questionnaire**: Multi-step fitness assessment form integrated with database
- **💾 Database Integration**: Full Supabase integration with PostgreSQL database
- **👨‍💼 Admin Dashboard**: Complete admin panel for managing form submissions
- **📊 Data Export**: CSV export functionality for form submissions
- **🔐 Authentication**: Secure admin login system using Supabase Auth
- **📱 Responsive Design**: Mobile-first approach with seamless desktop experience
- **🎨 Dark Theme**: Professional dark theme with fitness-focused color palette

### Questionnaire Features
- **Body Type Assessment**: Visual cards for body type selection
- **Goal Setting**: Primary fitness goals with detailed descriptions
- **Personal Information**: Height, weight, age, and contact details
- **Diet Preferences**: Comprehensive dietary preference mapping
- **Workout Preferences**: Home vs gym, equipment access, training frequency
- **File Uploads**: Blood reports, body composition, aspiration images
- **Body Measurements**: Detailed body measurement tracking
- **Medical Information**: Health conditions and allergies

### UI Components
- **Responsive Sidebar**: Collapsible navigation with user profile section
- **Interactive Cards**: Hover effects and selection states
- **Progress Indicators**: Visual progress bars and step indicators
- **Form Components**: Custom inputs, dropdowns, and validation
- **Button Variants**: Primary, secondary, ghost, and outline styles
- **Loading States**: Animated loading indicators

### Website Pages
- **🏠 Homepage**: Hero section with call-to-action and feature showcase  
- **📝 Assessment Form**: 8-step comprehensive fitness questionnaire
- **✅ Success Page**: Post-submission confirmation and next steps
- **👨‍💼 Admin Login**: Secure authentication for administrators
- **📊 Admin Dashboard**: Form submissions management and analytics
- **📄 Essential Pages**: Privacy Policy, Terms of Service, About, Contact
- **🎯 Responsive Design**: Works perfectly on all devices

### Database Features
- **📝 Form Submissions**: Complete user data storage
- **📏 Body Measurements**: Detailed body measurement tracking
- **📷 Image Uploads**: Support for health reports and photos
- **👤 Admin Management**: Secure admin user system
- **📈 Analytics View**: Comprehensive data view for exports
- **🔒 Row Level Security**: Database security with Supabase RLS

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Forms**: Custom form components with validation
- **State Management**: React hooks and local state
- **File Storage**: Supabase Storage

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm or yarn package manager
- Supabase account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fitness_site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your project URL and anon key
   - Run the SQL schema provided in the project description to create tables

4. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Update `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

7. **Create admin user** (for admin dashboard access)
   - Sign up at your Supabase Auth dashboard
   - Add the user to the `admin_profiles` table

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
fitness_site/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── admin/             # Admin authentication & dashboard
│   │   │   ├── dashboard/     # Admin dashboard page
│   │   │   └── page.tsx       # Admin login page
│   │   ├── questionnaire/     # Multi-step questionnaire
│   │   ├── success/           # Post-submission success page
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   ├── privacy-policy/    # Privacy policy
│   │   ├── terms-of-service/  # Terms of service
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout with header/footer
│   │   └── page.tsx           # Homepage
│   ├── components/            # Reusable components
│   │   ├── forms/             # Form step components
│   │   │   ├── BodyTypeStep.tsx
│   │   │   ├── PrimaryGoalStep.tsx
│   │   │   ├── PersonalInfoStep.tsx
│   │   │   ├── ContactInfoStep.tsx
│   │   │   ├── DietPreferencesStep.tsx
│   │   │   ├── WorkoutPreferencesStep.tsx
│   │   │   ├── FileUploadStep.tsx
│   │   │   └── MeasurementsStep.tsx
│   │   ├── layout/            # Layout components
│   │   │   ├── Header.tsx     # Site header
│   │   │   └── Footer.tsx     # Site footer
│   │   └── ui/                # UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       └── Progress.tsx
│   ├── lib/                   # Utility functions
│   │   ├── supabase.ts        # Supabase client configuration
│   │   ├── form-service.ts    # Form submission and data handling
│   │   └── utils.ts          # Helper functions
│   └── types/                 # TypeScript definitions
│       ├── fitness.ts        # Fitness-related types
│       └── database.ts       # Database schema types
├── public/                    # Static assets
├── .env.local                # Environment variables
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies
└── README.md                 # This file
```

## 🎨 Design System

### Color Palette

- **Background**: 
  - Primary: `#0a0a0a`
  - Secondary: `#1a1a1a`
  - Tertiary: `#2a2a2a`

- **Primary**: `#ef4444` (Fitness Red)
- **Accent**: `#0ea5e9` (Tech Blue)
- **Success**: `#22c55e`
- **Warning**: `#f59e0b`

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700, 800

### Components
- **Cards**: Rounded corners with subtle borders and hover effects
- **Buttons**: Multiple variants with smooth transitions
- **Forms**: Clean inputs with validation states
- **Progress**: Animated progress bars with gradient fills

## 📊 Database Schema

The application uses a comprehensive database schema for user data:

### Core Tables
- **form_submissions**: Main table storing all form data with JSONB fields for arrays
- **body_measurements**: Detailed body measurements in inches
- **full_body_images**: User-uploaded body photos with view types
- **admin_profiles**: Admin user management with role-based access
- **Storage bucket**: `fitness-uploads` for file storage

### Key Features
- **Row Level Security (RLS)**: Secure data access with Supabase policies
- **Anonymous Submissions**: Public can submit forms without authentication
- **Admin Access**: Authenticated admin users can view and export data
- **JSONB Storage**: Efficient storage of array data (foods, preferences, etc.)
- **File Upload Support**: Secure file storage with public URLs
- **Export View**: Optimized view for CSV exports with joined data

### Admin Features
- **Dashboard Analytics**: View submission statistics and trends
- **Search & Filter**: Find submissions by name, email, or ID
- **CSV Export**: Export filtered data for external analysis
- **Real-time Data**: Live updates from database
- **Secure Authentication**: Supabase Auth integration

## 🔧 Customization

### Adding New Form Steps
1. Create a new component in `src/components/forms/`
2. Add the step to the `formSteps` array in `questionnaire/page.tsx`
3. Include the step title in `stepTitles` object
4. Add the component to the `renderCurrentStep()` function

### Modifying the Theme
1. Update colors in `tailwind.config.ts`
2. Modify CSS variables in `globals.css`
3. Adjust component styles as needed

### Adding New Pages
1. Create new page in `src/app/`
2. Add navigation link to sidebar
3. Update routing logic

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Add build command `npm run build` and publish directory `out`
- **Docker**: Use the included Dockerfile for containerization

## 📈 Performance Optimizations

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting with Next.js
- **CSS Purging**: Tailwind CSS purges unused styles
- **Font Optimization**: Google Fonts with display swap

## 🔒 Security Features

- **Form Validation**: Client-side and server-side validation
- **File Upload Security**: File type and size restrictions
- **Data Encryption**: Sensitive data handling best practices
- **Privacy**: User data privacy and GDPR considerations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Open an issue on GitHub
- Email: support@fitnesspro.com
- Documentation: [docs.fitnesspro.com](https://docs.fitnesspro.com)

## 🙏 Acknowledgments

- **Next.js** for the amazing React framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide React** for beautiful icons
- **Vercel** for hosting and deployment platform

## 🚀 Deployment

### Environment Variables Required
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key  
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
```

### Vercel Deployment (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Database Setup
Run the provided SQL schema in your Supabase SQL editor to create all necessary tables, policies, and views.

## 🔒 Security Features

- **Row Level Security**: Database-level security with Supabase RLS
- **Anonymous Access**: Public can submit forms without compromising security
- **Admin Authentication**: Secure admin access with Supabase Auth
- **File Upload Security**: Secure file storage with type validation
- **Input Sanitization**: All user inputs are properly sanitized
- **HTTPS Only**: Secure data transmission

## 📋 Usage

### For Users
1. Visit the homepage
2. Click "Take Free Assessment" 
3. Complete the 8-step questionnaire
4. Receive confirmation with submission ID
5. Get personalized plan via email

### For Administrators  
1. Go to `/admin` to login
2. Access dashboard to view submissions
3. Search and filter submissions
4. Export data to CSV for analysis
5. Manage user data securely

## 🗺️ Roadmap

- [x] Complete fitness assessment form
- [x] Database integration with Supabase
- [x] Admin dashboard and authentication
- [x] CSV export functionality
- [x] File upload support
- [x] Responsive design
- [ ] Email notifications for submissions
- [ ] Advanced analytics and charts
- [ ] Bulk operations in admin panel
- [ ] API endpoints for mobile app
- [ ] Multi-language support
- [ ] Integration with fitness APIs

---

**Built with ❤️ for the fitness community**