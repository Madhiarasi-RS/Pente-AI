import axios from 'axios';

const API_BASE_URL='https://skillmentor-backend.onrender.com/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to add token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
  
});

// Central API Request Handler
const apiRequest = async (method: string, url: string, data?: any, config?: any) => {
  try {
    const response = await apiClient.request({
      method,
      url,
      data,
      ...config,
    });
    return response.data;
  } catch (error: any) {
    console.error('API Error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

// ==== API Modules ====

// Auth
export const authAPI = {
  login: (email: string, password: string) =>
    apiRequest('POST', '/auth/login', { email, password }),

  register: (userData: { name: string; email: string; password: string; contactNo?: string }) =>
    apiRequest('POST', '/auth/register', userData),

  getCurrentUser: () => apiRequest('GET', '/auth/me'),

  updatePassword: (currentPassword: string, newPassword: string) =>
    apiRequest('PUT', '/auth/password', { currentPassword, newPassword }),

  logout: () => apiRequest('POST', '/auth/logout'),
};

export const usersAPI = {
  // Fetch all users (with filters, pagination, etc.)
  getAllUsers: async (params: any) => {
    const res = await apiClient.get('/users', { params });
    return res.data;
  },

  // Get a single user by ID
  getUserById: async (id: string) => {
    const res = await apiClient.get(`/users/${id}`);
    return res.data;
  },

  // ✅ Update only the status (used for toggling active/inactive)
  updateUserStatus: async (id: string, isActive: boolean) => {
    const res = await apiClient.patch(`/users/${id}/status`, { isActive });
    return res.data;
  },

  // ✅ Update the entire user (used for editing name, email, contact, education, etc.)
  updateUser: async (id: string, updatedData: any) => {
    const res = await apiClient.put(`/users/${id}`, updatedData); // full update
    return res.data;
  },
 // ✅ updateUser function inside usersAPI
updateProfileUser: async (updatedData: any) => {
  const res = await apiClient.put(`/users/profile`, updatedData); // No need to pass ID
  return res.data;
},
    
  // Delete user by ID
  deleteUser: async (id: string) => {
    const res = await apiClient.delete(`/users/${id}`);
    return res.data;
  },
  getDashboard: async () => {
    const res = await apiClient.get('/courses');
    return res.data;
  },
};

export const coursesAPI = {
  getAllCourses: (params?: Record<string, any>) =>
    apiClient.get('/courses', { params }).then(res => res.data),

  getCourseById: (id: string) =>
    apiClient.get(`/courses/${id}`).then(res => res.data),

  createCourse: (data: any) =>
    apiClient.post('/courses', data).then(res => res.data),

  updateCourse: (id: string, data: any) =>
    apiClient.put(`/courses/${id}`, data).then(res => res.data),

  deleteCourse: (id: string) =>
    apiClient.delete(`/courses/${id}`).then(res => res.data),

  getRecommendations: () =>
    apiClient.get('/courses/user/recommendations').then(res => res.data),
};

// Enrollments
export const enrollmentsAPI = {
  enrollInCourse: (courseId: string) =>
    apiRequest('POST', '/enrollments', { courseId }),

  getUserEnrollments: (params?: any) =>
    apiRequest('GET', '/enrollments', null, { params }),

  getEnrollmentById: (id: string) => apiRequest('GET', `/enrollments/${id}`),

  updateProgress: (id: string, progress: number, completedModuleIndex?: number) =>
    apiRequest('PUT', `/enrollments/${id}/progress`, { progress, completedModuleIndex }),

  unenrollFromCourse: (id: string) => apiRequest('DELETE', `/enrollments/${id}`),

  getEnrollmentByCourse: (courseId: string) =>
    apiRequest('GET', `/enrollments/course/${courseId}`),
};

// Reviews
export const reviewsAPI = {
  createReview: (reviewData: { courseId: string; rating: number; comment: string }) =>
    apiRequest('POST', '/reviews', reviewData),

  getCourseReviews: (courseId: string, params?: any) =>
    apiRequest('GET', `/reviews/course/${courseId}`, null, { params }),

  getUserReviews: (params?: any) =>
    apiRequest('GET', '/reviews/my-reviews', null, { params }),

  updateReview: (id: string, data: { rating: number; comment: string }) =>
    apiRequest('PUT', `/reviews/${id}`, data),

  deleteReview: (id: string) => apiRequest('DELETE', `/reviews/${id}`),

  markReviewHelpful: (id: string) => apiRequest('POST', `/reviews/${id}/helpful`),

  reportReview: (id: string, reason: string) =>
    apiRequest('POST', `/reviews/${id}/report`, { reason }),
};

// Admin
export const adminAPI = {
  getDashboard: () => apiRequest('GET', '/admin/dashboard'),

  getUserAnalytics: (timeframe?: string) =>
    apiRequest('GET', '/admin/analytics/users', null, { params: { timeframe } }),

  getCourseAnalytics: () => apiRequest('GET', '/admin/analytics/courses'),

  getReportedReviews: (params?: any) =>
    apiRequest('GET', '/admin/reported-reviews', null, { params }),

  moderateReview: (id: string, action: 'approve' | 'reject') =>
    apiRequest('PUT', `/admin/reviews/${id}/moderate`, { action }),
};

export const uploadAPI = {
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios.post('http://localhost:5000/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
  uploadMultipleFiles: async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    const token = localStorage.getItem('token');

    const response = await axios.post(`${API_BASE_URL}/upload/multiple`, formData, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return response.data;
  },
};

// AI
export const aiAPI = {
  generateSummary: (notes: string) =>
    apiRequest('POST', '/ai/generate-summary', { notes }),
};

// Notes
export const notesAPI = {
  createNote: (data: { courseId: string; title: string; content: string; moduleIndex?: number }) =>
    apiRequest('POST', '/notes', data),

  getUserNotes: (courseId?: string) =>
    apiRequest('GET', `/notes`, null, {
      params: courseId ? { courseId } : {},
    }),

  updateNote: (id: string, data: any) => apiRequest('PUT', `/notes/${id}`, data),

  deleteNote: (id: string) => apiRequest('DELETE', `/notes/${id}`),

  generateNoteSummary: (noteId: string) =>
    apiRequest('POST', `/notes/${noteId}/summary`),
};
