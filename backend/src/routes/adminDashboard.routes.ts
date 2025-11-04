import { Router } from 'express';
import { adminDashboardController } from '@controllers/adminDashboard.controller';

const router = Router();

router.get('/most-sold', adminDashboardController.getMostSoldProducts);
router.get('/weekly-summary', adminDashboardController.getWeeklySalesSummary);
router.get('/summary', adminDashboardController.getDashboardSummary);

export default router;
