import { useEffect, useState } from "react";
import { getProductos } from "@/features/products/services/product.service";
import type { Product } from "@/features/products/types/product.types";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProductos();
        const mappedProducts: Product[] = data.map((item: any) => ({
          id: item.idproducto.toString(),
          name: item.nombre,
          description: item.descripcion,
          price: item.precio,
          stock: item.stock,
          image: item.imagen || undefined,
        }));
        setProducts(mappedProducts);
      } catch (err) {
        setError("Failed to fetch products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
