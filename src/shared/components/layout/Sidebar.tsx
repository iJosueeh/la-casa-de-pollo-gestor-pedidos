import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, ShoppingCart, ClipboardList, UserCog} from "lucide-react"; 


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
        ${isDesktop ? "w-56" : "w-full"}
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>

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
