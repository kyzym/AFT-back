import { roles } from '#constants/roles.js';
import Notification from '#models/notifications/Notifications.model.js';
import Courier from '#models/courier/Courier.model.js';

const getAvailableActiveCouriers = async () => {
  const couriers = await Courier.find({
    isAvailable: 'active',
  }).select('_id');
  return couriers.map((courier) => courier._id);
};

export const notifyCouriersAboutReadyOrder = async (
  orderId,
  orderNumber,
  updateStatus
) => {
  const courierIds = await getAvailableActiveCouriers();

  const content = `Order ${orderNumber} is ready for delivery`;

  courierIds.forEach(async (courierId) => {
    await new Notification({
      userId: courierId,
      orderId,
      type: 'Order Ready for Delivery',
      updateStatus,
      orderNumber,
      role: roles.COURIER,
      content,
    }).save();
  });
};
