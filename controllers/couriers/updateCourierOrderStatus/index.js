import { orderStatus, orderStatuses } from '#constants/orderStatus.js';
import { createUserOrderStatusNotification } from '#controllers/notifications/index.js';
import {
  ForbiddenError,
  NotFoundError,
  getOrderCodeByValue,
} from '#helpers/index.js';
import Order from '#models/order/Order.model.js';

export const updateCourierOrderStatus = async (req, res) => {
  const courierId = req.roleIds.courier;
  const { orderId } = req.params;
  const { status: updateStatus } = req.body;
  if (!orderStatuses.includes(updateStatus)) {
    throw new ForbiddenError('Invalid order status');
  }

  let newCourierOrderStatus;
  const order = await Order.findById(orderId);

  if (!order) {
    throw new NotFoundError('Order not found');
  }

  if (updateStatus === orderStatus.DELIVERING) {
    newCourierOrderStatus = await Order.findByIdAndUpdate(
      orderId,
      { courierId: courierId, statusCode: getOrderCodeByValue(updateStatus) },
      { new: true }
    );
  } else if (order.courierId && order.courierId.toString() !== courierId) {
    throw new ForbiddenError('Access denied: Courier IDs do not match');
  } else {
    newCourierOrderStatus = await Order.findByIdAndUpdate(
      orderId,
      { statusCode: getOrderCodeByValue(updateStatus) },
      { new: true }
    );
  }

  if (newCourierOrderStatus) {
    await createUserOrderStatusNotification(
      orderId,
      order.orderNumber,
      order.userId,
      updateStatus
    );
  }

  res.status(200).json(newCourierOrderStatus);
};
