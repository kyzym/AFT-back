import { sseNotifications } from '#controllers/notifications/index.js';
import express from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { sseAuth } from '#middlewares/sseAuth.js';
import { roles } from '#constants/roles.js';

const router = express.Router();

router.get(
  '/',
  sseAuth([roles.CHEF, roles.COURIER, roles.USER]),
  ctrlWrapper(sseNotifications)
);

export default router;
