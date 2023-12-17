import { orderStatuses } from '#constants/orderStatus.js';
import {
  ForbiddenError,
  NotFoundError,
  getOrderCodeByValue,
} from '../../../helpers/index.js';
import Order from '../../../models/order/Order.model.js';

export const updateChefOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status: updateStatus } = req.body;
  if (!orderStatuses.includes(updateStatus)) {
    throw new ForbiddenError('Invalid order status');
  }
  const newChefOrderStatus = await Order.findByIdAndUpdate(
    orderId,
    { statusCode: getOrderCodeByValue(updateStatus) },
    {
      new: true,
    }
  );

  if (!newChefOrderStatus) {
    throw new NotFoundError('Chef not found');
  }

  res.status(200).json(newChefOrderStatus);
};
