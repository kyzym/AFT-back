import mongoose from 'mongoose';
import Review from '../../../models/review/Review.model.js';

const ObjectId = mongoose.Types.ObjectId;

export const getReviewsByChefId = (app) => {
  app.get(
    '/reviews/by-chef/:chefId',

    async (req, res, next) => {
      const { chefId } = req.params;

      try {
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
              'dish.chef': new ObjectId(chefId),
            },
          },
          // Можна додати пагінацію
          // {
          //   $skip: 0,
          // },
          // {
          //   $limit: 2,
          // },
          // {
          //   $project: {
          //     rating: 1, // включити поле "rating"
          //     review: 1, // включити поле "review"
          //     "dish.name": 1, // включити поле "name" з вкладеного об'єкта "dish"
          //     "dish.chef": 1, // включити поле "name" з вкладеного об'єкта "dish"
          //   },
          // },
        ]).exec();

        res.status(200).json(reviews);
      } catch (error) {
        next(error);
      }
    }
  );
};
