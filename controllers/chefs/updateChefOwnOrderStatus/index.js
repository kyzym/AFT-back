import { orderStatuses } from '#constants/orderStatus.js';
import { createOrderStatusNotificationForUser } from '#controllers/notifications/services/createOrderStatusNotificationForUser.js';
import {
  ForbiddenError,
  NotFoundError,
  getOrderCodeByValue,
} from '../../../helpers/index.js';
import Order from '../../../models/order/Order.model.js';

export const updateChefOwnOrderStatus = async (req, res) => {
  const chefId = req.roleIds.chef;
  const { orderId } = req.params;
  const { status: updateStatus } = req.body;

  // TODO: Change status code
  // if (!orderStatus[updateStatus.toUpperCase()]) {
  //   throw new ForbiddenError('Invalid order status');
  // }
  if (!orderStatuses.includes(updateStatus)) {
    throw new ForbiddenError('Invalid order status');
  }

  const order = await Order.findById(orderId);

  if (!order) {
    throw new NotFoundError('Order not found');
  } else if (order.chefId.toString() !== chefId.toString()) {
    throw new ForbiddenError('Access denied: Chef IDs do not match');
  }

  // TODO: Change status code
  // const newChefOrderStatus = await Order.findByIdAndUpdate(
  //   orderId,
  //   { status: updateStatus },
  //   { new: true }
  // );
  const newChefOrderStatus = await Order.findByIdAndUpdate(
    orderId,
    { statusCode: getOrderCodeByValue(updateStatus) },
    { new: true }
  );

  if (newChefOrderStatus) {
    await createOrderStatusNotificationForUser(
      orderId,
      order.userId,
      updateStatus
    );
  }

  res.status(200).json(newChefOrderStatus);
};
