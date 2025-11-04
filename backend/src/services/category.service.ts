import { Category } from '@backendTypes/category.types';
import { categoryRepository } from '@repositories/category.repository';

export const categoryService = {
  async listAllCategories(): Promise<Category[]> {
    return await categoryRepository.getAll();
  },

  async getCategoryDetails(id: string): Promise<Category | null> {
    return await categoryRepository.getById(id);
  },
};