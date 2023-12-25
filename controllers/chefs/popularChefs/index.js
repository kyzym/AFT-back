import { getRating } from '#helpers/getRating.js';
import { NotFoundError } from '#helpers/index.js';
import Order from '#models/order/Order.model.js';

export const getPopularChefs = async (req, res) => {
  const popularChefs = await Order.aggregate([
    {
      $group: {
        _id: '$chefId',
        totalOrders: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        chefId: '$_id',
        totalOrders: 1,
      },
    },
    {
      $sort: { totalOrders: -1 },
    },
    {
      $limit: 10,
    },
    {
      $lookup: {
        from: 'chefs',
        localField: 'chefId',
        foreignField: '_id',
        as: 'chefInfo',
      },
    },
    {
      $unwind: '$chefInfo',
    },
    {
      $lookup: {
        from: 'users',
        localField: 'chefInfo.userId',
        foreignField: '_id',
        as: 'chefInfo.user',
      },
    },
    {
      $project: {
        chefId: 1,
        totalOrders: 1,
        'chefInfo.user.firstName': 1,
        'chefInfo.user.lastName': 1,
        'chefInfo.avatar': 1,
      },
    },
  ]);
  const promises = popularChefs.map((chef) => getRating(chef.chefId));
  const ratings = await Promise.all(promises);

  popularChefs.map((chef, index) => {
    chef.chefInfo.rating = ratings[index];
    return chef;
  });

  if (!popularChefs || popularChefs.length === 0) {
    throw new NotFoundError('Popular chefs not found');
  }

  res.status(200).json(popularChefs);
};
