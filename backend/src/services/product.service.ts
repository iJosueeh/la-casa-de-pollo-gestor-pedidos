import { Product } from '@backendTypes/product.types';
import { productRepository } from '@repositories/product.repository';

export const productService = {
  async listAllProducts(): Promise<Product[]> {
    const products = await productRepository.getAll();
    return products;
  },

  async getProductDetails(id: string): Promise<Product | null> {
    const product = await productRepository.getById(id);
    return product;
  },

};