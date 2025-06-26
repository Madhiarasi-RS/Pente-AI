import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { CourseProvider } from '../contexts/CourseContext';

// Pages
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import StudentDashboard from '../components/student/StudentDashboard';
import AdminDashboard from '../components/admin/AdminDashboard';
import CourseDetail from '../components/courses/CourseDetail';
import EnhancedProfile from '../components/student/Profile';
import NotesManager from '../components/student/NotesManager';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import LandingPage from '../components/LandingPage';
import Interviewpreparation from '../components/student/InterviewPrepcopy';
import Contact from '../components/admin/Contact';
import About from '@/components/student/About';

const Index = () => {
  return (
    <AuthProvider>
      <CourseProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Student Protected Routes */}
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute role="student">
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interviewpreparation"
              element={
                <ProtectedRoute role="student">
                  <Interviewpreparation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute role="student">
                  <EnhancedProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes"
              element={
                <ProtectedRoute role="student">
                  <NotesManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute role="student">
                  <Contact />
                </ProtectedRoute>
              }
            />
        <Route
              path="/about"
              element={
                <ProtectedRoute role="student">
                  <About />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/:id"
              element={
                <ProtectedRoute role="student">
                  <CourseDetail />
                </ProtectedRoute>
              }
            />
             
        
            {/* Admin Protected Route */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
        

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </CourseProvider>
    </AuthProvider>
  );
};

export default Index;
