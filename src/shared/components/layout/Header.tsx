import React from "react";
import { Input, Button } from "@/shared/components/iu"; 

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between bg-yellow-500 px-6 py-3 shadow-md">
      {/* Logo */}
      <h1 className="text-white font-bold text-xl">La Casa del Pollo</h1>

      {/* Barra de búsqueda */}
      <div className="flex-1 mx-6">
        <Input placeholder="Buscar productos..." className="w-full" />
      </div>

      {/* Botones de acción */}
      <div className="flex gap-3">
        <Button variant="secondary">Login</Button>
        <Button variant="primary">Carrito</Button>
      </div>
    </header>
  );
};
