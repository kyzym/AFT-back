import { Review } from '../../../models/review/index.js';

export const getReviewById = async (app) => {
  app.get('/reviews/:reviewId', async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const review = await Review.findById(reviewId).exec();
      res.status(200).json({ data: review });
    } catch (error) {
      next(error);
    }
  });
};
