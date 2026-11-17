import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import * as loanController from '../controllers/loan.controller.js';

const router = Router();

router.use(authenticate);

router.get('/returned', loanController.getReturnedLoans);

export default router;
