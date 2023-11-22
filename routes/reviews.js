import express from 'express';

import { reviewControllers } from '../controllers/index.js';
import { ctrlWrapper, isValidId, joiValidation } from '../middlewares/index.js';
import { addReviewSchema } from '../models/review/review.validation.js';

const router = express.Router();

export const addReview = (router) => {
  router.post(
    '/',
    // add authenticate middleware
    // authenticate,
    joiValidation(addReviewSchema),
    ctrlWrapper(reviewControllers.addReviewSchema)
  );
};

export const deleteReviewById = (router) => {
  router.post(
    '/:reviewId',
    // add authenticate middleware
    // authenticate,
    isValidId('reviewId'),
    ctrlWrapper(reviewControllers.deleteReviewById)
  );
};

export const getAllReviews = (router) => {
  router.get(
    '/',
    // add authenticate middleware
    // authenticate,);
    ctrlWrapper(reviewControllers.getAllReviews)
  );
};

export const updateReviewById = (router) => {
  router.put(
    '/:reviewId',
    // add authenticate middleware
    // authenticate,
    isValidId('reviewId'),
    joiValidation(addReviewSchema),
    ctrlWrapper(reviewControllers.updateReviewById)
  );
};

export const getReviewsByDishId = (router) => {
  router.get(
    '/by-dish/:dishId',
    // add authenticate middleware
    // authenticate,
    isValidId('dishId'),
    ctrlWrapper(reviewControllers.getReviewsByDishId)
  );
};

export const getReviewsByChefId = (router) => {
  router.get(
    '/by-chef/:chefId',
    // add authenticate middleware
    // authenticate,
    isValidId('chefId'),
    ctrlWrapper(reviewControllers.getReviewsByChefId)
  );
};

export default router;
