import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, ShoppingCart, ClipboardList, UserCog, X } from "lucide-react"; 
import { Button } from "@/shared/components/iu"; 

const links = [
  { to: "/", text: "Menú", icon: Menu },
  { to: "/carrito", text: "Carrito", icon: ShoppingCart },
  { to: "/pedidos", text: "Pedidos", icon: ClipboardList },
  { to: "/admin", text: "Admin", icon: UserCog },
];

export const AppSidebar: React.FC<{ isOpen: boolean; onLinkClick: () => void; onLogoutClick: () => void; isDesktop: boolean }> = ({ isOpen, onLinkClick, onLogoutClick, isDesktop }) => {
  return (
    <div
      className={`p-6 z-20 transition-all duration-300 ease-in-out bg-white flex flex-col justify-between h-[calc(100vh-4rem)] fixed top-16 left-0
        ${isDesktop ? "w-56" : "w-64"}
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
      <div className="absolute top-4 right-4 md:hidden">
        <Button onClick={onLinkClick} variant="secondary" className="p-2">
          <X className="h-5 w-5 text-gray-800" />
        </Button>
      </div>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onLinkClick}
            className={({ isActive }) =>
              `flex items-center px-6 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? "bg-linear-to-r from-red-500 to-orange-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {link.icon && <link.icon className="w-5 h-5 mr-3" />}
            {link.text}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto">
        <button
          onClick={onLogoutClick}
          className="w-full px-6 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};
