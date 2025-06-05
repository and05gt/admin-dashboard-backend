import { Router } from 'express';
import {
  createProductController,
  deleteProductController,
  getProductsController,
  upsertProductController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../utils/isValidId.js';

const router = Router();

router.get('/api/products', ctrlWrapper(getProductsController));
router.post('/api/products', ctrlWrapper(createProductController));
router.put(
  '/api/products/:productId',
  isValidId,
  ctrlWrapper(upsertProductController),
);
router.delete(
  '/api/products/:productId',
  isValidId,
  ctrlWrapper(deleteProductController),
);

export default router;
