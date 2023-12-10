import { NotFoundError } from '../../../helpers/index.js';
import Order from '../../../models/order/Order.model.js';

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
  ]);

  if (!popularChefs || popularChefs.length === 0) {
    throw new NotFoundError('Popular chefs not found');
  }

  res.status(200).json(popularChefs);
};
