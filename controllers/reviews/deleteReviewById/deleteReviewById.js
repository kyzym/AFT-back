import { HttpError } from '../../../helpers/HttpError.js';
import { isValidId } from '../../../middlewares/isValidId.js';
import { Review } from '../../../models/review/index.js';

export const deleteReviewById = async (app) => {
  app.delete(
    '/reviews/:reviewId',
    // add authenticate middleware
    // authenticate,

    isValidId,
    async (req, res, next) => {
      try {
        const { reviewId } = req.params;
        const result = await Review.findByIdAndDelete(reviewId).exec();

        if (!result) {
          throw HttpError(404, 'NotFound');
        }
        res.json({ message: 'Delete success' });
      } catch (error) {
        next(error);
      }
    }
  );
};
