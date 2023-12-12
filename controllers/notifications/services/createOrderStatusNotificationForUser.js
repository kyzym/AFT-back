import Notification from '#models/notifications/index.js';

export const createOrderStatusNotificationForUser = async (
  orderId,
  userId,
  updateStatus
) => {
  const content = `Your order ${orderId} status has been updated to ${updateStatus}`;
  await new Notification({
    userId,
    type: 'Order Status Update',
    content,
  }).save();
};
