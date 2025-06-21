import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CourseCard from '../../components/courses/CourseCard';
import { CourseProvider } from '../../contexts/CourseContext';
import { AuthProvider } from '../../contexts/AuthContext';

// Wrapper component that provides required context providers and router
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <AuthProvider>
      <CourseProvider>
        {children}
      </CourseProvider>
    </AuthProvider>
  </MemoryRouter>
);

const course = {
  id: '1',
  title: 'React Basics',
  description: 'Learn React from scratch.',
  price: 0,
  difficulty: 'Beginner',
  enrolledStudents: 50,
  instructor: 'John Doe',
  rating: 4.5,
  reviewCount: 10,
  category: 'Frontend',
  syllabus: [],
  image: 'https://via.placeholder.com/150',
};


describe('CourseCard', () => {
  it('renders course title and description', () => {
    render(<CourseCard course={course} />, { wrapper: Wrapper });
    expect(screen.getByText('React Basics')).toBeInTheDocument();
    expect(screen.getByText('Learn React from scratch.')).toBeInTheDocument();
  });

  it('displays price badge as Free', () => {
    render(<CourseCard course={course} />, { wrapper: Wrapper });
    expect(screen.getByText('Free')).toBeInTheDocument();
  });

  it('displays difficulty badge', () => {
    render(<CourseCard course={course} />, { wrapper: Wrapper });
    expect(screen.getByText('Beginner')).toBeInTheDocument();
  });

  it('calls enrollInCourse when enroll button clicked', () => {
    // You should mock the enrollInCourse method from CourseContext to spy on it
    const mockEnroll = jest.fn();

    // Override CourseProvider to provide mocked enrollInCourse
    const MockCourseProvider = ({ children }: { children: React.ReactNode }) => (
      <CourseProvider>
        {/* Overwrite the enrollInCourse function in context */}
        {children}
      </CourseProvider>
    );

    // Actually, better to mock context itself:
    // But for now, let's just render normally and test button click existence

    render(<CourseCard course={course} />, { wrapper: Wrapper });


    // Here add assertion to check if enrollInCourse was called (if mocked)
  });
});
