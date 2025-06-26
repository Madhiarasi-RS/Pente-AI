import React, { useEffect, useState } from 'react';
import { usersAPI } from '../../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, Edit, Trash2, Users, UserCheck, UserX } from 'lucide-react';
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
  };
}

const StudentManagement = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, [pagination.page, searchTerm]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError('');
      const res: any = await usersAPI.getAllUsers({
        page: pagination.page,
        limit: pagination.limit,
        role: 'student',
        search: searchTerm || undefined,
      });
      if (res.success) {
        setStudents(res.data.users);
        setPagination(prev => ({ ...prev, total: res.data.pagination.total, pages: res.data.pagination.pages }));
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStudent = async (id: string, updatedData: Partial<Student>) => {
    setLoading(true);
    setError('');
    try {
      const updatedUser = await usersAPI.updateUser(id, updatedData);
      setStudents(prev =>
        prev.map(s => (s._id === id ? { ...s, ...updatedUser } : s))
      );
      toast.success('User Data successfully updated');
      fetchStudents();
    } catch (err: any) {
      setError(err.message || 'Failed to update student');
      toast.error(err.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await usersAPI.deleteUser(id);
        setStudents(prev => prev.filter(s => s._id !== id));
        toast.success('Student deleted');
        fetchStudents();
      } catch (err: any) {
        setError(err.message || 'Failed to delete student');
        toast.error(err.message || 'Delete failed');
      }
    }
  };

  const viewDetails = async (id: string) => {
    try {
      const res = await usersAPI.getUserById(id);
      if (res.success) {
        setSelectedStudent(res.user);
        setShowDetails(true);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch student details');
    }
  };

  const openEditDialog = (student: Student) => {
    setEditStudent(student);
    setShowEditDialog(true);
  };

  const activeCount = students.filter(s => s.isActive).length;
  const inactiveCount = students.filter(s => !s.isActive).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card><CardContent className="p-6"><div className="flex justify-between"><div><p className="text-sm">Total Students</p><p className="text-3xl font-bold">{pagination.total}</p></div><Users className="h-10 w-10 text-blue-500" /></div></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex justify-between"><div><p className="text-sm">Active</p><p className="text-3xl font-bold">{activeCount}</p></div><UserCheck className="h-10 w-10 text-green-500" /></div></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex justify-between"><div><p className="text-sm">Inactive</p><p className="text-3xl font-bold">{inactiveCount}</p></div><UserX className="h-10 w-10 text-red-500" /></div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>User Management</CardTitle></CardHeader>
        <CardContent>
          {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input className="pl-10" placeholder="Search by name or email" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>

          {loading ? (<div className="py-6 text-center">Loading...</div>) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Education</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student._id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.profile?.contactNo || 'N/A'}</TableCell>
                      <TableCell>{student.profile?.education || 'N/A'}</TableCell>
                      <TableCell>{new Date(student.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell><Badge className={student.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>{student.isActive ? 'Active' : 'Inactive'}</Badge></TableCell>
                      <TableCell className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => openEditDialog(student)} disabled={loading}><Edit className="h-4 w-4" /></Button>
                        <Button size="sm" variant="outline" className="text-red-500" onClick={() => handleDelete(student._id)} disabled={loading}><Trash2 className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Edit Student</DialogTitle></DialogHeader>
          {editStudent && (
            <form onSubmit={async (e) => {
              e.preventDefault();
              await handleUpdateStudent(editStudent._id, editStudent);
              setShowEditDialog(false);
            }} className="space-y-4">
              <fieldset disabled={loading} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <Input value={editStudent.name} onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <Input value={editStudent.email} onChange={(e) => setEditStudent({ ...editStudent, email: e.target.value })} />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Contact No</label>
                    <Input value={editStudent.profile?.contactNo || ''} onChange={(e) => setEditStudent({ ...editStudent, profile: { ...editStudent.profile, contactNo: e.target.value } })} />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Education</label>
                    <Input value={editStudent.profile?.education || ''} onChange={(e) => setEditStudent({ ...editStudent, profile: { ...editStudent.profile, education: e.target.value } })} />
                  </div>
                </div>
              </fieldset>
              <div className="text-right">
                <Button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update'}</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentManagement;
