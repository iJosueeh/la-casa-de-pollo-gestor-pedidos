import React from "react";
import { Button } from "@/shared/components/iu";

const categories = ["Todos", "Pollos", "Carnes", "Adicionales", "Bebidas"];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-56 bg-gray-100 border-r border-gray-200 p-4">
      <h2 className="font-semibold mb-4">Categorías</h2>
      <nav className="flex flex-col gap-2">
        {categories.map((cat) => (
          <Button key={cat} variant="secondary" className="w-full justify-start">
            {cat}
          </Button>
        ))}
      </nav>
    </aside>
  );
};
