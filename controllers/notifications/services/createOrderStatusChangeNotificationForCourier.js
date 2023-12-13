import { roles } from '#constants/roles.js';
import Notification from '#models/notifications/Notifications.model.js';

export const createOrderStatusChangeNotificationForCourier = async (
  courierId,
  orderId,
  orderNumber,
  updateStatus
) => {
  const content = `The status of order ${orderNumber} has been updated to ${updateStatus}`;
  await new Notification({
    userId: courierId,
    orderId,
    type: 'Order Status Update for Courier',
    role: roles.COURIER,
    content,
  }).save();
};
