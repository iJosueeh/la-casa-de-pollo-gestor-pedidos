import { Router } from 'express';
import { orderController } from '@controllers/order.controller';

const router = Router();

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders); // New route to fetch all orders

export default router;
