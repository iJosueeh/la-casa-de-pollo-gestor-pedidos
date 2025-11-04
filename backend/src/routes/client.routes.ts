import { Router } from 'express';
import { clientController } from '@controllers/client.controller';

const router = Router();

router.post('', clientController.createClient);

export default router;
