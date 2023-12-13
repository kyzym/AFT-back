import { roles } from '#constants/roles.js';
import Notification from '#models/notifications/index.js';

export const createOrderStatusNotificationForUser = async (
  orderId,
  orderNumber,
  userId,
  updateStatus
) => {
  const content = `Your order ${orderNumber} status has been updated to ${updateStatus}`;
  await new Notification({
    userId,
    orderId,
    type: 'Order Status Update',
    role: roles.USER,
    content,
  }).save();
};
