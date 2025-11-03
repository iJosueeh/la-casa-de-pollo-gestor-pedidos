import './App.css'

import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Header, Sidebar } from "./shared/components/layout";
import { Outlet, Link, useNavigate } from "react-router-dom"; // 👈 aquí agregamos useNavigate


// Trivial change to force rebuild
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
  const navigate = useNavigate();

  // 🟡 Control del menú lateral
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // 🔐 Cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <div className="h-screen flex flex-col bg-yellow-50">
      {/* 🐔 Encabezado */}
      <Header onMenuClick={toggleSidebar} />

      {/* 🟨 Cuerpo principal */}
      <div className="flex flex-1">
        {/* Sidebar lateral */}
        <Sidebar
          isOpen={isSidebarOpen}
          onLinkClick={closeSidebar}
          onLogoutClick={handleLogout} // aquí usamos el logout real
        />

        {/* Contenido dinámico */}
        <main className="flex-1 p-6 bg-gray-50 transition-all duration-300">
          <div className="flex flex-col items-center justify-center h-full w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;