import { Router, Request, Response } from 'express';
import { StatusController } from '../controllers/index.js';

const router: Router = Router();

router.get('/status', StatusController.index);

export { router };
