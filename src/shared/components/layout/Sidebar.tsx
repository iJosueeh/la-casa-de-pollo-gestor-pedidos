import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, ShoppingCart, ClipboardList, UserCog } from "lucide-react";

const links = [
  { to: "/", text: "Menú", icon: Menu },
  { to: "/carrito", text: "Carrito", icon: ShoppingCart },
  { to: "/pedidos", text: "Pedidos", icon: ClipboardList },
  { to: "/admin", text: "Admin", icon: UserCog },
];

export const Sidebar: React.FC<{ isOpen: boolean; onLinkClick: () => void; onLogoutClick: () => void }> = ({ isOpen, onLinkClick, onLogoutClick }) => {
  return (
    <div
      className={`fixed top-16 inset-y-0 left-0 w-full bg-white border-r border-gray-200 p-4 transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:w-56 flex flex-col justify-between`}>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onLinkClick}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md text-sm font-medium ${
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
          className="w-full px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};
