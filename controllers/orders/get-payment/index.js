import { orderStatus } from '#constants/orderStatus.js';
import { compareObjectIds } from '#helpers/compareObjectIds.js';
import {
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from '#helpers/errors.js';
import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';
import Order from '#models/order/Order.model.js';
import LiqPay from '#libs/Liqpay.js';

const { LIQPAY_PUBLIC_KEY, LIQPAY_PRIVATE_KEY } = process.env;

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

  if (order.status !== orderStatus.NEW) {
    throw new ValidationError('Payment unavailable for this order');
  }

  if (order.isPaid) {
    throw new ValidationError('You already paid for this order');
  }

  const liqpay = new LiqPay(LIQPAY_PUBLIC_KEY, LIQPAY_PRIVATE_KEY);

  const params = {
    action: 'pay',
    amount: order.totalPrice, // Replace with the actual amount
    currency: 'UAH', // Replace with the actual currency
    description: `Payment for order #${order.orderNumber}`,
    order_id: order.id, // Replace with a unique order ID
    version: '3',
    rro_info: {
      delivery_emails: [order.user.email],
    },
    sender_first_name: order.user.firstName,
    sender_last_name: order.user.lastName,
    result_url: 'http://localhost:3000/',
    server_url:
      'https://5f46-176-38-23-41.ngrok-free.app/api/orders/payment/callback',
  };

  const payment = liqpay.cnb_object(params);

  return res.status(200).send({
    success: true,
    data: {
      payment,
    },
  });
};

export const getPaymentSignature = ctrlWrapper(controller);
