import { roles } from '#constants/roles.js';
import Notification from '#models/notifications/Notifications.model.js';

export const createNewOrderNotificationForChef = async (
  chefId,
  orderNumber,
  orderId
) => {
  const content = `New order with Number: ${orderNumber}`;
  await new Notification({
    userId: chefId,
    orderId,
    type: 'New Order',
    orderNumber,
    role: roles.CHEF,
    content,
  }).save();
};
