import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ResumeUploader from './ResumeUploader';
import CertificateViewer from './CertificateViewer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, BookOpen, Award, Upload, Save, Plus, X } from 'lucide-react';
import Header from '../../components/shared/Header';
import { usersAPI } from '../../services/api';
import { toast } from 'sonner';

interface Student {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  profile?: {
    contactNo?: string;
    education?: string;
    university?: string;
    skills?: string[];
    areasOfInterest?: string[];
    fatherName?: string;
    motherName?: string;
    degree?: string;
    major?: string;
    yearOfCompletion?: string;
  };
}

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    fatherName: user?.profile?.fatherName || '',
    motherName: user?.profile?.motherName || '',
    education: user?.profile?.education || '',
    university: user?.profile?.university || '',
    degree: user?.profile?.degree || '',
    major: user?.profile?.major || '',
    yearOfCompletion: user?.profile?.yearOfCompletion || '',
    contactNo: user?.profile?.contactNo || '',
    skills: user?.profile?.skills || [],
    areasOfInterest: user?.profile?.areasOfInterest || []
  });

  // Mock certificates
  const mockCertificates = [
    {
      id: '1',
      courseName: 'React Development Masterclass',
      completionDate: '2024-01-20',
      certificateNumber: 'CERT-2024-001',
      instructor: 'Sarah Johnson',
      grade: 'Excellence'
    },
    {
      id: '2',
      courseName: 'Full Stack Web Development',
      completionDate: '2024-02-15',
      certificateNumber: 'CERT-2024-002',
      instructor: 'John Smith',
      grade: 'Outstanding'
    }
  ];

  const handleSave = async () => {
    if (!user?._id) return;
    
    try {
      const updatedData = {
        name: formData.name,
        profile: {
          fatherName: formData.fatherName,
          motherName: formData.motherName,
          education: formData.education,
          university: formData.university,
          degree: formData.degree,
          major: formData.major,
          yearOfCompletion: formData.yearOfCompletion,
          contactNo: formData.contactNo,
          skills: formData.skills,
          areasOfInterest: formData.areasOfInterest
        }
      };
      
      await usersAPI.updateUser(user._id, updatedData);
      await updateProfile(updatedData);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
      toast.error('Failed to update profile');
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addInterest = () => {
    if (newInterest.trim()) {
      setFormData(prev => ({
        ...prev,
        areasOfInterest: [...prev.areasOfInterest, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (index: number) => {
    setFormData(prev => ({
      ...prev,
      areasOfInterest: prev.areasOfInterest.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Profile
            </h1>
            <p className="text-gray-600 mt-2">Manage your personal information and academic details</p>
          </div>
          <Button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            size="lg"
          >
            {isEditing ? <Save className="h-5 w-5" /> : <User className="h-5 w-5" />}
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm border border-white/20">
            <TabsTrigger value="profile" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="resume" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Upload className="h-4 w-4" />
              Resume
            </TabsTrigger>
            <TabsTrigger value="certificates" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Award className="h-4 w-4" />
              Certificates
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <BookOpen className="h-4 w-4" />
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={formData.email}
                        disabled
                        className="mt-1 bg-gray-50"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fatherName">Father's Name</Label>
                      <Input
                        id="fatherName"
                        value={formData.fatherName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fatherName: e.target.value }))}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="motherName">Mother's Name</Label>
                      <Input
                        id="motherName"
                        value={formData.motherName}
                        onChange={(e) => setFormData(prev => ({ ...prev, motherName: e.target.value }))}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="contactNo">Contact Number</Label>
                    <Input
                      id="contactNo"
                      value={formData.contactNo}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactNo: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Academic Information */}
              <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                    Academic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div>
                    <Label htmlFor="education">Current Education</Label>
                    <Input
                      id="education"
                      value={formData.education}
                      onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="university">University</Label>
                    <Input
                      id="university"
                      value={formData.university}
                      onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="degree">Degree</Label>
                      <Input
                        id="degree"
                        value={formData.degree}
                        onChange={(e) => setFormData(prev => ({ ...prev, degree: e.target.value }))}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="major">Major</Label>
                      <Input
                        id="major"
                        value={formData.major}
                        onChange={(e) => setFormData(prev => ({ ...prev, major: e.target.value }))}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="yearOfCompletion">Year of Completion</Label>
                    <Input
                      id="yearOfCompletion"
                      value={formData.yearOfCompletion}
                      onChange={(e) => setFormData(prev => ({ ...prev, yearOfCompletion: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-green-500/10 to-teal-500/10">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-600" />
                    Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1 bg-gradient-to-r from-green-100 to-teal-100 text-green-800 border-green-200">
                        {skill}
                        {isEditing && (
                          <X 
                            className="h-3 w-3 cursor-pointer hover:text-red-500 transition-colors" 
                            onClick={() => removeSkill(index)}
                          />
                        )}
                      </Badge>
                    ))}
                  </div>
                  
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill"
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      />
                      <Button onClick={addSkill} size="sm" className="bg-green-600 hover:bg-green-700">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Areas of Interest */}
              <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-orange-500/10 to-red-500/10">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-orange-600" />
                    Areas of Interest
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="flex flex-wrap gap-2">
                    {formData.areasOfInterest.map((interest, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border-orange-200">
                        {interest}
                        {isEditing && (
                          <X 
                            className="h-3 w-3 cursor-pointer hover:text-red-500 transition-colors" 
                            onClick={() => removeInterest(index)}
                          />
                        )}
                      </Badge>
                    ))}
                  </div>
                  
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        placeholder="Add an interest"
                        onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                      />
                      <Button onClick={addInterest} size="sm" className="bg-orange-600 hover:bg-orange-700">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resume">
            <ResumeUploader />
          </TabsContent>

          <TabsContent value="certificates">
            <CertificateViewer certificates={mockCertificates} />
          </TabsContent>

          <TabsContent value="achievements">
            <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  Learning Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl">
                      <BookOpen className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Courses Enrolled</h3>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">3</p>
                  </div>
                  
                  <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl">
                      <Award className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Certificates Earned</h3>
                    <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">2</p>
                  </div>
                  
                  <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl">
                      <User className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Profile Completion</h3>
                    <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">85%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
