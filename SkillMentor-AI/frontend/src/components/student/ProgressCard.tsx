import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Clock, Play } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  difficulty: string;
  duration: string;
  image: string;
  youtubeUrl?: string; // Add YouTube URL field
}

interface ProgressCardProps {
  course: Course;
  progress: number;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ course, progress }) => {
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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-video relative bg-gradient-to-br from-blue-500 to-indigo-600">
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
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircle className="h-16 w-16 text-white opacity-80" />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <Badge className={getDifficultyColor(course.difficulty)}>
            {course.difficulty}
          </Badge>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
        <div className="flex items-center text-sm text-gray-600">
          <span>{course.instructor}</span>
          <span className="mx-2">•</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>{course.duration}</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <Link to={`/courses/${course.id}`}>
            <Button className="w-full" variant={progress === 100 ? "outline" : "default"}>
              {progress === 100 ? "View Certificate" : "Continue Learning"}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
