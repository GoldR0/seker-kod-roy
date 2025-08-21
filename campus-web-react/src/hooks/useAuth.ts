import { useState } from 'react';
import { User } from '../types';
import { demoUsers } from '../data/demoData';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (email: string, password: string) => {
    const user = demoUsers[email];
    if (user && password === '123456') {
      setCurrentUser(user);
      return { success: true, message: 'התחברת בהצלחה!' };
    } else {
      return { success: false, message: 'שם משתמש או סיסמה שגויים' };
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    return { success: true, message: 'התנתקת בהצלחה' };
  };

  return {
    currentUser,
    handleLogin,
    handleLogout
  };
};
