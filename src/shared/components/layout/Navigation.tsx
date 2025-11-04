import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, ShoppingCart, ClipboardList, UserCog, LogOut } from 'lucide-react';
import { HamburgerMenu } from '../ui/HamburgerMenu';
import { Button } from '@/shared/components/ui/Button';
import { useAuth } from '../../../shared/hooks/useAuth';

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: "/", text: "Menú", icon: Home },
    { to: "/carrito", text: "Carrito", icon: ShoppingCart },
    { to: "/pedidos", text: "Pedidos", icon: ClipboardList },
    { to: "/admin", text: "Admin", icon: UserCog },
  ];

  const renderNavLink = (to: string, text: string, Icon: React.ElementType, onClick?: () => void) => (
    <NavLink
      key={to}
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? 'bg-linear-to-r from-red-500 to-orange-500 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        }`
      }
    >
      <Icon className="w-5 h-5 mr-3" />
      {text}
    </NavLink>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <HamburgerMenu className="md:hidden">
              {navItems.map(({ to, text, icon: Icon }) => (
                <div key={to} className="mb-2">
                  {renderNavLink(to, text, Icon)}
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Cerrar sesión
                </button>
              </div>
            </HamburgerMenu>

           
            <NavLink to="/" className="ml-4 text-xl font-bold text-gray-900">
              La Casa del Pollo
            </NavLink>
          </div>

          {/* Menú de escritorio */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map(({ to, text, icon: Icon }) => (
              <div key={to}>
                {renderNavLink(to, text, Icon)}
              </div>
            ))}
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-red-600 hover:bg-red-50 ml-2"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-2">Salir</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
