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
      $lookup: {
        from: 'users',
        localField: 'owner',
        foreignField: '_id',
        as: 'owner',
      },
    },
    {
      $unwind: '$owner',
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
              _id: 0,
              id: '$_id',
              rating: 1,
              review: 1,
              dish: {
                id: '$dish._id',
                owner: 1,
              },
              owner: {
                id: '$owner._id',
                firstName: 1,
                lastName: 1,
                avatar: 1,
              },
              createdAt: 1,
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
    return Math.round(
      data[0].reviews.reduce((acc, review) => acc + Number(review.rating), 0) /
        data[0].totalReviews
    );
  }

  return 0;
};
