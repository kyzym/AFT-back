import { roles } from '#constants/roles.js';
import Notification from '#models/notifications/Notifications.model.js';

export const createNewOrderNotificationForChef = async (
  chefId,
  orderNumber,
  orderId
) => {
  const content = `You have a new order with Number: ${orderNumber}`;
  await new Notification({
    userId: chefId,
    orderId,
    type: 'New Order',
    role: roles.CHEF,
    content,
  }).save();
};
