import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Clock, Youtube, Play } from 'lucide-react';
import { useCourses } from '../../contexts/CourseContext';
import { useAuth } from '../../contexts/AuthContext';

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  difficulty: string;
  rating?: number;
  reviewCount?: number;
  duration: string;
  enrolledStudents?: number;
  image?: string;
  youtubeUrl?: string;
  price: number;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { enrollInCourse, getEnrollmentByCourse, loading } = useCourses();
  const { user, isAuthenticated } = useAuth();

  const isEnrolled = user ? getEnrollmentByCourse(course._id) : false;

  const handleEnroll = async () => {
    if (user && !isEnrolled) {
      try {
        await enrollInCourse(course._id);
      } catch (error) {
        console.error('Enrollment failed:', error);
      }
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const youtubeVideoId = course.youtubeUrl ? getYouTubeVideoId(course.youtubeUrl) : null;

  return (
    
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="aspect-video relative w-full">
        {course.image ? (
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : youtubeVideoId ? (
          <div className="relative w-full h-full">
            <img 
              src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <Play className="h-16 w-16 text-white opacity-80" />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
            <div className="text-white text-center">
              <h3 className="text-lg sm:text-xl font-bold mb-1">{course.title}</h3>
              <p className="text-sm opacity-80">by {course.instructor}</p>
            </div>
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3">
          <Badge className={getDifficultyColor(course.difficulty)}>
            {course.difficulty}
          </Badge>
        </div>

        <div className="absolute top-3 right-3 flex flex-wrap gap-1">
          {course.youtubeUrl && (
            <Badge className="bg-red-500 text-white">
              <Youtube className="h-3 w-3 mr-1" />
              Video
            </Badge>
          )}
          {course.price > 0 ? (
            <Badge className="bg-green-500 text-white">
              ₹{course.price}
            </Badge>
          ) : (
            <Badge className="bg-blue-500 text-white">Free</Badge>
          )}
        </div>
      </div>

      <CardHeader className="px-4 py-3 space-y-1">
        <CardTitle className="text-base sm:text-lg line-clamp-2">{course.title}</CardTitle>
        <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
        <div className="flex flex-wrap items-center text-sm text-gray-600">
          <span className='text-gray-500 text-2xl'>{course.instructor}</span>
          <span className="mx-2">•</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>{course.duration}</span>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="font-medium">{course.rating || 0}</span>
              <span className="text-gray-500 ml-1">({course.reviewCount || 0})</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              <span>{course.enrolledStudents || 0}</span>
            </div>
          </div>

          {/* Buttons - responsive stacking */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Link to={`/courses/${course._id}`} className="w-full sm:w-1/2">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </Link>
            {isAuthenticated && (
              <Button
                className="w-full sm:w-1/2"
                onClick={handleEnroll}
                disabled={!!isEnrolled || loading}
              >
                {isEnrolled ? 'Enrolled' : 'Enroll'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
