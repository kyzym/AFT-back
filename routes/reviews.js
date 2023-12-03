import express from 'express';

import { reviewControllers } from '../controllers/index.js';
import {
  ctrlWrapper,
  isValidId,
  validate,
  verifyToken,
} from '../middlewares/index.js';
import { addReviewSchema } from '../models/review/review.validation.js';
import { roles } from '#constants/roles.js';

const router = express.Router();

router.post(
  '/',
  verifyToken([roles.USER]),
  validate(addReviewSchema),
  ctrlWrapper(reviewControllers.addReview)
);

router.delete(
  '/:reviewId',
  verifyToken([roles.USER]),
  isValidId('reviewId'),
  ctrlWrapper(reviewControllers.deleteReviewById)
);

router.get(
  '/',
  verifyToken([roles.ADMIN]),
  ctrlWrapper(reviewControllers.getAllReviews)
);

router.put(
  '/:reviewId',
  verifyToken([roles.USER]),
  isValidId('reviewId'),
  validate(addReviewSchema),
  ctrlWrapper(reviewControllers.updateReviewById)
);

router.get(
  '/by-dish/:dishId',
  verifyToken([roles.USER]),
  isValidId('dishId'),
  ctrlWrapper(reviewControllers.getReviewsByDishId)
);

router.get(
  '/by-chef/:chefId',
  verifyToken([roles.USER]),
  isValidId('chefId'),
  ctrlWrapper(reviewControllers.getReviewsByChefId)
);

export default router;
