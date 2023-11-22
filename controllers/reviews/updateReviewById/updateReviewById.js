import { NotFoundError } from '../../../helpers/errors.js';
import { Review } from '../../../models/review/index.js';

export const updateReviewById = async (req, res) => {
  const { reviewId } = req.params;
  const result = await Review.findByIdAndUpdate(reviewId, req.body, {
    new: true,
  });

  if (!result) {
    throw new NotFoundError('Review not found');
  }
  res.status(200).json({ message: 'Review updated successfully' });
};
