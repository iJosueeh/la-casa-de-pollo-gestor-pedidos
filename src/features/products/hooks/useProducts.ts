import { useEffect, useState } from "react";
import { getProductos } from "@/features/products/services/product.service";
import type { Product } from "@/features/products/types/product.types";

const PLACEHOLDER_IMAGE_URL = "https://buenazo.cronosmedia.glr.pe/original/2020/08/30/5f4c2be6cce5112a0674ccc8.jpg";

export const useProducts = (selectedCategoryId?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsFetching(true);
      if (products.length === 0) {
        setLoading(true);
      }

      try {
        const data = await getProductos(selectedCategoryId);
        const mappedProducts = data.map((item) => ({
          id: item.idproducto.toString(),
          name: item.nombre,
          description: item.descripcion,
          price: item.precio,
          stock: item.stock,
          imageUrl: item.imageUrl || PLACEHOLDER_IMAGE_URL,
        }));
        setProducts(mappedProducts);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products.");
        console.error(err);
        setProducts([]);
      } finally {
        setIsFetching(false);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategoryId, products.length]);

  return { products, loading: loading || isFetching, error };
};
