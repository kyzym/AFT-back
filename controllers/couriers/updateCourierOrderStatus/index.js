import { orderStatus } from '#constants/orderStatus.js';
import { ForbiddenError, NotFoundError } from '../../../helpers/index.js';
import Order from '../../../models/order/Order.model.js';

export const updateCourierOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status: updateStatus } = req.body;

  if (
    !Object.prototype.hasOwnProperty.call(
      orderStatus,
      updateStatus.toUpperCase()
    )
  ) {
    throw new ForbiddenError('Invalid order status');
  }

  const newCourierOrderStatus = await Order.findByIdAndUpdate(
    orderId,
    { status: updateStatus },
    {
      new: true,
    }
  );

  if (!newCourierOrderStatus) {
    throw new NotFoundError('Courier not found');
  }

  res.status(200).json(newCourierOrderStatus);
};
