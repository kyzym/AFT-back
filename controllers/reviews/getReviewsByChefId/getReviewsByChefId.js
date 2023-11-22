import mongoose from 'mongoose';
import { Review } from '../../../models/review/index.js';

const ObjectId = mongoose.Types.ObjectId;

export const getReviewsByChefId = async (req, res) => {
  const { chefId } = req.params;

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
      $project: {
        rating: 1,
        review: 1,
        dish: 1,
      },
    },
    {
      $unwind: '$dish',
    },
    {
      $match: {
        'dish.owner': new ObjectId(chefId),
      },
    },
    {
      $project: {
        _id: 0,
        id: '$_id',
        rating: 1,
        review: 1,
        dish: {
          chef: 1,
          id: '$dish._id',
        },
      },
    },
  ]).exec();

  res.status(200).json(reviews);
};
