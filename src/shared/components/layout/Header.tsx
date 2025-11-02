import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/shared/components/iu";
import { useLocation } from "react-router-dom";

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

export const Header: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  const location = useLocation();
  const title = getTitle(location.pathname);

  return (
    <header className="relative flex items-center justify-center bg-gray-50 px-6 py-3 shadow-md z-10">
      <div className="absolute left-6">
        <Button onClick={onMenuClick} variant="secondary" className="mr-4">
          <Menu className="h-6 w-6 text-gray-800" />
        </Button>
      </div>
      <h1 className="text-gray-800 font-bold text-xl">{title}</h1>
    </header>
  );
};
