import React, { createContext, useContext, useState, useEffect } from 'react';
import { coursesAPI, enrollmentsAPI, reviewsAPI } from '../services/api';
import { useAuth } from './AuthContext';

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  category: string;
  syllabus: string[];
  image: string;
  price: number;
  isActive: boolean;
  tags: string[];
  prerequisites: string[];
  learningOutcomes: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  rating?: number;
  reviewCount?: number;
  enrolledStudents?: number;
}

interface Review {
  _id: string;
  student: {
    _id: string;
    name: string;
  };
  course: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  helpfulVotes: number;
  createdAt: string;
  updatedAt: string;
}

interface Enrollment {
  _id: string;
  student: string;
  course: {
    _id: string;
    title: string;
    instructor: string;
    difficulty: string;
    duration: string;
    category: string;
    image: string;
  };
  progress: number;
  completedModules: Array<{
    moduleIndex: number;
    completedAt: string;
  }>;
  startDate: string;
  completionDate?: string;
  certificateIssued: boolean;
  certificateUrl?: string;
  lastAccessedAt: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CourseContextType {
  courses: Course[];
  reviews: Review[];
  enrollments: Enrollment[];
  loading: boolean;
  error: string | null;

  fetchCourses: (params?: any) => Promise<void>;
  fetchCourseById: (id: string) => Promise<Course | null>;
  addCourse: (course: any) => Promise<void>;
  updateCourse: (id: string, updates: any) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;

  enrollInCourse: (courseId: string) => Promise<void>;
  fetchUserEnrollments: () => Promise<void>;
  updateProgress: (enrollmentId: string, progress: number, moduleIndex?: number) => Promise<void>;
  unenrollFromCourse: (enrollmentId: string) => Promise<void>;

  addReview: (reviewData: any) => Promise<void>;
  fetchCourseReviews: (courseId: string) => Promise<void>;
  fetchUserReviews: () => Promise<void>;

  getCourseById: (id: string) => Course | undefined;
  getEnrollmentByCourse: (courseId: string) => Enrollment | undefined;
  getEnrollmentByCourseAndStudent: (courseId: string, studentId: string) => Enrollment | undefined;
  getReviewsByCourse: (courseId: string) => Review[];
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const useCourses = (): CourseContextType => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
    if (isAuthenticated) {
      fetchUserEnrollments();
    }
  }, [isAuthenticated]);

  const fetchCourses = async (params?: any) => {
    try {
      setLoading(true);
      setError(null);
      const response = await coursesAPI.getAllCourses(params);
      if (response.success) {
        setCourses(response.data.courses);
      } else {
        setError(response.message || 'Failed to fetch courses');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseById = async (id: string): Promise<Course | null> => {
    try {
      const response = await coursesAPI.getCourseById(id);
      if (response.success) {
        return response.data.course;
      }
      setError(response.message || 'Course not found');
      return null;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch course');
      return null;
    }
  };

  const addCourse = async (courseData: any) => {
    try {
      setError(null);
      const response = await coursesAPI.createCourse(courseData);
      if (response.success) {
        setCourses(prev => [...prev, response.data.course]);
      } else {
        setError(response.message || 'Failed to create course');
        throw new Error(response.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create course');
      throw err;
    }
  };

  const updateCourse = async (id: string, updates: any) => {
    try {
      setError(null);
      const response = await coursesAPI.updateCourse(id, updates);
      if (response.success) {
        setCourses(prev => prev.map(course => (course._id === id ? response.data.course : course)));
      } else {
        setError(response.message || 'Failed to update course');
        throw new Error(response.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update course');
      throw err;
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      setError(null);
      const response = await coursesAPI.deleteCourse(id);
      if (response.success) {
        setCourses(prev => prev.filter(course => course._id !== id));
      } else {
        setError(response.message || 'Failed to delete course');
        throw new Error(response.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete course');
      throw err;
    }
  };

  const enrollInCourse = async (courseId: string) => {
    try {
      setError(null);
      const response = await enrollmentsAPI.enrollInCourse(courseId);
      if (response.success) {
        setEnrollments(prev => [...prev, response.data.enrollment]);
        setCourses(prev =>
          prev.map(course =>
            course._id === courseId
              ? { ...course, enrolledStudents: (course.enrolledStudents || 0) + 1 }
              : course
          )
        );
      } else {
        setError(response.message || 'Failed to enroll in course');
        throw new Error(response.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to enroll in course');
      throw err;
    }
  };

  const fetchUserEnrollments = async () => {
    try {
      const response = await enrollmentsAPI.getUserEnrollments();
      if (response.success) {
        setEnrollments(response.data.enrollments);
      } else {
        setError(response.message || 'Failed to fetch enrollments');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch enrollments');
    }
  };

  const updateProgress = async (enrollmentId: string, progress: number, moduleIndex?: number) => {
    try {
      setError(null);
      const response = await enrollmentsAPI.updateProgress(enrollmentId, progress, moduleIndex);
      if (response.success) {
        setEnrollments(prev =>
          prev.map(enrollment =>
            enrollment._id === enrollmentId ? response.data.enrollment : enrollment
          )
        );
      } else {
        setError(response.message || 'Failed to update progress');
        throw new Error(response.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update progress');
      throw err;
    }
  };

  const unenrollFromCourse = async (enrollmentId: string) => {
    try {
      setError(null);
      const response = await enrollmentsAPI.unenrollFromCourse(enrollmentId);
      if (response.success) {
        setEnrollments(prev => prev.filter(enrollment => enrollment._id !== enrollmentId));
      } else {
        setError(response.message || 'Failed to unenroll from course');
        throw new Error(response.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to unenroll from course');
      throw err;
    }
  };

  const addReview = async (reviewData: any) => {
    try {
      setError(null);
      const response = await reviewsAPI.createReview(reviewData);
      if (response.success) {
        setReviews(prev => [...prev, response.data.review]);
      } else {
        setError(response.message || 'Failed to add review');
        throw new Error(response.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to add review');
      throw err;
    }
  };

  const fetchCourseReviews = async (courseId: string) => {
    try {
      const response = await reviewsAPI.getCourseReviews(courseId);
      if (response.success) {
        setReviews(response.data.reviews);
      } else {
        setError(response.message || 'Failed to fetch reviews');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch reviews');
    }
  };

  const fetchUserReviews = async () => {
    try {
      const response = await reviewsAPI.getUserReviews();
      if (response.success) {
        setReviews(response.data.reviews);
      } else {
        setError(response.message || 'Failed to fetch user reviews');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user reviews');
    }
  };// Utility functions with safe null checks and flexible ID handling

const getCourseById = (id: string) => 
  courses.find(course => course._id === id);

const getEnrollmentByCourse = (courseId: string) =>
  enrollments.find(enrollment => {
    if (!enrollment.course) return false;
    // course might be populated object or just an ID string
    if (typeof enrollment.course === 'string') {
      return enrollment.course === courseId;
    } else {
      return enrollment.course._id === courseId;
    }
  });

const getEnrollmentByCourseAndStudent = (courseId: string, studentId: string) => {
  return enrollments.find(e => {
    // Check course field
    const courseMatch = e.course
      ? (typeof e.course === 'string' ? e.course === courseId : e.course._id === courseId)
      : false;

    // Check student field
    const studentMatch = e.student
      ? (typeof e.student === 'string' ? e.student === studentId : e.student._id === studentId)
      : false;

    return courseMatch && studentMatch;
  });
};


  const getReviewsByCourse = (courseId: string) =>
    reviews.filter(review => review.course === courseId);

  return (
    <CourseContext.Provider
      value={{
        courses,
        reviews,
        enrollments,
        loading,
        error,
        fetchCourses,
        fetchCourseById,
        addCourse,
        updateCourse,
        deleteCourse,
        enrollInCourse,
        fetchUserEnrollments,
        updateProgress,
        unenrollFromCourse,
        addReview,
        fetchCourseReviews,
        fetchUserReviews,
        getCourseById,
        getEnrollmentByCourse,
        getEnrollmentByCourseAndStudent, // ✅ exposed here
        getReviewsByCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
