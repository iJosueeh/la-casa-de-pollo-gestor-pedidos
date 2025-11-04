import { Request, Response } from 'express';
import { productService } from '@services/product.service';

export const productController = {
  async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const categoryId = req.query.categoryId as string | undefined;
      const products = await productService.listAllProducts(categoryId);
      res.json(products);
    } catch (error: unknown) {
      console.error('Error en productController.getProducts:', error instanceof Error ? error.message : error);
      res.status(500).json({ error: 'Error interno del servidor al obtener productos' });
    }
  },

  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await productService.getProductDetails(id);
      if (!product) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }
      res.json(product);
    } catch (error: unknown) {
      console.error('Error en productController.getProductById:', error instanceof Error ? error.message : error);
      res.status(500).json({ error: 'Error interno del servidor al obtener el producto' });
    }
  },

};