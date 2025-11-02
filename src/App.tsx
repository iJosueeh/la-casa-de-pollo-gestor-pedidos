import './App.css'

import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Header, Sidebar } from "./shared/components/layout";
import { Outlet } from 'react-router-dom';

// Trivial change to force rebuild
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header onMenuClick={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} onLinkClick={closeSidebar} onLogoutClick={closeSidebar} />
        <main className="flex-1 p-6 bg-gray-50 transition-all duration-300">
            <div className="flex flex-col items-center justify-center h-full w-full">
                <Outlet />
            </div>
        </main>
      </div>
    </div>
  );
}

export { App };