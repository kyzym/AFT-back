import { HttpError } from '../../../helpers/HttpError.js';
import { ctrlWrapper } from '../../../helpers/ctrlWrapper.js';
import { validateBody } from '../../../middlewares/validateBody.js';
import { Review } from '../../../models/review.js';
import addReviewSchema from '../../../schemas/addReviewSchema.js';

export const updateReviewById = async (app) => {
  app.put(
    '/api/reviews/:reviewId',
    validateBody(addReviewSchema),
    ctrlWrapper(async (req, res) => {
      const { reviewId } = req.params;
      const result = await Review.findByIdAndUpdate(reviewId, req.body, {
        new: true,
      });
      if (!result) {
        throw HttpError(404, 'Not found');
      }
      res.status(200).json({
        status: 'success',
        code: 200,
        data: result,
      });
    })
  );
};
