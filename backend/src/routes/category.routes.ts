import { Router } from 'express';
import { categoryController } from '@controllers/category.controller';

const router = Router();

router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);

export default router;