import { NotFoundError } from '../../../helpers/errors.js';
import { ctrlWrapper } from '../../../middlewares/ctrlWrapper.js';
import { isValidId } from '../../../middlewares/isValidId_test_Naumenko.js';

import { Review } from '../../../models/review/index.js';

const deleteReviewByIdController = async (req, res) => {
  const { reviewId } = req.params;
  const result = await Review.findByIdAndDelete(reviewId).exec();

  if (!result) {
    throw new NotFoundError('NotFound');
  }
  res.status(204).send();
};

export const deleteReviewById = (router) => {
  router.post(
    '/:reviewId',
    // add authenticate middleware
    // authenticate,
    isValidId('reviewId'),
    ctrlWrapper(deleteReviewByIdController)
  );
};
