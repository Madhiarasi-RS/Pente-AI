
import React from 'react';
import { useCourses } from '../../contexts/CourseContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, Download, Eye, Calendar } from 'lucide-react';

const CertificateOversight = () => {
  const { courses, enrollments } = useCourses();

  // Mock certificate data - would come from API
  const certificates = [
    {
      id: '1',
      studentName: 'Madhiarasi',
      courseName: 'MERN Stack for Beginners',
      completionDate: '2025-06-20',
      certificateNumber: 'CERT-2024-001',
      status: 'Issued'
    },
    {
      id: '2',
      studentName: 'Janani',
      courseName: 'Machine Learning Fundamentals',
      completionDate: '2025-06-20',
      certificateNumber: 'CERT-2024-002',
      status: 'Issued'
    }
  ];

  const completedEnrollments = enrollments.filter(e => e.progress === 100);
  const totalCertificatesIssued = certificates.length;
  const pendingCertificates = 3; // Mock data

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Certificates Issued</p>
                <p className="text-3xl font-bold">{totalCertificatesIssued}</p>
              </div>
              <Award className="h-12 w-12 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Certificates</p>
                <p className="text-3xl font-bold">{pendingCertificates}</p>
              </div>
              <Calendar className="h-12 w-12 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-3xl font-bold">
                  {enrollments.length > 0 
                    ? Math.round((completedEnrollments.length / enrollments.length) * 100)
                    : 0}%
                </p>
              </div>
              <Award className="h-12 w-12 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certificates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Certificate Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Completion Date</TableHead>
                  <TableHead>Certificate Number</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {certificates.map((certificate) => (
                  <TableRow key={certificate.id}>
                    <TableCell className="font-medium">{certificate.studentName}</TableCell>
                    <TableCell>{certificate.courseName}</TableCell>
                    <TableCell>{certificate.completionDate}</TableCell>
                    <TableCell className="font-mono text-sm">{certificate.certificateNumber}</TableCell>
                    <TableCell>
                      <Badge variant="default">
                        {certificate.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {certificates.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No certificates have been issued yet.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Completions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Course Completions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {completedEnrollments.slice(0, 5).map((enrollment) => {
              const course = courses.find(c => c.id === enrollment.courseId);
              return (
                <div key={enrollment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Award className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Student completed {course?.title}</p>
                      <p className="text-sm text-gray-600">Enrolled on {enrollment.enrolledDate}</p>
                    </div>
                  </div>
                  <Button size="sm">
                    Issue Certificate
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificateOversight;
