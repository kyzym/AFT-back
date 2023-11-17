import { HttpError } from '../../../helpers/HttpError.js';
import { validateBody } from '../../../middlewares/validateBody.js';
import { Review, addReviewSchema } from '../../../models/review/index.js';

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
        console.log('result:', result);
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
