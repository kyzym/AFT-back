import express from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { verifyToken } from '#middlewares/auth.middleware.js';
import { roles } from '#constants/roles.js';
import { adminControllers } from '#controllers/admin/index.js';

const router = express.Router();

router.get(
  '/allorders',
  verifyToken([roles.ADMIN]),
  ctrlWrapper(adminControllers.getAllOrders)
);
export default router;
