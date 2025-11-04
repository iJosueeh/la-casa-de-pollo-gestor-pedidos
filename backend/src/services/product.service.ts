import { Product } from '@backendTypes/product.types';
import { productRepository } from '@repositories/product.repository';

export const productService = {
  async listAllProducts(categoryId?: string): Promise<Product[]> {
    const products = await productRepository.getAll(categoryId);
    return products;
  },

  async getProductDetails(id: string): Promise<Product | null> {
    const product = await productRepository.getById(id);
    return product;
  },

};