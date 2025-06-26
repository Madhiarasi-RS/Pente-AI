import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BookOpen, User, Settings, LogOut, Home, BarChart3 } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to={user?.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} className="flex items-center">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">SkillMentor.AI</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {user?.role === 'student' && (
              <>
                <Link 
                  to="/student/dashboard" 
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <Home className="h-4 w-4 mr-1" />
                  Dashboard
                </Link>
                <Link 
                  to="/interviewpreparation" 
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <BookOpen className="h-4 w-4 mr-1" />
                  Preparation
                </Link>
                <Link 
                  to="/profile" 
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <User className="h-4 w-4 mr-1" />
                  Profile
                </Link>
                <Link 
                  to="/contact" 
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <Settings className="h-4 w-4 mr-1" />
                  Contact
                </Link>
                <Link 
                  to="/about" 
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <User className="h-4 w-4 mr-1" />
                  About
                </Link>
              </>
            )}
            {user?.role === 'admin' && (
              <>
                <Link 
                  to="/admin/dashboard" 
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  
                </Link>
              </>
            )}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-indigo-600" />
                  </div>
                  <span className="hidden md:block">{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                  {user?.about && (
                    <p className="text-xs text-gray-500 italic mt-1 truncate">{user.about}</p>
                  )}
                </div>
                <DropdownMenuSeparator />
                {user?.role === 'student' && (
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
