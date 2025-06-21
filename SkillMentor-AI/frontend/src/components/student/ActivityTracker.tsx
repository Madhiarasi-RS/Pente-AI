
import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Clock, X } from 'lucide-react';

const ActivityTracker: React.FC = () => {
  const [showInactivityAlert, setShowInactivityAlert] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  useEffect(() => {
    const updateActivity = () => {
      setLastActivity(Date.now());
      localStorage.setItem('lastActivity', Date.now().toString());
    };

    const checkInactivity = () => {
      const saved = localStorage.getItem('lastActivity');
      const lastActivityTime = saved ? parseInt(saved) : Date.now();
      const inactiveTime = Date.now() - lastActivityTime;
      const fiveHours = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
      
      // For demo purposes, let's use 30 seconds instead of 5 hours
      const demoTime = 30 * 1000; // 30 seconds
      
      if (inactiveTime > demoTime && !showInactivityAlert) {
        setShowInactivityAlert(true);
      }
    };

    // Track user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true });
    });

    // Check for inactivity every minute
    const interval = setInterval(checkInactivity, 60000);

    // Initial activity update
    updateActivity();

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity);
      });
      clearInterval(interval);
    };
  }, [showInactivityAlert]);

  const dismissAlert = () => {
    setShowInactivityAlert(false);
    setLastActivity(Date.now());
    localStorage.setItem('lastActivity', Date.now().toString());
  };

  if (!showInactivityAlert) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <Alert className="border-orange-200 bg-orange-50">
        <Clock className="h-4 w-4 text-orange-600" />
        <AlertDescription className="pr-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-orange-800">Welcome back!</p>
              <p className="text-sm text-orange-700 mt-1">
                You've been inactive for a while. Continue your learning journey!
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={dismissAlert}
              className="absolute top-2 right-2 h-6 w-6 p-0 text-orange-600 hover:text-orange-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Button size="sm" className="mt-3 bg-orange-600 hover:bg-orange-700">
            Continue Learning
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ActivityTracker;
