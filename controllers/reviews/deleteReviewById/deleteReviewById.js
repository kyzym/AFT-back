import { HttpError } from '../../../helpers/HttpError.js';
import Review from '../../../models/review/Review.model.js';

export const deleteReviewById = async (app) => {
  app.delete(
    '/api/reviews/:reviewId',
    // add authenticate middleware
    // authenticate,

    // add Validate Id middleware
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
