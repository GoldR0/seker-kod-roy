import { useState } from 'react';

type NotificationType = 'success' | 'error';

interface Notification {
  message: string;
  type: NotificationType;
}

export const useNotifications = () => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (message: string, type: NotificationType) => {
    setNotification({ message, type });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return {
    notification,
    showNotification,
    hideNotification
  };
};
