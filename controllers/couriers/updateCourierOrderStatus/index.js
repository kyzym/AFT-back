import { orderStatuses } from '#constants/orderStatus.js';
import {
  ForbiddenError,
  NotFoundError,
  getOrderCodeByValue,
} from '../../../helpers/index.js';
import Order from '../../../models/order/Order.model.js';

export const updateCourierOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status: updateStatus } = req.body;

  // TODO: Change status code
  // if (
  //   !Object.prototype.hasOwnProperty.call(
  //     orderStatus,
  //     updateStatus.toUpperCase()
  //   )
  // ) {
  //   throw new ForbiddenError('Invalid order status');
  // }
  if (!orderStatuses.includes(updateStatus)) {
    throw new ForbiddenError('Invalid order status');
  }

  // TODO: Change status code
  // const newCourierOrderStatus = await Order.findByIdAndUpdate(
  //   orderId,
  //   { status: updateStatus },
  //   {
  //     new: true,
  //   }
  // );
  const newCourierOrderStatus = await Order.findByIdAndUpdate(
    orderId,
    { statusCode: getOrderCodeByValue(updateStatus) },
    {
      new: true,
    }
  );

  if (!newCourierOrderStatus) {
    throw new NotFoundError('Courier not found');
  }

  res.status(200).json(newCourierOrderStatus);
};
