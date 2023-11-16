import { Review } from '../../../models/review.js';

export const getReviewsByDishId = (app) => {
  app.get('/reviews/by-dish/:dishId', async (req, res, next) => {
    try {
      const { dishId } = req.params;
      const data = await Review.find()
        .populate({
          path: 'dish',
          match: { dish: dishId },
        })
        .exec();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });
};
