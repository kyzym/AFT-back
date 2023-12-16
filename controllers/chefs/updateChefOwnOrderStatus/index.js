import { orderStatus, orderStatuses } from '#constants/orderStatus.js';
import {
  createUserOrderStatusNotification,
  notifyCouriers,
} from '#controllers/notifications/index.js';

import {
  ForbiddenError,
  NotFoundError,
  getOrderCodeByValue,
} from '#helpers/index.js';
import Order from '#models/order/Order.model.js';

export const updateChefOwnOrderStatus = async (req, res) => {
  const chefId = req.roleIds.chef;
  const { orderId } = req.params;
  const { status: updateStatus } = req.body;
  if (!orderStatuses.includes(updateStatus)) {
    throw new ForbiddenError('Invalid order status');
  }

  const order = await Order.findById(orderId);

  if (!order) {
    throw new NotFoundError('Order not found');
  } else if (order.chefId.toString() !== chefId.toString()) {
    throw new ForbiddenError('Access denied: Chef IDs do not match');
  }
  const newChefOrderStatus = await Order.findByIdAndUpdate(
    orderId,
    { statusCode: getOrderCodeByValue(updateStatus) },
    { new: true }
  );

  if (updateStatus === orderStatus.READY_TO_DELIVERY) {
    await notifyCouriers(orderId, order.orderNumber, updateStatus);
  }

  if (newChefOrderStatus) {
    await createUserOrderStatusNotification(
      orderId,
      order.orderNumber,
      order.userId,
      updateStatus
    );
  }

  res.status(200).json(newChefOrderStatus);
};
