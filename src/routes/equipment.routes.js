import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import * as equipmentController from '../controllers/equipment.controller.js';
import { requireRole } from '../middlewares/require-role.js';
import { createValidation } from '../middlewares/validate-create-equipment.js';


const router = Router();

router.use(authenticate);

router.get('/', equipmentController.list);
router.get('/stats', equipmentController.stats);
router.get('/:id', equipmentController.getById);
router.post('/', requireRole('admin'), createValidation, equipmentController.create)
export default router;