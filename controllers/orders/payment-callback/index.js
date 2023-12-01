import { transactionAction } from '#constants/transactionAction.js';
import { NotFoundError, normalizeDecimal } from '#helpers/index.js';
import { ctrlWrapper } from '#middlewares/index.js';
import Order from '#models/order/index.js';
import Transaction from '#models/transaction/index.js';

import { isValidResponseSignature } from './helpers.js';

const controller = async (req, res, next) => {
  const { data, signature } = req.body;

  if (!data || !signature) throw new Error('Invalid LiqPay response');

  if (!isValidResponseSignature(data, signature))
    throw new Error('Incorrect payment signature');

  const response = JSON.parse(atob(data));

  if (response.status !== 'success') throw new Error('Payment error');

  const transactionData = {
    liqpay: response,
    orderId: response.order_id,
    action: transactionAction.ORDER_PAID,
    amount: normalizeDecimal(response.amount - response.receiver_commission),
  };

  const session = await Order.startSession();
  try {
    await session.withTransaction(async () => {
      const order = await Order.findById(response.order_id).exec();

      if (!order) throw new NotFoundError('Order not found');

      const transaction = new Transaction(transactionData);
      await transaction.save();

      order.paymentTransaction = transaction.id;
      await order.save();
    });

    return res.status(200).json({ success: true, data: 'Payment success' });
  } catch (err) {
    next(err);
  } finally {
    session.endSession();
  }
};

export const callbackPayment = ctrlWrapper(controller);
