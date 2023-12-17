import { sseNotifications } from '#controllers/notifications/index.js';
import express from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { verifyToken } from '#middlewares/auth.middleware.js';
import { roles } from '#constants/roles.js';

const router = express.Router();

router.get(
  '/',
  verifyToken([roles.CHEF, roles.COURIER, roles.USER]),
  ctrlWrapper(sseNotifications)
);

export default router;
