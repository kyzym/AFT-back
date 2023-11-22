import mongoose from 'mongoose';
import { Review } from '../../../models/review/index.js';

const ObjectId = mongoose.Types.ObjectId;

export const getReviewsByDishId = async (req, res) => {
  const { dishId } = req.params;
  const reviews = await Review.aggregate([
    {
      $match: {
        dish: new ObjectId(dishId),
      },
    },
    {
      $project: {
        _id: 0,
        id: '$_id',
        owner: 1,
        rating: 1,
        review: 1,
        dish: 1,
      },
    },
  ]).exec();
  res.status(200).json(reviews);
};
