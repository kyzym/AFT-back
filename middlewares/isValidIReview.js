import { isValidObjectId } from 'mongoose';
import { HttpError } from '../helpers/HttpError.js';

export const isValidReviewId = (req, res, next) => {
  const { reviewId } = req.params;
  if (!isValidObjectId(reviewId)) {
    next(HttpError(400, `${reviewId} - is not valid id`));
  }
  next();
};
