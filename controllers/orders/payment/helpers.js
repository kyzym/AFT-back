import { orderStatus } from '#constants/orderStatus.js';
import { transactionAction } from '#constants/transactionAction.js';
import { calcAmountWithTax } from '#helpers/calcAmountWithTax.js';
import { normalizeDecimal } from '#helpers/normalizeDecimal.js';
import { getOrderCodeByValue } from '#helpers/orderStatus.js';
import LiqPay from '#libs/Liqpay.js';
import Order from '#models/order/Order.model.js';
import Transaction from '#models/transaction/Transaction.model.js';
import transaction from '#models/transaction/index.js';

const {
  LIQPAY_PUBLIC_KEY,
  LIQPAY_PRIVATE_KEY,
  LIQPAY_IDLO_PUBLIC_KEY,
  SERVER_URL,
  LIQPAY_SITE_RESULT_URL,
} = process.env;

const liqpay = new LiqPay(LIQPAY_PUBLIC_KEY, LIQPAY_PRIVATE_KEY);

export const getPaymentData = (order) => {
  const delivery = calcAmountWithTax(order.summaryPrice.delivery);
  const chef = calcAmountWithTax(order.summaryPrice.chef);
  const app = calcAmountWithTax(order.summaryPrice.tax);
  const totalAmount = normalizeDecimal(delivery + chef + app);

  const params = {
    action: 'pay',
    amount: totalAmount, // Replace with the actual amount
    currency: 'UAH', // Replace with the actual currency
    description: `Payment for order #${order.orderNumber}`,
    order_id: order.id, // Replace with a unique order ID
    version: '3',
    rro_info: {
      delivery_emails: [order.user.email],
    },
    split_rules: [
      {
        public_key: LIQPAY_IDLO_PUBLIC_KEY,
        amount: app,
        commission_payer: 'sender',
      },
      {
        public_key: 'sandbox_i76229047528',
        amount: chef,
        commission_payer: 'sender',
      },
      {
        public_key: 'sandbox_i53994906938',
        amount: delivery,
        commission_payer: 'sender',
      },
    ],
    sender_first_name: order.user.firstName,
    sender_last_name: order.user.lastName,
    result_url: LIQPAY_SITE_RESULT_URL,
    server_url: `${SERVER_URL}/api/orders/payment/callback`,
  };

  return params;
};

export const getPaymentSignature = (params) => {
  return liqpay.cnb_object(params);
};

export const getPaymentStatus = async (orderId) => {
  const liqpay = new LiqPay(LIQPAY_PUBLIC_KEY, LIQPAY_PRIVATE_KEY);

  const transactionResponse = await liqpay.api('request', {
    action: 'status',
    version: '3',
    order_id: orderId,
  });

  return transactionResponse;
};

export const getTransactionData = (orderId, liqpayResponseData) => {
  const transactionData = {
    liqpay: liqpayResponseData,
    orderId,
    action: transactionAction.ORDER_PAID,
    amount: normalizeDecimal(
      liqpayResponseData.amount - liqpayResponseData.receiver_commission
    ),
  };

  return transactionData;
};

export const createTransaction = async (order, data) => {
  const session = await Order.startSession();

  try {
    await session.withTransaction(async () => {
      const transaction = new Transaction(data);
      await transaction.save({ session });

      order.statusCode = getOrderCodeByValue(orderStatus.PENDING);
      order.paymentTransaction = transaction.id;
      await order.save({ session });
    });

    return transaction;
  } finally {
    session.endSession();
  }
};
