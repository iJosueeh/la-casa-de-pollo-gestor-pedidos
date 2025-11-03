import React from 'react';
import { ProductList } from "../features/products/components/ProductList";
import { useProducts } from "../features/products/hooks/useProducts";



// Trivial change to force rebuild
export const ProductPage = () => {
  const { products, loading, error } = useProducts();

  return (
    <div>
      <ProductList products={products} loading={loading} error={error} />
    </div>
  );
};
