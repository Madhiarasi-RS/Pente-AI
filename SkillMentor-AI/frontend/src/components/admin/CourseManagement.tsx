import React, { useState, useEffect } from 'react';
import { coursesAPI } from '../../services/api';
import AddCourseForm from './AddCourseForm';
import EditCourseForm from './EditCourseForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, Eye, Edit, Trash2, Plus, Star, Youtube, Image as ImageIcon } from 'lucide-react';

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  difficulty: string;
  duration: string;
  category: string;
  price: number;
  youtubeUrl?: string;
  image?: string;
  notes?: string;
  rating?: number;
  reviewCount?: number;
  enrolledStudents?: number;
  isActive: boolean;
  createdAt: string;
}

const CourseManagement = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 4,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    fetchCourses();
  }, [pagination.page, searchTerm]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await coursesAPI.getAllCourses({
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm || undefined
      });

      if (response.success) {
        setCourses(response.data.courses);
        setPagination(prev => ({
          ...prev,
          total: response.data.pagination.total,
          pages: response.data.pagination.pages
        }));
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await coursesAPI.deleteCourse(courseId);
        setCourses(prev => prev.filter(course => course._id !== courseId));
      } catch (err: any) {
        setError(err.message || 'Failed to delete course');
      }
    }
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setShowEditForm(true);
  };

  const handleCourseUpdated = () => {
    fetchCourses();
    setShowEditForm(false);
    setSelectedCourse(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Course Management</CardTitle>
            <Button 
              className="flex items-center gap-2"
              onClick={() => setShowAddForm(true)}
            >
              <Plus className="h-4 w-4" />
              Add Course
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Search */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Courses Table */}
          {loading ? (
            <div className="text-center py-8">Loading courses...</div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Media</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCourses.map((course) => (
                      <TableRow key={course._id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            {course.image && (
                              <img 
                                src={course.image} 
                                alt={course.title}
                                className="w-12 h-12 object-cover rounded"
                              />
                            )}
                            <div>
                              <div className="font-medium">{course.title}</div>
                              <div className="text-sm text-gray-500 max-w-xs truncate">
                                {course.description}
                              </div>
                              {course.notes && (
                                <div className="text-xs text-blue-600 mt-1">
                                  📝 Has notes
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{course.instructor}</TableCell>
                        <TableCell>{course.category}</TableCell>
                        <TableCell>
                          <Badge className={getDifficultyColor(course.difficulty)}>
                            {course.difficulty}
                          </Badge>
                        </TableCell>
                        <TableCell>₹{course.price}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span>{course.rating || 0}</span>
                            <span className="text-gray-500 ml-1">({course.reviewCount || 0})</span>
                          </div>
                        </TableCell>
                        <TableCell>{course.enrolledStudents || 0}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {course.youtubeUrl && (
                              <Youtube className="h-4 w-4 text-red-500" title="Has YouTube video" />
                            )}
                            {course.image && (
                              <ImageIcon className="h-4 w-4 text-blue-500" title="Has image" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                           
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditCourse(course)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteCourse(course._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-gray-600">
                    Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                    {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                    {pagination.total} courses
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                      disabled={pagination.page === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                      disabled={pagination.page === pagination.pages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

          {filteredCourses.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">
              No courses found matching your search.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Course Dialog */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <AddCourseForm 
            onSuccess={() => {
              setShowAddForm(false);
              fetchCourses();
            }}
            onCancel={() => setShowAddForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Course Dialog */}
      <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCourse && (
            <EditCourseForm 
              course={selectedCourse}
              onSuccess={handleCourseUpdated}
              onCancel={() => setShowEditForm(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseManagement;