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

const router = Router();

router.get('/', ctrlWrapper(getProductsController));
router.post(
  '/',
  validateBody(createProductSchema),
  ctrlWrapper(createProductController),
);
router.put(
  '/:productId',
  isValidProductId,
  validateBody(createProductSchema),
  ctrlWrapper(upsertProductController),
);
router.delete(
  '/:productId',
  isValidProductId,
  ctrlWrapper(deleteProductController),
);

export default router;
