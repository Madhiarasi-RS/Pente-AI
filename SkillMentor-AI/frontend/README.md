# LearnifyHub - Full Stack AI-Powered Learning Platform

A comprehensive full-stack learning management system built with React, Node.js, Express, and MongoDB Atlas. Features AI-powered course recommendations, role-based authentication, progress tracking, and certificate generation.

## 🚀 Features

### Frontend (React + TypeScript)
- **Modern UI/UX**: Built with React 18, TypeScript, and Tailwind CSS
- **Role-based Authentication**: Separate dashboards for students and admins
- **Course Management**: Browse, search, filter, and enroll in courses
- **Progress Tracking**: Real-time progress monitoring with visual indicators
- **AI Recommendations**: Personalized course suggestions based on user profile
- **Review System**: Rate and review courses with moderation
- **Certificate Generation**: Download certificates upon course completion
- **Resume Upload**: AI-powered resume parsing for profile auto-fill
- **Responsive Design**: Mobile-first design with modern components

### Backend (Node.js + Express)
- **RESTful API**: Comprehensive API with proper error handling
- **MongoDB Atlas**: Cloud database with optimized schemas
- **JWT Authentication**: Secure token-based authentication
- **Role-based Authorization**: Admin and student role management
- **File Upload**: Support for images and documents
- **Data Validation**: Input validation and sanitization
- **Security**: Rate limiting, CORS, helmet, and more
- **Analytics**: Admin dashboard with detailed analytics

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS + shadcn/ui components
- React Router for navigation
- Context API for state management
- React Query for data fetching
- Lucide React for icons

### Backend
- Node.js with Express.js
- MongoDB Atlas with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- Multer for file uploads
- Express-validator for validation
- Morgan for logging
- Helmet for security

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd learnify-fullstack
```

### 2. Install Dependencies
```bash
# Install all dependencies (frontend + backend)
npm run install:all
```

### 3. Backend Setup
```bash
cd backend
cp .env.example .env
```

### 4. Configure Environment Variables
Edit `backend/.env` with your MongoDB Atlas connection string and other settings:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/learnifyhub?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_very_long_and_random
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:8080
```

### 5. Seed the Database (Optional)
```bash
npm run backend:seed
```

### 6. Start Development Servers
```bash
# Start both frontend and backend concurrently
npm run start:dev
```

Or start them separately:
```bash
# Terminal 1 - Backend
npm run backend:dev

# Terminal 2 - Frontend
npm run dev
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/password` - Update password

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/dashboard` - Get dashboard data

### Courses
- `GET /api/courses` - Get all courses (with filters)
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (Admin)
- `PUT /api/courses/:id` - Update course (Admin)
- `DELETE /api/courses/:id` - Delete course (Admin)

### Enrollments
- `POST /api/enrollments` - Enroll in course
- `GET /api/enrollments` - Get user enrollments
- `PUT /api/enrollments/:id/progress` - Update progress
- `DELETE /api/enrollments/:id` - Unenroll from course

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/course/:courseId` - Get course reviews
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Admin
- `GET /api/admin/dashboard` - Get admin dashboard stats
- `GET /api/admin/analytics/users` - Get user analytics
- `GET /api/admin/analytics/courses` - Get course analytics

## 👥 User Roles & Demo Accounts

### Student Account
- **Email**: `student@edu.com`
- **Password**: `student123`
- **Features**: Course enrollment, progress tracking, reviews, certificates

### Admin Account
- **Email**: `admin@edu.com`
- **Password**: `admin123`
- **Features**: Course management, user analytics, review moderation

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: ['student', 'admin'],
  profile: {
    fatherName, motherName, education, university,
    degree, major, yearOfCompletion, contactNo,
    skills: [String], areasOfInterest: [String]
  },
  isActive: Boolean,
  timestamps
}
```

### Course Model
```javascript
{
  title: String,
  description: String,
  instructor: String,
  difficulty: ['Beginner', 'Intermediate', 'Advanced'],
  duration: String,
  category: String,
  syllabus: [String],
  prerequisites: [String],
  learningOutcomes: [String],
  createdBy: ObjectId (User),
  timestamps
}
```

### Enrollment Model
```javascript
{
  student: ObjectId (User),
  course: ObjectId (Course),
  progress: Number (0-100),
  completedModules: [{moduleIndex, completedAt}],
  startDate: Date,
  completionDate: Date,
  certificateIssued: Boolean,
  timestamps
}
```

## 🔧 Development Scripts

```bash
# Frontend
npm run dev              # Start frontend dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Backend
npm run backend:dev     # Start backend dev server
npm run backend:start   # Start backend production server
npm run backend:seed    # Seed database with sample data

# Full Stack
npm run start:dev       # Start both frontend and backend
npm run install:all     # Install all dependencies
```

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables for API URL

### Backend (Railway/Render/Heroku)
1. Set environment variables
2. Deploy the `backend` folder
3. Ensure MongoDB Atlas is accessible

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
FRONTEND_URL=your_frontend_domain
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Input validation and sanitization
- Role-based access control
- Secure file upload handling

## 📱 Features Overview

### Student Features
- ✅ Course browsing and search
- ✅ Course enrollment and progress tracking
- ✅ AI-powered course recommendations
- ✅ Review and rating system
- ✅ Certificate generation
- ✅ Profile management with resume upload
- ✅ Dashboard with analytics

### Admin Features
- ✅ Course management (CRUD)
- ✅ User management
- ✅ Analytics dashboard
- ✅ Review moderation
- ✅ Certificate oversight
- ✅ System monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@learnifyhub.com or create an issue in the repository.

---

**LearnifyHub** - Empowering learners worldwide with AI-driven education 🎓