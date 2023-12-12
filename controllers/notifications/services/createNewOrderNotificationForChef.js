import Notification from '#models/notifications/Notifications.model.js';

export const createNewOrderNotificationForChef = async (
  chefId,
  orderNumber
) => {
  const content = `You have a new order with Number: ${orderNumber}`;
  await new Notification({
    userId: chefId,
    type: 'New Order',
    content,
  }).save();
};
