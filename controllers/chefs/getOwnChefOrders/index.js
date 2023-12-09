import { orderStatus } from '#constants/orderStatus.js';
import { NotFoundError, getOrderCodeByValue } from '../../../helpers/index.js';
import Order from '../../../models/order/Order.model.js';

export const getOwnChefOrders = async (req, res) => {
  const chefId = req.roleIds.chef;

  // TODO: Change status code
  // const chefOrders = await Order.find({
  //   chefId,
  //   status: { $ne: 'new' },
  // }).populate({
  //   path: 'items.dishId',
  //   select: 'name',
  // });
  const chefOrders = await Order.find({
    chefId,
    statusCode: { $ne: getOrderCodeByValue(orderStatus.NEW) },
  }).populate({
    path: 'items.dishId',
    select: 'name',
  });

  if (!chefOrders) {
    throw new NotFoundError('Orders for chef not found');
  }

  res.status(200).json(chefOrders);
};
