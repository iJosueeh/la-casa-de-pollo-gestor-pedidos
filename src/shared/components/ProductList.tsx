import React from "react";
import { useProducts } from "@/features/products/hooks";
import { ProductCard } from "@/features/products/components";

export const ProductList: React.FC = () => {
  const { products, loading, error } = useProducts();

  console.log('Products:', products, 'Loading:', loading, 'Error:', error);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (products.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};