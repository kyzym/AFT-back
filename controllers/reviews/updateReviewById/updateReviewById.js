import { NotFoundError, ForbiddenError } from '../../../helpers/errors.js';
import { Review } from '../../../models/review/index.js';
import mongoose from 'mongoose';

export const updateReviewById = async (req, res) => {
  const { reviewId } = req.params;
  const { user: owner } = req.roleIds;

  const review = await Review.findById(reviewId).exec();

  if (!review) {
    throw new NotFoundError('NotFound');
  }

  const ownerId = new mongoose.Types.ObjectId(owner);

  if (!review.owner.equals(ownerId)) {
    throw new ForbiddenError('Access Denied');
  }

  const result = await Review.findByIdAndUpdate(reviewId, req.body, {
    new: true,
  });

  if (!result) {
    throw new NotFoundError('Review not found');
  }
  res.status(200).json({ message: 'Review updated successfully' });
};
