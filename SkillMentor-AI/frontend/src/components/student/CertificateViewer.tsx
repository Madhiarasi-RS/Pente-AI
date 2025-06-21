import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, BookOpen } from 'lucide-react';

interface Certificate {
  id: string;
  courseName: string;
  completionDate: string;
  certificateNumber: string;
  instructor: string;
  grade: string;
}

interface CertificateViewerProps {
  certificates: Certificate[];
}

const CertificateViewer: React.FC<CertificateViewerProps> = ({ certificates }) => {
  const getGradeBadgeColor = (grade: string) => {
    switch (grade.toLowerCase()) {
      case 'excellence':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      case 'outstanding':
        return 'bg-gradient-to-r from-green-400 to-blue-500 text-white';
      case 'good':
        return 'bg-gradient-to-r from-blue-400 to-purple-500 text-white';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          My Certificates
        </h2>
        <p className="text-gray-600">Your learning journey and achievements</p>
      </div>

      {certificates.length === 0 ? (
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No Certificates Yet</h3>
            <p className="text-gray-600">Complete courses to earn your first certificate!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <Card key={cert.id} className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg leading-tight">{cert.courseName}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">Certificate #{cert.certificateNumber}</p>
                    </div>
                  </div>
                  <Badge className={`${getGradeBadgeColor(cert.grade)} border-none`}>
                    {cert.grade}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-700">
                      <strong>Instructor:</strong> {cert.instructor}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">
                      <strong>Completed:</strong> {new Date(cert.completionDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3">
                    <p className="text-xs text-center text-gray-600 font-medium">
                      🎉 Congratulations on completing this course! 🎉
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificateViewer;
