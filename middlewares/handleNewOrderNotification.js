import { createNotification } from '#controllers/notifications/createNotification/index.js';

export const handleNewOrderNotification = async (req, _res, next) => {
  try {
    const { chefId } = req.orderData;

    await createNotification(
      chefId,
      [{ name: 'Chef', id: chefId }],
      'New Order',
      'You have a new order to prepare'
    );

    next();
  } catch (error) {
    next(error);
  }
};
