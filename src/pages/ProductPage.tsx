import React from "react";
import { ProductList } from "../shared/components/ProductList";

// Trivial change to force rebuild
export const ProductPage = () => {
  return (
    <div>
      <ProductList />
    </div>
  );
};
