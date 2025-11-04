import React, { createContext, useContext } from 'react';
import { useNotification } from '../hooks/useNotification';

interface NotificationContextType {
  notification: ReturnType<typeof useNotification>['notification'];
  showNotification: ReturnType<typeof useNotification>['showNotification'];
  hideNotification: ReturnType<typeof useNotification>['hideNotification'];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { notification, showNotification, hideNotification } = useNotification();

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};
