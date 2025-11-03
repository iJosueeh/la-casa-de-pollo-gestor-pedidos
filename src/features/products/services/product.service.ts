import type { Product } from "@/features/products/types/product.types";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:4000";

export const getProductos = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Product[] = await response.json();
    return data;
  } catch (error: unknown) {
    console.error("Error al obtener productos del backend:", error instanceof Error ? error.message : error);
    return [];
  }
};