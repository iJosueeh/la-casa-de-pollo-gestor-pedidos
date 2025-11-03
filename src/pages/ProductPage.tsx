import React from 'react';
import { ProductList } from "../features/products/components/ProductList";
import { useProducts } from "../features/products/hooks/useProducts";

export const ProductPage = () => {
  const { products, loading, error } = useProducts();

  return (
    <div>
      <ProductList products={products} loading={loading} error={error} />
    </div>
  );
};
