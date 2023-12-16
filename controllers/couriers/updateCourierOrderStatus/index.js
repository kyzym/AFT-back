// import { orderStatuses } from '#constants/orderStatus.js';
// import { ForbiddenError, NotFoundError } from '../../../helpers/index.js';
// import Order from '../../../models/order/Order.model.js';

// export const updateCourierOrderStatus = async (req, res) => {
//   const { orderId } = req.params;
//   const { status: updateStatus } = req.body;

//  // TODO: Change status
// // if (
// //   !Object.prototype.hasOwnProperty.call(
// //     orderStatus,
// //     updateStatus.toUpperCase()
// //   )
// // ) {
// //   throw new ForbiddenError('Invalid order status');
// // }

// if (!orderStatuses.includes(updateStatus)) {
//   throw new ForbiddenError('Invalid order status');
// }

//  // TODO: Change status
// //   const newCourierOrderStatus = await Order.findByIdAndUpdate(
// //     orderId,
// //     { status: updateStatus },
// //     {
// //       new: true,
// //     }
// //   );
// const newCourierOrderStatus = await Order.findByIdAndUpdate(
//   orderId,
//   { statusCode: getOrderCodeByValue(updateStatus) },
//   {
//     new: true,
//   }
// );

//   if (!newCourierOrderStatus) {
//     throw new NotFoundError('Courier not found');
//   }

//   res.status(200).json(newCourierOrderStatus);
// };

import { orderStatus, orderStatuses } from '#constants/orderStatus.js';
import { createUserOrderStatusNotification } from '#controllers/notifications/index.js';
import {
  ForbiddenError,
  NotFoundError,
  getOrderCodeByValue,
} from '#helpers/index.js';
import Order from '#models/order/Order.model.js';

export const updateCourierOrderStatus = async (req, res) => {
  const courierId = req.roleIds.courier;
  const { orderId } = req.params;
  const { status: updateStatus } = req.body;

  // TODO: Change status
  // if (
  //   !updateStatus ||
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

  let newCourierOrderStatus;
  const order = await Order.findById(orderId);

  if (!order) {
    throw new NotFoundError('Order not found');
  }
  // TODO: Change status
  // if (updateStatus === orderStatus.DELIVERING) {
  //   newCourierOrderStatus = await Order.findByIdAndUpdate(
  //     orderId,
  //     { courierId: courierId, status: updateStatus },
  //     { new: true }
  //   );
  //   console.log(courierId, 'good');
  // } else if (order.courierId && order.courierId.toString() !== courierId) {
  //   throw new ForbiddenError('Access denied: Courier IDs do not match');
  // } else {
  //   newCourierOrderStatus = await Order.findByIdAndUpdate(
  //     orderId,
  //     { status: updateStatus },
  //     { new: true }
  //   );
  //   console.log('cool');
  // }
  if (updateStatus === orderStatus.DELIVERING) {
    newCourierOrderStatus = await Order.findByIdAndUpdate(
      orderId,
      { courierId: courierId, statusCode: getOrderCodeByValue(updateStatus) },
      { new: true }
    );

    if (newCourierOrderStatus) {
      await createUserOrderStatusNotification(
        orderId,
        order.orderNumber,
        order.userId,
        updateStatus
      );
    }
  } else if (order.courierId && order.courierId.toString() !== courierId) {
    throw new ForbiddenError('Access denied: Courier IDs do not match');
  } else {
    newCourierOrderStatus = await Order.findByIdAndUpdate(
      orderId,
      { statusCode: getOrderCodeByValue(updateStatus) },
      { new: true }
    );
  }

  res.status(200).json(newCourierOrderStatus);
};
