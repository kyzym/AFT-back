import { ctrlWrapper } from '../../../middlewares/index.js';
import Order from '../../../models/order/index.js';
import { ValidationError } from '../../../helpers/errors.js';
import {
  concatArraysById,
  findOrderItemsInDb,
  getItemsInfo,
} from './helpers.js';

const controller = async (req, res) => {
  // const { id as userId } = req.user;
  const { address, items: dishes } = req.body;

  // mock id
  const userId = '6566e859a48ddb482e9ab846';

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

  return res.status(201).send({ success: true, data: { order: data } });
};

export const createOrder = ctrlWrapper(controller);
