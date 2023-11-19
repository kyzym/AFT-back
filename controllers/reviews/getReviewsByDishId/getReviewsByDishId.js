import mongoose from 'mongoose';
import { Review } from '../../../models/review/index.js';

const ObjectId = mongoose.Types.ObjectId;

export const getReviewsByDishId = (app) => {
  app.get('/reviews/by-dish/:dishId', async (req, res, next) => {
    try {
      const { dishId } = req.params;
      const reviews = await Review.aggregate([
        {
          $lookup: {
            from: 'dishes',
            localField: 'dish',
            foreignField: '_id',
            as: 'dish',
          },
        },

        {
          $unwind: '$dish',
        },
        {
          $match: {
            'dish._id': new ObjectId(dishId),
          },
        },
        {
          $project: {
            owner: 1,
            rating: 1,
            review: 1,
            'dish._id': 1,
            'dish.name': 1,
            'dish.chef': 1,
          },
        },
      ]).exec();
      res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  });
};
