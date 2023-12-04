import { getPresignedDeleteUrl } from '#controllers/files/getPresignedDeleteUrl/index.js';
import { getPresignedUrl } from '#controllers/files/getPresignedUrl/index.js';
import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';
import express from 'express';

const router = express.Router();

router.get('/s3-presigned-url', ctrlWrapper(getPresignedUrl));

router.get('/s3-presigned-delete-url', ctrlWrapper(getPresignedDeleteUrl));

export default router;
