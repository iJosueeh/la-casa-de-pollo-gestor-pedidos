import './App.css'

import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { AppHeader } from "./shared/components/layout/Header";
import { AppSidebar } from "./shared/components/layout/Sidebar";

import { Notification } from './shared/components/Notification';
import { useNotificationContext } from './shared/context/NotificationContext';
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./shared/hooks/useAuth"; 


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
  const { notification, hideNotification } = useNotificationContext();
  const navigate = useNavigate();
  const { logout } = useAuth(); 

  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log('toggleSidebar called, isSidebarOpen:', !isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    console.log('closeSidebar called');
  };

  
  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* Encabezado */}
      <AppHeader
        onMenuClick={toggleSidebar}
        className=""
      />

      {/* Cuerpo principal */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar lateral */}
        <AppSidebar
          isOpen={isSidebarOpen}
          onLinkClick={closeSidebar}
          onLogoutClick={handleLogout}
          isDesktop={isDesktop}
        />

        
                <main
                  className={`flex-1 p-6 bg-gray-50 transition-all duration-300 overflow-y-auto min-h-[calc(100vh-4rem)]`}          onClick={() => !isDesktop && isSidebarOpen && closeSidebar()}
        >
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <Notification
        show={notification.show}
        message={notification.message}
        type={notification.type}
        onClose={hideNotification}
      />
    </div>
  );
}

export default App;