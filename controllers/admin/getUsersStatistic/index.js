import User from '#models/user/userModel.js';
import { NotFoundError } from '#helpers/index.js';

export const getUsersStatistic = async (req, res) => {
  const usersStatistic = await User.aggregate([
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
        usersCount: {
          $sum: { $cond: [{ $in: ['user', '$roles.name'] }, 1, 0] },
        },
        chefsCount: {
          $sum: { $cond: [{ $in: ['chef', '$roles.name'] }, 1, 0] },
        },
        couriersCount: {
          $sum: { $cond: [{ $in: ['courier', '$roles.name'] }, 1, 0] },
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
        usersCount: 1,
        chefsCount: 1,
        couriersCount: 1,
      },
    },
  ]);

  if (!usersStatistic || usersStatistic.length === 0) {
    throw new NotFoundError('Orders not found');
  }

  res.status(200).json(usersStatistic);
};
