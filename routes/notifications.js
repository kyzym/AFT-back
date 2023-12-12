import { roles } from '#constants/roles.js';
import {
  deleteNotification,
  findUnreadNotification,
  updateNotifications,
} from '#controllers/notifications/index.js';
import { verifyToken } from '#middlewares/auth.middleware.js';
import express from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';

const router = express.Router();

router.get(
  '/',
  verifyToken([roles.USER, roles.CHEF, roles.COURIER]),
  ctrlWrapper(findUnreadNotification)
);

router.patch(
  '/:id/read',
  verifyToken([roles.USER, roles.CHEF, roles.COURIER]),
  ctrlWrapper(updateNotifications)
);

router.patch(
  '/:id',
  verifyToken([roles.USER, roles.CHEF, roles.COURIER]),
  ctrlWrapper(deleteNotification)
);

export default router;
