import { apiClient } from "@/shared/utils/apiClient"; 

interface BackendProduct {
  idproducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imageUrl?: string;
}

export const getProductos = async (categoryId?: string): Promise<BackendProduct[]> => {
  try {
    const data = await apiClient.get<BackendProduct[]>("/api/products", {
      params: { categoryId },
    });
    return data;
  } catch (error: unknown) {
    console.error("Error al obtener productos del backend:", error instanceof Error ? error.message : error);
    return [];
  }
};