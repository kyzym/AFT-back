import Notification from '#models/notifications/Notifications.model.js';

export const createOrderStatusChangeNotificationForCourier = async (
  courierId,
  orderId,
  updateStatus
) => {
  const content = `The status of order ${orderId} has been updated to ${updateStatus}`;
  await new Notification({
    userId: courierId,
    type: 'Order Status Update for Courier',
    content,
  }).save();
};
