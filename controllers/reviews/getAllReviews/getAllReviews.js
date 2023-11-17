import { Review } from '../../../models/review/index.js';

export const getAllReviews = async (app) => {
  app.get('/reviews', async (req, res, next) => {
    try {
      const reviews = await Review.find().populate('owner', 'name _id').exec();
      res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  });
};
