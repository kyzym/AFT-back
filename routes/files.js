import { roles } from '#constants/roles.js';
import { getPresignedDeleteUrl } from '#controllers/files/getPresignedDeleteUrl/index.js';
import { getPresignedUrl } from '#controllers/files/getPresignedUrl/index.js';
import { verifyToken } from '#middlewares/auth.middleware.js';
import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';
import express from 'express';

const router = express.Router();

router.get(
  '/s3-presigned-url',
  verifyToken([roles.CHEF, roles.COURIER, roles.USER, roles.ADMIN]),
  ctrlWrapper(getPresignedUrl)
);

router.get(
  '/s3-presigned-delete-url',
  verifyToken([roles.CHEF, roles.COURIER, roles.USER, roles.ADMIN]),
  ctrlWrapper(getPresignedDeleteUrl)
);

export default router;
