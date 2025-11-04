import { Request, Response } from 'express';
import { categoryService } from '@services/category.service';

export const categoryController = {
  async getCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await categoryService.listAllCategories();
      res.json(categories);
    } catch (error: unknown) {
      console.error('Error in categoryController.getCategories:', error instanceof Error ? error.message : error);
      res.status(500).json({ error: 'Error interno del servidor al obtener categorías' });
    }
  },

  async getCategoryById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const category = await categoryService.getCategoryDetails(id);
      if (!category) {
        res.status(404).json({ error: 'Categoría no encontrada' });
        return;
      }
      res.json(category);
    } catch (error: unknown) {
      console.error('Error in categoryController.getCategoryById:', error instanceof Error ? error.message : error);
      res.status(500).json({ error: 'Error interno del servidor al obtener la categoría' });
    }
  },
};