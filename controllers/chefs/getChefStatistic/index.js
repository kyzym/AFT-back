import mongoose from 'mongoose';
import Order from '../../../models/order/Order.model.js';

export const getChefStatistic = async (req, res) => {
  const { chefId } = req.params;
  const id = new mongoose.Types.ObjectId(chefId);
  const ordersChefStatistic = await Order.aggregate([
    {
      $match: { chefId: id },
    },
    {
      $addFields: {
        dateWithoutTime: {
          $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
        },
      },
    },
    {
      $match: {
        statusCode: 6,
      },
    },
    {
      $group: {
        _id: { date: '$dateWithoutTime', chefId: '$chefId' },
        profit: { $sum: '$summaryPrice.chef' },
      },
    },
    {
      $project: {
        _id: 0,
        date: '$_id.date',
        profit: 1,
      },
    },
    {
      $sort: { date: 1 },
    },
  ]);

  res.status(200).json(ordersChefStatistic);
};
