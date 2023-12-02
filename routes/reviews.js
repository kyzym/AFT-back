import express from 'express';

import { reviewControllers } from '../controllers/index.js';
import { ctrlWrapper, isValidId, validate } from '../middlewares/index.js';
import { addReviewSchema } from '../models/review/review.validation.js';

const router = express.Router();

router.post(
  '/',
  // add authenticate middleware
  // authenticate,
  validate(addReviewSchema),
  ctrlWrapper(reviewControllers.addReview)
);

router.delete(
  '/:reviewId',
  // add authenticate middleware
  // authenticate,
  isValidId('reviewId'),
  ctrlWrapper(reviewControllers.deleteReviewById)
);

router.get(
  '/',
  // add authenticate middleware
  // authenticate,);
  ctrlWrapper(reviewControllers.getAllReviews)
);

router.put(
  '/:reviewId',
  // add authenticate middleware
  // authenticate,
  isValidId('reviewId'),
  validate(addReviewSchema),
  ctrlWrapper(reviewControllers.updateReviewById)
);

router.get(
  '/by-dish/:dishId',
  // add authenticate middleware
  // authenticate,
  isValidId('dishId'),
  ctrlWrapper(reviewControllers.getReviewsByDishId)
);

router.get(
  '/by-chef/:chefId',
  // add authenticate middleware
  // authenticate,
  isValidId('chefId'),
  ctrlWrapper(reviewControllers.getReviewsByChefId)
);

export default router;
