import { Router } from 'express';

import { rocketController } from '../controllers';

export const router: Router = Router();

router.get('/list', rocketController.getAllSortedRockets);
router.get('/:rocketName', rocketController.getRocketByName);
router.post('/add', rocketController.addNewRocket);
