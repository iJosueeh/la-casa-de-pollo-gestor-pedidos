import React, { useState } from 'react';
import { ProductList } from "../features/products/components/ProductList";
import { useCategories } from "../features/products/hooks/useCategories";
import { Button } from '@/shared/components/iu';

export const ProductPage = () => {
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);

  const allCategories = [{
    id: undefined,
    nombre: 'Todos',
    descripcion: 'Mostrar todos los productos'
  }, ...categories];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Nuestro Menú</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        {categoriesLoading && (
          <div className="flex items-center justify-center py-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
            <p className="ml-2 text-gray-600 text-sm">Cargando categorías...</p>
          </div>
        )}
        {categoriesError && (
          <div className="text-center py-2 bg-red-100 text-red-700 rounded-lg px-3 text-sm">
            <p>Error al cargar categorías: {categoriesError}</p>
          </div>
        )}
        {!categoriesLoading && !categoriesError && allCategories.map(category => (
          <Button
            key={category.id || 'all'}
            onClick={() => setSelectedCategoryId(category.id)}
            type="button"
            gradient={selectedCategoryId === category.id}
          >
            {category.nombre}
          </Button>
        ))}
      </div>
      <ProductList selectedCategoryId={selectedCategoryId} />
    </div>
  );
};