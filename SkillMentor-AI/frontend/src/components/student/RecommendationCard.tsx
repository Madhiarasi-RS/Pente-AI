import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Clock, Sparkles, Play } from 'lucide-react';
import { useCourses } from '../../contexts/CourseContext';
import { useAuth } from '../../contexts/AuthContext';

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  difficulty: string;
  rating: number;
  reviewCount: number;
  duration: string;
  enrolledStudents: number;
  image: string;
  youtubeUrl?: string; // ✅ added for YouTube
}

interface RecommendationCardProps {
  course: Course;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ course }) => {
  const { enrollInCourse, getEnrollmentByCourseAndStudent } = useCourses();
  const { user } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);

  const isEnrolled = user ? getEnrollmentByCourseAndStudent(course._id, user._id) : false;

  const handleEnroll = () => {
    if (user && !isEnrolled) {
      enrollInCourse(course._id);
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
    const match = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = course.youtubeUrl ? getYouTubeVideoId(course.youtubeUrl) : null;

  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-indigo-500">
      <div className="absolute top-4 right-4">
        <Badge className="bg-indigo-100 text-indigo-800">
          <Sparkles className="h-3 w-3 mr-1" />
          Recommended
        </Badge>
      </div>

      <div className="aspect-video bg-gradient-to-br from-indigo-500 to-purple-600 relative">
        {/* Difficulty Badge */}
        <div className="absolute top-4 left-4">
          <Badge className={getDifficultyColor(course.difficulty)}>
            {course.difficulty}
          </Badge>
        </div>

        {/* YouTube Thumbnail / Video */}
        {videoId && !isPlaying ? (
          <div
            className="w-full h-full cursor-pointer"
            onClick={() => setIsPlaying(true)}
          >
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <Play className="h-12 w-12 text-white" />
            </div>
          </div>
        ) : videoId && isPlaying ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
        <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <span>{course.instructor}</span>
          <span className="mx-2">•</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>{course.duration}</span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="font-medium">{course.rating}</span>
              <span className="text-gray-500 ml-1">({course.reviewCount})</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              <span>{course.enrolledStudents}</span>
            </div>
          </div>

          <Button
            className="w-full"
            onClick={handleEnroll}
            disabled={!!isEnrolled}
          >
            {isEnrolled ? 'Enrolled' : 'Enroll Now'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
