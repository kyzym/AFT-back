import { HttpError } from '../../../helpers/HttpError.js';
import { validateBody } from '../../../middlewares/validateBody.js';
import Review from '../../../models/review/Review.model.js';
import addReviewSchema from '../../../models/review/review.validation.js';

export const updateReviewById = async (app) => {
  app.put(
    '/reviews/:reviewId',
    validateBody(addReviewSchema),
    async (req, res, next) => {
      try {
        const { reviewId } = req.params;
        const result = await Review.findByIdAndUpdate(reviewId, req.body, {
          new: true,
        });
        if (!result) {
          throw HttpError(404, 'Not found');
        }
        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    }
  );
};
