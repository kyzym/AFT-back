import { NotFoundError } from '../../../helpers/errors.js';
import { Review } from '../../../models/review/index.js';

export const deleteReviewById = async (req, res) => {
  const { reviewId } = req.params;
  const result = await Review.findByIdAndDelete(reviewId).exec();

  if (!result) {
    throw new NotFoundError('NotFound');
  }
  res.status(204).send();
};
