import { ctrlWrapper } from '../../../helpers/ctrlWrapper.js';
import { Review } from '../../../models/review.js';

export const getReviewsByDishId = (app) => {
  app.get(
    '/api/reviews/by-dish/:dishId',

    ctrlWrapper(async (req, res) => {
      const { dishId } = req.params;
      const data = await Review.find()
        .populate({
          path: 'dish',
          match: { dish: dishId },
        })
        .exec();
      res.status(200).json({ data });
    })
  );
};
