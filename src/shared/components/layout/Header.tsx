import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/shared/components/iu";
import { useLocation } from "react-router-dom";

// No-op comment to force re-processing


const getTitle = (pathname: string) => {
  switch (pathname) {
    case "/":
      return "Menú de Productos";
    case "/producto":
      return "Producto";
    case "/carrito":
      return "Carrito de Compras";
    case "/pedidos":
      return "Mis Pedidos";
    case "/admin":
      return "Panel de Administración";
    case "/login":
      return "Login";
    default:
      return "La Casa del Pollo";
  }
};

export const AppHeader: React.FC<{ onMenuClick: () => void; className?: string }> = ({ onMenuClick, className }) => {
  const location = useLocation();
  const title = getTitle(location.pathname);

  return (
    <header className={`fixed top-0 left-0 right-0 flex items-center bg-gray-50 px-4 sm:px-6 h-16 shadow-md z-30 ${className}`}>
      <div className="w-full max-w-7xl mx-auto flex items-center">
        <Button 
          onClick={onMenuClick} 
          variant="secondary" 
          className="p-2 mr-4 md:mr-6"
          aria-label="Menú"
        >
          <Menu className="h-6 w-6 text-gray-800" />
        </Button>
        <h1 className="text-gray-800 font-bold text-base sm:text-lg grow text-center md:text-left">
          {title}
        </h1>
      </div>
    </header>
  );
};
