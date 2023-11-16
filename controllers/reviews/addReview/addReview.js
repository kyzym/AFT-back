import { HttpError } from '../../../helpers/HttpError.js';
import { validateBody } from '../../../middlewares/validateBody.js';
import Review from '../../../models/review/Review.model.js';
import addReviewSchema from '../../../models/review/review.validation.js';

// import { authenticate } from '../../../;
// import { validateBody } from '../../../middlewares/validateBody.js';

export const addReview = (app) => {
  return app.post(
    '/reviews',
    // add authenticate middleware
    // authenticate,
    validateBody(addReviewSchema),
    async (req, res, next) => {
      try {
        const { _id: owner } = req.user;

        const data = {
          ...req.body,
          owner,
        };

        const review = await Review.create(data);
        if (!review) {
          throw HttpError(404, 'Not found');
        }
        res.status(201).json(review);
      } catch (error) {
        next(error);
      }
    }
  );
};
