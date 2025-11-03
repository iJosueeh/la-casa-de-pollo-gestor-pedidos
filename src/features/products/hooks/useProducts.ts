import { useEffect, useState } from "react";
import { getProductos } from "@/features/products/services/product.service";
import type { Product } from "@/features/products/types/product.types";

const PLACEHOLDER_IMAGE_URL = "https://w7.pngwing.com/pngs/307/581/png-transparent-roast-chicken-barbecue-chicken-chicken-leg-computer-icons-chicken-leg-food-animals-hat.png";

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
          image: item.imagen || PLACEHOLDER_IMAGE_URL, 
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
