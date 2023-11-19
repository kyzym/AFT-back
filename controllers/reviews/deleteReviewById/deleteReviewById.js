import { HttpError } from '../../../helpers/HttpError.js';
import { isValidReviewId } from '../../../middlewares/isValidIReview.js';

import { Review } from '../../../models/review/index.js';

export const deleteReviewById = async (app) => {
  app.delete(
    '/reviews/:reviewId',
    // add authenticate middleware
    // authenticate,

    isValidReviewId,
    async (req, res, next) => {
      try {
        const { reviewId } = req.params;
        const result = await Review.findByIdAndDelete(reviewId).exec();
        console.log('result:', result);

        if (!result) {
          throw HttpError(404, 'NotFound');
        }
        res.status(204);
      } catch (error) {
        next(error);
      }
    }
  );
};
