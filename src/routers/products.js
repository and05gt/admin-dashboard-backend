import { Router } from 'express';
import {
  createProductController,
  deleteProductController,
  getProductsController,
  upsertProductController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidProductId } from '../utils/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createProductSchema } from '../validation/products.js';
import { checkRole } from '../middlewares/checkRole.js';

const router = Router();

router.get('/', checkRole, ctrlWrapper(getProductsController));
router.post(
  '/',
  checkRole,
  validateBody(createProductSchema),
  ctrlWrapper(createProductController),
);
router.put(
  '/:productId',
  checkRole,
  isValidProductId,
  validateBody(createProductSchema),
  ctrlWrapper(upsertProductController),
);
router.delete(
  '/:productId',
  checkRole,
  isValidProductId,
  ctrlWrapper(deleteProductController),
);

export default router;
