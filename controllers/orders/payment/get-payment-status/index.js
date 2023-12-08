import { paymentStatus } from '#constants/paymentStatus.js';
import { compareObjectIds } from '#helpers/compareObjectIds.js';
import { ForbiddenError, NotFoundError } from '#helpers/errors.js';
import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';
import Order from '#models/order/Order.model.js';

import {
  createTransaction,
  getPaymentData,
  getPaymentSignature,
  getPaymentStatus,
  getTransactionData,
} from '../helpers.js';

const controller = async (req, res) => {
  const { orderId } = req.params;
  const { user: userId } = req.roleIds;

  const order = await Order.findById(orderId)
    .populate('user', 'id email firstName lastName')
    .populate('items.dish', 'id price');

  if (!order) {
    throw new NotFoundError('Order not found');
  }

  if (!compareObjectIds(order.user.id, userId)) {
    throw new ForbiddenError("You don't have access to this order");
  }

  const responseData = {};

  if (order.isPaid) {
    responseData.status = paymentStatus.PAID;
  } else {
    // Check payment status in liqpay, if order paid but liqpay did't call server callback
    const transactionResponse = await getPaymentStatus(order.id);

    // If order paid in liqpay, we add transaction to our db and return error.
    if (transactionResponse.status === 'success') {
      await createTransaction(
        order,
        getTransactionData(orderId, transactionResponse)
      );

      responseData.status = paymentStatus.PAID;
    } else {
      // Create payment signature
      const payment = getPaymentSignature(getPaymentData(order));

      responseData.status = paymentStatus.PENDING;
      responseData.payment = payment;
    }
  }

  return res.status(200).json({
    success: true,
    data: responseData,
  });
};

export const getPaymentStatusByOrderId = ctrlWrapper(controller);
