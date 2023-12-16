import { roles } from '#constants/roles.js';
import Notification from '#models/notifications/index.js';

export const createUserOrderStatusNotification = async (
  orderId,
  orderNumber,
  userId,
  updateStatus
) => {
  const content = `Order ${orderNumber} status has been updated to ${updateStatus}`;
  await new Notification({
    userId,
    orderId,
    type: 'Order Status Update',
    updateStatus,
    orderNumber,
    role: roles.USER,
    content,
  }).save();
};
