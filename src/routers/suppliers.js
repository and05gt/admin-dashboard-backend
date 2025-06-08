import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createSupplierController,
  getSuppliersController,
  upsertSupplierController,
} from '../controllers/suppliers.js';
import { isValidSupplierId } from '../utils/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createSupplierSchema } from '../validation/suppliers.js';

const router = Router();

router.get('/', ctrlWrapper(getSuppliersController));
router.post(
  '/',
  validateBody(createSupplierSchema),
  ctrlWrapper(createSupplierController),
);
router.put(
  '/:supplierId',
  isValidSupplierId,
  validateBody(createSupplierSchema),
  ctrlWrapper(upsertSupplierController),
);

export default router;
