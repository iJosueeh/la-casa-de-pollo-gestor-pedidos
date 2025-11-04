import React, { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';

interface HamburgerMenuProps {
  children: React.ReactNode;
  className?: string;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ children, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Cerrar el menú al cambiar el tamaño de la ventana
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleChildClick = (child: ReactNode) => {
    if (React.isValidElement(child)) {
      const childProps = child.props as { onClick?: (e: React.MouseEvent) => void };
      const { onClick, ...restProps } = childProps;
      
      const newProps = {
        ...restProps,
        onClick: (e: React.MouseEvent) => {
          setIsOpen(false);
          if (onClick) {
            onClick(e);
          }
        }
      };
      
      return React.cloneElement(child, newProps);
    }
    return child;
  };

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <Button
        onClick={toggleMenu}
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:shadow-none md:w-auto md:h-auto`}
      >
        <div className="h-full flex flex-col p-4">
          <div className="flex justify-end md:hidden mb-4">
            <Button
              onClick={toggleMenu}
              variant="ghost"
              size="icon"
              aria-label="Cerrar menú"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex-1">
            {React.Children.map(children, (child) => handleChildClick(child))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
