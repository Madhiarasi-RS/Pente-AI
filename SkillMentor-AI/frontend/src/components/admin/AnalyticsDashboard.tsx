
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useCourses } from '../../contexts/CourseContext';
import { TrendingUp, Users, BookOpen, Star, Award, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usersAPI } from '../../services/api'; 

const AnalyticsDashboard: React.FC = () => {
  const { courses, enrollments, reviews } = useCourses();
 // Mock data
  const totalCourses = courses.length;
  const totalEnrollments = enrollments.length;
  const totalReviews = reviews.length;
  const averageRating = courses.reduce((sum, course) => sum + course.rating, 0) / courses.length;
  const completionRate = enrollments.length > 0 
    ? enrollments.filter(e => e.progress === 100).length / enrollments.length * 100
    : 0;

  const categoryStats = courses.reduce((acc, course) => {
    acc[course.category] = (acc[course.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recentActivity = [
    { type: 'enrollment', message: 'New student enrolled in React Development', time: '2 hours ago' },
    { type: 'completion', message: 'Student completed Machine Learning course', time: '4 hours ago' },
    { type: 'review', message: 'New 5-star review for JavaScript course', time: '6 hours ago' },
    { type: 'course', message: 'New course "Advanced React" added', time: '1 day ago' },
  ];
  const [studentCount, setStudentCount] = useState(0); // ✅ dynamic student count

useEffect(() => {
  const fetchStudentCount = async () => {
    try {
      const res = await usersAPI.getAllUsers({ role: 'student' });
      if (res.success) {
        setStudentCount(res.data.pagination.total); // ✅ update count from API response
      }
    } catch (err) {
      console.error('Failed to fetch student count:', err);
    }
  };

  fetchStudentCount();
}, []);
const totalStudents = studentCount; // ✅ dynamic value


  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Students</p>
                <p className="text-3xl font-bold">{totalStudents}</p>
                <p className="text-blue-100 text-sm">+12% from last month</p>
              </div>
              <Users className="h-12 w-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Total Courses</p>
                <p className="text-3xl font-bold">{totalCourses}</p>
                <p className="text-green-100 text-sm">+3 new this month</p>
              </div>
              <BookOpen className="h-12 w-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Avg Rating</p>
                <p className="text-3xl font-bold">{averageRating.toFixed(1)}</p>
                <p className="text-purple-100 text-sm">Based on {totalReviews} reviews</p>
              </div>
              <Star className="h-12 w-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Completion Rate</p>
                <p className="text-3xl font-bold">{completionRate.toFixed(0)}%</p>
                <p className="text-orange-100 text-sm">Course completion</p>
              </div>
              <Award className="h-12 w-12 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Course Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(categoryStats).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32">
                      <Progress value={(count / totalCourses) * 100} className="h-2" />
                    </div>
                    <span className="text-sm text-gray-600">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Growth Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">+24%</div>
              <p className="text-sm text-gray-600">Student Growth</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">+18%</div>
              <p className="text-sm text-gray-600">Course Completions</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">+31%</div>
              <p className="text-sm text-gray-600">Engagement Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
