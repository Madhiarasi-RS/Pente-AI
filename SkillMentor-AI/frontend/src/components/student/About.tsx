
import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, BookOpen, Award, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../shared/Header';

const Index = () => {
  const { user, login, isAuthenticated } = useAuth();

  useEffect(() => {
    // For demo purposes, automatically login a mock user if not already authenticated
    if (!isAuthenticated) {
      const mockUser = {
        _id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        profile: {
          contactNo: '+1234567890',
          education: 'Bachelor of Computer Science',
          university: 'Tech University',
          degree: 'B.Sc',
          major: 'Computer Science',
          yearOfCompletion: '2024',
          skills: ['JavaScript', 'React', 'Node.js', 'Python'],
          areasOfInterest: ['Web Development', 'AI/ML', 'Data Science'],
          fatherName: 'Robert Doe',
          motherName: 'Jane Doe'
        }
      };
      login(mockUser);
    }
  }, [isAuthenticated, login]);

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      // In a real app, this would redirect to login
      const mockUser = {
        _id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        profile: {
          contactNo: '',
          education: '',
          university: '',
          skills: [],
          areasOfInterest: []
        }
      };
      login(mockUser);
    }
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            About Profile Section
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create, manage, and showcase your professional profile with our comprehensive student platform. 
            Upload resumes, track certificates, and highlight your achievements.
          </p>
          
          {isAuthenticated ? (
            <Link to="/profile">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4">
                Go to My Profile
                <User className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
            >
              Get Started
              <Plus className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Profile Management</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Create and maintain a comprehensive profile with personal, academic, and professional information.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Resume Upload</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Upload and manage your resume with drag-and-drop functionality and preview capabilities.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Certificates & Achievements</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Track and showcase your certificates, achievements, and learning progress in one place.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Section */}
        {isAuthenticated && user && (
          <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome back, {user.name}!
              </CardTitle>
              <p className="text-gray-600">Here's your profile summary</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="font-medium">Profile</p>
                  <p className="text-2xl font-bold text-blue-600">85%</p>
                  <p className="text-sm text-gray-600">Complete</p>
                </div>
                
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="font-medium">Skills</p>
                  <p className="text-2xl font-bold text-green-600">{user.profile?.skills?.length || 0}</p>
                  <p className="text-sm text-gray-600">Listed</p>
                </div>
                
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="font-medium">Interests</p>
                  <p className="text-2xl font-bold text-purple-600">{user.profile?.areasOfInterest?.length || 0}</p>
                  <p className="text-sm text-gray-600">Areas</p>
                </div>
                
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                    <Award className="h-6 w-6 text-orange-600" />
                  </div>
                  <p className="font-medium">Certificates</p>
                  <p className="text-2xl font-bold text-orange-600">2</p>
                  <p className="text-sm text-gray-600">Earned</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
    <div/>
    </div>
    
  );
};

export default Index;