import { NotFoundError } from '../../../helpers/index.js';
import Order from '../../../models/order/Order.model.js';

export const getOrdersStatistic = async (req, res) => {
  const ordersPaymentStatistic = await Order.aggregate([
    {
      $addFields: {
        dateWithoutTime: {
          $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
        },
      },
    },
    {
      $group: {
        _id: '$dateWithoutTime',
        profit: { $sum: '$summaryPrice.tax' },
        statuses: { $addToSet: '$statusCode' },
      },
    },
    {
      $match: {
        statuses: {
          $in: [6],
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        profit: 1,
        orders: 1,
      },
    },
  ]);

  if (!ordersPaymentStatistic || ordersPaymentStatistic.length === 0) {
    throw new NotFoundError('Orders not found');
  }

  res.status(200).json(ordersPaymentStatistic);
};
