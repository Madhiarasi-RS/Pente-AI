import React, { useState, useEffect } from 'react';
import { notesAPI, aiAPI } from '../../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Edit, 
  Trash2, 
  FileText, 
  Sparkles, 
  Download, 
  Printer,
  Search,
  Calendar,
  BookOpen
} from 'lucide-react';

interface Note {
  _id: string;
  title: string;
  content: string;
  courseId: string;
  courseName: string;
  moduleIndex?: number;
  summary?: string;
  createdAt: string;
  updatedAt: string;
}

interface NotesManagerProps {
  courseId?: string;
}

const NotesManager: React.FC<NotesManagerProps> = ({ courseId }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [generatingSummary, setGeneratingSummary] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    moduleIndex: ''
  });

  useEffect(() => {
    fetchNotes();
  }, [courseId]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await notesAPI.getUserNotes(courseId);
      if (response.success) {
        setNotes(response.data.notes);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      setError('');
      const noteData = {
        title: formData.title,
        content: formData.content,
        courseId: courseId || '',
        moduleIndex: formData.moduleIndex ? parseInt(formData.moduleIndex) : undefined
      };

      if (editingNote) {
        const response = await notesAPI.updateNote(editingNote._id, noteData);
        if (response.success) {
          setNotes(prev => prev.map(note => 
            note._id === editingNote._id ? response.data.note : note
          ));
        }
      } else {
        const response = await notesAPI.createNote(noteData);
        if (response.success) {
          setNotes(prev => [...prev, response.data.note]);
        }
      }

      resetForm();
    } catch (err: any) {
      setError(err.message || 'Failed to save note');
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      moduleIndex: note.moduleIndex?.toString() || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = async (noteId: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await notesAPI.deleteNote(noteId);
        setNotes(prev => prev.filter(note => note._id !== noteId));
      } catch (err: any) {
        setError(err.message || 'Failed to delete note');
      }
    }
  };

  const generateSummary = async (note: Note) => {
    try {
      setGeneratingSummary(note._id);
      setError('');
      
      const response = await notesAPI.generateNoteSummary(note._id);
      if (response.success) {
        setNotes(prev => prev.map(n => 
          n._id === note._id ? { ...n, summary: response.data.summary } : n
        ));
      }
    } catch (err: any) {
      setError(err.message || 'Failed to generate summary');
    } finally {
      setGeneratingSummary(null);
    }
  };

  const exportToPDF = (note: Note) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${note.title}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; }
              h1 { color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px; }
              .meta { color: #666; margin-bottom: 20px; }
              .content { line-height: 1.6; margin-bottom: 30px; }
              .summary { background: #f8f9fa; padding: 20px; border-left: 4px solid #4F46E5; }
              .summary h3 { margin-top: 0; color: #4F46E5; }
            </style>
          </head>
          <body>
            <h1>${note.title}</h1>
            <div class="meta">
              <p><strong>Course:</strong> ${note.courseName}</p>
              ${note.moduleIndex ? `<p><strong>Module:</strong> ${note.moduleIndex}</p>` : ''}
              <p><strong>Created:</strong> ${new Date(note.createdAt).toLocaleDateString()}</p>
            </div>
            <div class="content">
              <h3>Content</h3>
              <p>${note.content.replace(/\n/g, '<br>')}</p>
            </div>
            ${note.summary ? `
              <div class="summary">
                <h3>AI Generated Summary</h3>
                <p>${note.summary}</p>
              </div>
            ` : ''}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const resetForm = () => {
    setFormData({ title: '', content: '', moduleIndex: '' });
    setEditingNote(null);
    setShowAddForm(false);
    setError('');
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Notes</h2>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Note
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Notes Grid */}
      {loading ? (
        <div className="text-center py-8">Loading notes...</div>
      ) : filteredNotes.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Notes Yet</h3>
            <p className="text-gray-600 mb-4">Start taking notes to keep track of your learning!</p>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Note
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <Card key={note._id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(note)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(note._id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-3 w-3" />
                  {new Date(note.createdAt).toLocaleDateString()}
                  {note.moduleIndex && (
                    <>
                      <span>•</span>
                      <BookOpen className="h-3 w-3" />
                      Module {note.moduleIndex}
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                  {note.content}
                </p>

                {note.summary && (
                  <div className="bg-blue-50 p-3 rounded-md mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">AI Summary</span>
                    </div>
                    <p className="text-sm text-blue-700 line-clamp-2">{note.summary}</p>
                  </div>
                )}

                <Separator className="my-3" />

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => generateSummary(note)}
                      disabled={generatingSummary === note._id}
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      {generatingSummary === note._id ? 'Generating...' : 'Summarize'}
                    </Button>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => exportToPDF(note)}>
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => exportToPDF(note)}>
                      <Printer className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Note Dialog */}
      <Dialog open={showAddForm} onOpenChange={(open) => !open && resetForm()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingNote ? 'Edit Note' : 'Add New Note'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter note title"
                required
              />
            </div>

            <div>
              <Label htmlFor="moduleIndex">Module (Optional)</Label>
              <Input
                id="moduleIndex"
                type="number"
                value={formData.moduleIndex}
                onChange={(e) => setFormData(prev => ({ ...prev, moduleIndex: e.target.value }))}
                placeholder="Module number"
                min="1"
              />
            </div>

            <div>
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Write your notes here..."
                rows={8}
                required
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button type="submit">
                {editingNote ? 'Update Note' : 'Save Note'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotesManager;