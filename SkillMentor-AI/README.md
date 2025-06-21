# SkillMentor.AI - Full Stack AI-Powered Learning Platform
A comprehensive full-stack learning management system built with React, Node.js, Express, and MongoDB Atlas. Features AI-powered course recommendations, role-based authentication, progress tracking, and certificate generation.

---

## 🎥 Video Explanation

- **Watch a full walkthrough of SkillMentor.AI**:  
  [Video Walkthrough](https://drive.google.com/file/d/1cPv7LF8IAOlZp-Y4HB7tjLYokwepqe72/view?usp=drive_link)

  ---

## 🌐 Live Demo

- You can try out the live version of SkillMentor.AI below:
- **SkillMentor**: https://skill-mentor-ai.vercel.app/
- Feel free to explore the platform, browse courses, and make enrollment and start your learning journey!

  ---

  
## 👨‍💻 Demo Accounts
- **Login Accounts**:
- Regular User:
- Email: mostlyself@gmail.com
- Password: Madhi@16
- Admin User:
- Email: admin@edu.com
- Password: admin123

  ---

  ### Frontend (React + TypeScript)

- **Modern UI/UX**: Built with React 18, TypeScript, and Tailwind CSS
- **Role-based Authentication**: Separate dashboards for Students and Admins (via NextAuth)
- **Course Management**: Browse, search, filter, view details, and enroll in courses
- **Progress Tracking**: Real-time progress monitoring with visual indicators
- **AI-Powered Recommendations**:
  - Personalized course suggestions based on user profile, area of interest
  - Uses content-based filtering and sentiment analysis
- **Review System**:
  - Add star ratings and written reviews
  - Real-time updates via state management (Redux)
- **Certificate Generation**:
  - Auto-generate PDF certificates on 100% completion (HTML-to-PDF)
- **Resume Upload**:
- **AI-Powered Video Summaries**:
  - Generate summaries of learning videos via Gemini AI integration
  - Option to export as PDF
- **PDF Viewer**:
  - Upload and view PDF documents inside the app
- **Inactivity Notifications**:
  - Automated alerts if student inactive
- **Contact & Feedback**:
  - Contact page to submit feedback and inquiries
- **Student Dashboard**:
  - Enrolled courses
  - % course progress
  - AI recommendations
  - Suggested and trending courses displayed by category (Beginner, Intermediate, Advanced)
- **Admin Dashboard**:
  - Manage courses, students, reviews, and certificates
  - View analytics (total users, courses, enrollments, ratings)
- **Responsive Design**:
  - Mobile-first design with modern components
  - Optimized for accessibility and performance
 
    ---

   ### Backend (Node.js + Express)

- **RESTful API**:
  - Comprehensive API with proper error handling and status codes
- **MongoDB Atlas**:
  - Cloud database with optimized Mongoose schemas
- **JWT Authentication**:
  - Secure token-based authentication for all protected routes
- **Role-based Authorization**:
  - Fine-grained access control for Admin and Student roles
- **File Upload**:
  - Supports images, documents, and PDF upload
- **AI-Powered Course Recommendations**:
  - Content-based filtering and sentiment analysis
  - Learns from resume data, reviews, search patterns
- **AI Video Summary Generation**:
  - Generate video summaries through Gemini AI API integration
  - Export summary as PDF
- **Certificate Generator**:
  - Auto-generate PDF certificates upon 100% course completion
- **PDF Viewer Support**:
  - Upload and manage user-provided PDF documents
- **Inactivity Tracking & Alerts**:
  - Background task to detect inactivity and trigger alerts
- **Real-Time Progress Tracker**:
  - Track student progress at module level (backend records % progress and timestamps)
- **Review Aggregation**:
  - Automatically calculate average course ratings based on review submissions
- **Data Validation**:
  - Input validation and sanitization (via Express-Validator)
- **Security**:
  - Rate limiting
  - CORS protection
- **Analytics**:
  - Admin dashboard exposes detailed analytics:
    - Total students, courses, enrollments
    - Average ratings
    - Certificates issued
    - Active vs inactive users
- **Notifications**:
  - Inactivity notifications via system alerts
- **Scalable Architecture**:
  - Follows modular and service-oriented design for easy maintenance
 
---

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router (v6+)
- **State Management**: Context API (extendable with Redux if needed)
- **Data Fetching**: React Query
- **Authentication**: NextAuth.js (client-side session handling)
- **PDF Handling**: react-pdf, HTML-to-PDF tools (for Certificate and AI Summary)
- **AI Integration**:
  - Gemini AI API (video summaries)
  - Resume Parsing
  - Course Recommendation Engine
- **Backend**: Node.js with Express.js
- **Database**: MongoDB Atlas with Mongoose ODM
- **Authentication**: JWT-based authentication
- **Security**: Helmet, CORS, bcryptj
- **Validation**: express-validator
- **Notifications**: Inactivity alert system
- **Analytics**: Admin dashboard with full analytics (users, courses, reviews, enrollments)

---

## 🧩 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Madhiarasi-RS/SkillMentor.AI.git
   ```

2. Install dependencies for both client and server:
   ```bash
   cd frontend
   npm install

   cd backend
   npm install
   ```

3. Set up environment variables:  
   Create a `.env` file inside the `server` folder and add the following.
   
    ```PORT=5000
    MONGO_URI=your-mongodb-connection-string
    JWT_SECRET=your-jwt-secret
    JWT_EXPIRES_IN=1d
    STRIPE_SECRET_KEY=your-stripe-secret-key
    GEMINI_API_KEY=your-gemini-api-key
    ```


5. Start both servers:
   - Start backend server:
     ```bash
     cd backend
     npm run dev
     ```
   - Start frontend client:
     ```bash
     cd frontend
     npm run dev
     ```

6. Open your browser and visit:  
   `http://localhost:8080`

---
## 📂 Project Structure
### 🚀 Client Side (`/frontend`)
frontend
├── node_modules
├── public
├── src
│ ├── assets
│ ├── components
│ ├── admin
│ ├── auth 
│ ├── courses
│ ├── shared 
│ ├── student
│ ├── ui 
│ ├── LandingPage.tsx
│ ├── contexts 
│ ├── hooks 
│ ├── lib 
│ ├── pages 
│ ├── services 
│ ├── utils 
│ ├── App.tsx 
│ ├── index.css 
│ ├── main.tsx 
│ └── vite-env.d.ts
├── index.html
├── package.json
├── vite.config.ts
└── .gitignore
### 🌐 Server Side (`/backend`)
backend
├── middleware 
├── models 
├── node_modules
├── routes 
├── scripts 
├── utils # Helper utilities
├── .env 
├── package.json
├── package-lock.json
├── server.js 
└── README.md

---

## 🌐 API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - User login
- GET /api/auth/me - Get current user
- PUT /api/auth/password - Update password

### Users
- GET /api/users/profile - Get user profile
- PUT /api/users/profile - Update user profile
- GET /api/users/dashboard - Get dashboard data

### Courses
- GET /api/courses - Get all courses (with filters)
- GET /api/courses/:id - Get single course
- POST /api/courses - Create course (Admin)
- PUT /api/courses/:id - Update course (Admin)
- DELETE /api/courses/:id - Delete course (Admin)

### Enrollments
- POST /api/enrollments - Enroll in course
- GET /api/enrollments - Get user enrollments
- PUT /api/enrollments/:id/progress - Update progress
- DELETE /api/enrollments/:id - Unenroll from course

### Admin
- GET /api/admin/dashboard - Get admin dashboard stats
- GET /api/admin/analytics/users - Get user analytics
- GET /api/admin/analytics/courses - Get course analytics

  ---
  

**SkillMentor.AI** — Empowering learners worldwide with AI-driven education 🚀🎓  
Made with ❤️ by the SkillMentor.AI Team.
