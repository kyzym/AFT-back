import mongoose from 'mongoose';
import Order from '../../../models/order/Order.model.js';

export const getCourierStatistic = async (req, res) => {
  const { courierId } = req.params;

  const id = new mongoose.Types.ObjectId(courierId);
  const ordersCourierStatistic = await Order.aggregate([
    {
      $match: { courierId: id },
    },
    {
      $addFields: {
        dateWithoutTime: {
          // $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' },
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
        _id: { date: '$dateWithoutTime', courierId: '$courierId' },
        profit: { $sum: '$summaryPrice.delivery' },
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
  res.status(200).json(ordersCourierStatistic);
};
