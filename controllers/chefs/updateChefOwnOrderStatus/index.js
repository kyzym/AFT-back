import { orderStatus } from '#constants/orderStatus.js';
import { ForbiddenError, NotFoundError } from '../../../helpers/index.js';
import Order from '../../../models/order/Order.model.js';

export const updateChefOwnOrderStatus = async (req, res) => {
  const chefId = req.roleIds.chef;
  const { orderId } = req.params;
  const { status: updateStatus } = req.body;

  if (!orderStatus[updateStatus.toUpperCase()]) {
    throw new ForbiddenError('Invalid order status');
  }

  const order = await Order.findById(orderId);

  if (!order) {
    throw new NotFoundError('Order not found');
  } else if (order.chefId.toString() !== chefId.toString()) {
    throw new ForbiddenError('Access denied: Chef IDs do not match');
  }

  const newChefOrderStatus = await Order.findByIdAndUpdate(
    orderId,
    { status: updateStatus },
    { new: true }
  );

  res.status(200).json(newChefOrderStatus);
};
