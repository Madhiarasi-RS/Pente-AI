import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourses } from '../../contexts/CourseContext';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../shared/Header';
import ReviewForm from './ReviewForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Star,
  Clock,
  Users,
  BookOpen,
  Award,
  ArrowLeft,
  Play,
  CheckCircle,
  PlayCircle,
} from 'lucide-react';
import NotesSection from '../student/NotesSection';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    getCourseById,
    getEnrollmentByCourseAndStudent,
    getReviewsByCourse,
    enrollInCourse,
    updateProgress,
  } = useCourses();
  const { user } = useAuth();
  const [showReviewForm, setShowReviewForm] = useState(false);

  const course = getCourseById(id!);
  const enrollment = user ? getEnrollmentByCourseAndStudent(id!, user._id) : null;
  const reviews = getReviewsByCourse(id!);

  const getYouTubeVideoId = (url: string) => {
    const match = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const youtubeVideoId = course?.youtubeUrl ? getYouTubeVideoId(course.youtubeUrl) : null;
  const [isPlaying, setIsPlaying] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Course not found</h1>
            <Button onClick={() => navigate(-1)} className="mt-4">
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    if (user && !enrollment) {
      enrollInCourse(course._id, user._id);
    }
  };

  const handleProgress = () => {
    if (user && enrollment) {
      const newProgress = Math.min(enrollment.progress + 20, 100);
      updateProgress(course._id, user._id, newProgress);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header with YouTube */}
            <Card>
              <div className="aspect-video bg-gradient-to-br from-indigo-500 to-purple-600 relative rounded-t-lg overflow-hidden">
                {youtubeVideoId && !isPlaying ? (
                  <div
                    className="w-full h-full relative cursor-pointer"
                    onClick={() => setIsPlaying(true)}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <Play className="h-20 w-20 text-white opacity-80" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className={getDifficultyColor(course.difficulty)}>
                        {course.difficulty}
                      </Badge>
                    </div>
                  </div>
                ) : youtubeVideoId && isPlaying ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle className="h-20 w-20 text-white opacity-80" />
                  </div>
                )}
              </div>

              <CardHeader>
                <CardTitle className="text-2xl">{course.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>By {course.instructor}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>
                      {course.rating} ({course.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{course.enrolledStudents} students</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-700">{course.description}</p>
              </CardContent>
            </Card>

            {/* Syllabus */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Generate Summary
                </CardTitle>
                <NotesSection/>
              </CardHeader>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Student Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div
                        key={review._id}
                        className="border-b border-gray-200 pb-4 last:border-b-0"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{review.studentName}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                        <p className="text-sm text-gray-500 mt-1">{review.date}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No reviews yet. Be the first to review this course!
                  </p>
                )}

                {enrollment && (
                  <div className="mt-6">
                    <Separator />
                    <div className="mt-6">
                      {showReviewForm ? (
                        <ReviewForm
                          courseId={course.id}
                          onSubmitted={() => setShowReviewForm(false)}
                        />
                      ) : (
                        <Button onClick={() => setShowReviewForm(true)}>
                          Write a Review
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{enrollment ? 'Your Progress' : 'Enroll in Course'}</CardTitle>
              </CardHeader>
              <CardContent>
                {enrollment ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span className="font-medium">{enrollment.progress}%</span>
                      </div>
                      <Progress value={enrollment.progress} className="h-3" />
                    </div>

                    {enrollment.progress < 100 ? (
                      <Button onClick={handleProgress} className="w-full">
                        Continue Learning
                      </Button>
                    ) : (
                      <div className="text-center">
                        <Award className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                        <p className="font-medium text-green-600">Course Completed!</p>
                        <Button className="w-full mt-2">Download Certificate</Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900 mb-1">Free</p>
                      <p className="text-sm text-gray-600">Full access to all content</p>
                    </div>
                    <Button onClick={handleEnroll} className="w-full">
                      Enroll Now
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Course Info */}
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Difficulty</span>
                  <Badge className={getDifficultyColor(course.difficulty)}>
                    {course.difficulty}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{course.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Students</span>
                  <span className="font-medium">{course.enrolledStudents}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
