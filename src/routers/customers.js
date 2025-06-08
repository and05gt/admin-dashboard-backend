import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getCustomerByIdController,
  getCustomersController,
} from '../controllers/customers.js';
import { isValidCustomerId } from '../utils/isValidId.js';

const router = Router();

router.get('/', ctrlWrapper(getCustomersController));
router.get(
  '/:customerId',
  isValidCustomerId,
  ctrlWrapper(getCustomerByIdController),
);

export default router;
