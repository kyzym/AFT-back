import { Review } from '#models/review/Review.model.js';
import mongoose from 'mongoose';

export const getRating = async (chefId) => {
  const data = await Review.aggregate([
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
        'dish.owner': new mongoose.Types.ObjectId(chefId),
      },
    },
    {
      $facet: {
        reviews: [
          {
            $project: {
              rating: 1,
            },
          },
        ],
        totalReviews: [
          {
            $count: 'count',
          },
        ],
        checkEmptyReviews: [
          {
            $match: {
              reviews: { $exists: true, $not: { $size: 0 } },
            },
          },
        ],
      },
    },

    {
      $unwind: '$totalReviews',
    },
    {
      $project: {
        totalReviews: '$totalReviews.count',
        reviews: 1,
      },
    },
  ]).exec();

  if (data.length > 0) {
    return Number(
      (
        data[0].reviews.reduce((acc, review) => acc + review.rating, 0) /
        data[0].totalReviews
      ).toFixed(1)
    );
  }

  return 0;
};
