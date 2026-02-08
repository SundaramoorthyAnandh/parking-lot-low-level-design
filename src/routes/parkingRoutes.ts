import { Router } from 'express';
import { ParkingController } from '../controllers/ParkingController';

const router = Router();

router.post('/entry', ParkingController.entry);
router.post('/exit', ParkingController.exit);

export default router;
