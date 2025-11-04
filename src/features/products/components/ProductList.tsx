import React from 'react';
import { ProductCard } from './ProductCard';
import { useProducts } from "../hooks/useProducts";

interface ProductListProps {
  selectedCategoryId?: string;
}

export const ProductList: React.FC<ProductListProps> = ({ selectedCategoryId }) => {
  const { products, loading, error } = useProducts(selectedCategoryId);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p className="ml-3 text-gray-600 text-lg">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 bg-red-100 text-red-700 rounded-lg px-4 text-lg">
        <p>Error al cargar productos: {error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return <div className="text-center text-lg">No hay productos disponibles.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};