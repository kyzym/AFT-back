import { NotFoundError } from '#helpers/index.js';
import Order from '#models/order/Order.model.js';

export const getCourierOrders = async (req, res) => {
  const courierId = req.roleIds.courier;
  const courierOrders = await Order.find({ courierId }).populate({
    path: 'chefId',
    select: 'userId address phoneNumber',
    populate: {
      path: 'userId',
      select: 'firstName lastName',
    },
  });

  if (!courierOrders) {
    throw new NotFoundError('Orders for courier not found');
  }
  res.status(200).json(courierOrders);
};
