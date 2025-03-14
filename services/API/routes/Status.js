import { Router } from 'express';
import { StatusController } from '../controllers/index.js';
const router = Router();
router.get('/status', StatusController.index);
export { router };
