import { Router } from 'express';
import authRouter from './auth.js';
// import dashboardRouter from './dashboard.js';
import productsRouter from './products.js';
import ordersRouter from './orders.js';
import suppliersRouter from './suppliers.js';
import customersRouter from './customers.js';

const router = Router();

router.use('/api/user', authRouter);
// router.use('/api/dashboard', dashboardRouter);
router.use('/api/orders', ordersRouter);
router.use('/api/products', productsRouter);
router.use('/api/suppliers', suppliersRouter);
router.use('/api/customers', customersRouter);

export default router;
