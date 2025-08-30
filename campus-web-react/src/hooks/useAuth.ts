import { useState, useEffect } from 'react';
import { User } from '../types';
import { demoUsers } from '../data/demoData';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load user from localStorage on component mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('campus-current-user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
      }
    } catch (error) {
      // Error loading user from localStorage
      // Clear corrupted data
      localStorage.removeItem('campus-current-user');
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    const user = demoUsers[email];
    if (user && password === '123456') {
      setCurrentUser(user);
      
      // Save to localStorage
      try {
        localStorage.setItem('campus-current-user', JSON.stringify(user));
      } catch (error) {
        // Error saving user to localStorage
      }
      
      return { success: true, message: 'התחברת בהצלחה!' };
    } else {
      return { success: false, message: 'שם משתמש או סיסמה שגויים' };
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    
    // Clear from localStorage
    try {
      localStorage.removeItem('campus-current-user');
    } catch (error) {
      // Error clearing user from localStorage
    }
    
    return { success: true, message: 'התנתקת בהצלחה' };
  };

  return {
    currentUser,
    handleLogin,
    handleLogout
  };
};
