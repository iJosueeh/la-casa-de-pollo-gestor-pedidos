import type { Category } from "../types/category.types";
import { apiClient } from "@/shared/utils/apiClient";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const data = await apiClient.get<Category[]>("/api/categories");
    return data;
  } catch (error: unknown) {
    console.error("Error al obtener categorías del backend:", error instanceof Error ? error.message : error);
    return [];
  }
};