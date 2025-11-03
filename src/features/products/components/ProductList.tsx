import React from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from '@/features/products/types/product.types';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const ProductList: React.FC<ProductListProps> = ({ products, loading, error }) => {
  if (loading) {
    return <div className="text-center text-lg">Cargando productos...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div className="text-center text-lg">No hay productos disponibles.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
