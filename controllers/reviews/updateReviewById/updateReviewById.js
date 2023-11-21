import { NotFoundError } from '../../../helpers/errors.js';
import { ctrlWrapper } from '../../../middlewares/ctrlWrapper.js';
import { isValidId } from '../../../middlewares/isValidId_test_Naumenko.js';
import { Review /*addReviewSchema*/ } from '../../../models/review/index.js';

export const updateReviewByIdController = async (req, res) => {
  const { reviewId } = req.params;
  const result = await Review.findByIdAndUpdate(reviewId, req.body, {
    new: true,
  });

  if (!result) {
    throw new NotFoundError('Review not found');
  }
  res.status(200).json({ message: 'Review updated successfully' });
};

export const updateReviewById = (router) => {
  router.put(
    '/:reviewId',
    // add authenticate middleware
    // authenticate,
    isValidId('reviewId'),
    // validate(addReviewSchema),
    ctrlWrapper(updateReviewByIdController)
  );
};

// We need to check!!!!
//   authenticate,
//   isValidId,
//   validateBody(schemas.addSchema),
