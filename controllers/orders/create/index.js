import { ctrlWrapper } from '../../../middlewares/index.js';
import Order from '../../../models/order/index.js';
import { ValidationError } from '../../../helpers/errors.js';
import {
  concatArraysById,
  findOrderItemsInDb,
  getItemsInfo,
} from './helpers.js';
// import LiqPay from '#libs/Liqpay.js';

// const { LIQPAY_PUBLIC_KEY, LIQPAY_PRIVATE_KEY } = process.env;

const controller = async (req, res) => {
  const { address, items: dishes } = req.body;
  const { user: userId } = req.roleIds;

  // Check order items
  const dbDishes = await findOrderItemsInDb(dishes);
  // Concat items list from client and db dishes list
  const concatItems = concatArraysById(dishes, dbDishes);
  // Calculate order price and find invalid dishes (not found or not available)
  const { orderPrice, errors, chefId } = getItemsInfo(concatItems);

  // Check for invalid dishes
  if (errors.length > 0) {
    throw new ValidationError('Validation error', errors);
  }

  const order = new Order({
    orderNumber: Date.now(),
    userId,
    chefId,
    address,
    items: dishes,
    totalPrice: orderPrice,
  });
  const data = await order.save();

  // const liqpay = new LiqPay(LIQPAY_PUBLIC_KEY, LIQPAY_PRIVATE_KEY);

  // const params = {
  //   action: 'pay',
  //   amount: data.totalPrice, // Replace with the actual amount
  //   currency: 'UAH', // Replace with the actual currency
  //   description: `Payment for order #${data.id}`,
  //   order_id: data.id, // Replace with a unique order ID
  //   version: '3',
  //   result_url: 'http://localhost:3000/',
  //   server_url: 'https://5f46-176-38-23-41.ngrok-free.app/api/callback',
  // };

  // const payment = liqpay.cnb_form(params);

  return res.status(201).send({
    success: true,
    data: {
      order: data,
      // payment,
    },
  });
};

export const createOrder = ctrlWrapper(controller);
