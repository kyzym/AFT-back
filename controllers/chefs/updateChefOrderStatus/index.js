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
  // const newChefOrderStatus = await Order.findByIdAndUpdate(
  //   orderId,
  //   { status: updateStatus },
  //   {
  //     new: true,
  //   }
  // );
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
