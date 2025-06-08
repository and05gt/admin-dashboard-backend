import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getCurrentUserController,
  loginUserController,
  logoutUserController,
} from '../controllers/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema } from '../validation/auth.js';

const router = Router();

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);
router.get('/logout', ctrlWrapper(logoutUserController));
router.get('/user-info', ctrlWrapper(getCurrentUserController));

export default router;
