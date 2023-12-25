import mongoose from 'mongoose';
import { Review } from '#models/review/index.js';

const ObjectId = mongoose.Types.ObjectId;

export const getReviewsByDishId = async (req, res) => {
  const { dishId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const data = await Review.aggregate([
    {
      $match: {
        dish: new ObjectId(dishId),
      },
    },
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
      $facet: {
        reviews: [
          {
            $skip: (page - 1) * limit,
          },
          {
            $limit: parseInt(limit),
          },
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

  if (data && data[0] && data[0].reviews) {
    const responseObject = {
      reviews: data[0].reviews,
      totalReviews: data[0].totalReviews,
    };
    res.status(200).json(responseObject);
  } else {
    res.status(200).json({ reviews: [], totalReviews: 0 });
  }
};
