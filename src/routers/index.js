import { Router } from 'express';
import authRouter from './auth.js';
import dashboardRouter from './dashboard.js';
import productsRouter from './products.js';
import ordersRouter from './orders.js';
import suppliersRouter from './suppliers.js';
import customersRouter from './customers.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use('/api/user', authRouter);
router.use('/api/dashboard', authenticate, dashboardRouter);
router.use('/api/orders', authenticate, ordersRouter);
router.use('/api/products', authenticate, productsRouter);
router.use('/api/suppliers', authenticate, suppliersRouter);
router.use('/api/customers', authenticate, customersRouter);

export default router;
