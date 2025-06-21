import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, usersAPI } from '../services/api';
import { toast } from 'sonner';

interface User {
  _id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
  profile?: any;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profileData: any) => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCurrentUser = async () => {
    try {
      const response = await authAPI.getCurrentUser();
      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('token');
      }
    } catch (err) {
      console.error('Error fetching current user:', err);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Check if admin hardcoded login
      if (token === 'admin-token') {
        const adminUser: User = {
          _id: 'admin-1',
          email: 'admin@edu.com',
          name: 'Admin User',
          role: 'admin',
          isActive: true,
          emailVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setUser(adminUser);
        setIsAuthenticated(true);
        setLoading(false);
      } else {
        getCurrentUser(); // Fetch user from backend
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      setLoading(true);

      // ✅ Hardcoded Admin Login
      if (email === 'admin@edu.com' && password === 'admin123') {
        const adminUser: User = {
          _id: 'admin-1',
          email: 'admin@edu.com',
          name: 'Admin User',
          role: 'admin',
          isActive: true,
          emailVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        localStorage.setItem('token', 'admin-token');
        setUser(adminUser);
        setIsAuthenticated(true);
        toast.success('Admin login successful!');
        return true;
      }

      const response = await authAPI.login(email, password);
      if (response.success) {
        localStorage.setItem('token', response.token);
        setUser(response.user);
        setIsAuthenticated(true);
        toast.success('Login successful!');
        return true;
      }

      toast.error('Login failed. Check credentials.');
      return false;
    } catch (err: any) {
      setError(err.message || 'Login failed');
      toast.error(err.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      setError(null);
      setLoading(true);

      const response = await authAPI.register(userData);

      if (response.success) {
        localStorage.setItem('token', response.token);
        setUser(response.user);
        setIsAuthenticated(true);
        toast.success('Registration successful!');
        return true;
      }

      toast.error('Registration failed.');
      return false;
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      toast.error(err.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    toast.info('Logged out successfully.');
  };

const updateProfile = async (profileData: any): Promise<void> => {
  try {
    setError(null);
    const response = await usersAPI.updateProfileUser(profileData);
    if (response.success) {
      setUser(response.user);
      toast.success('Profile updated!');
    }
  } catch (err: any) {
    setError(err.message || 'Profile update failed');
    toast.error(err.message || 'Profile update failed');
    throw err;
  }
};


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
