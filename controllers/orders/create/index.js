import { ctrlWrapper } from '../../../middlewares/ctrlWrapper.js';
import { validate } from '../../../middlewares/validation.middleware.js';
import Order from '../../../models/order/index.js';
import { orderValidationSchema } from '../../../models/order/order.validation.js';
import { ValidationError } from '../../../helpers/errors.js';
import {
  concatArraysById,
  findOrderItemsInDb,
  getOrderPrice,
} from './helpers.js';

const controller = async (req, res) => {
  // const { id as userId } = req.user;
  const { address, items: dishes } = req.body;

  // mock id
  const userId = '65520e1b49c89850ff8556ea';

  // Check order items
  const dbDishes = await findOrderItemsInDb(dishes);
  // Concat items list from client and db dishes list
  const concatItems = concatArraysById(dishes, dbDishes);
  // Calculate order price and find invalid dishes (not found or not available)
  const { orderPrice, errors } = getOrderPrice(concatItems);

  // Check for invalid dishes
  if (errors.length > 0) {
    throw new ValidationError('Validation error', errors);
  }

  const order = new Order({
    orderNumber: Date.now(),
    userId,
    address,
    items: dishes,
    totalPrice: orderPrice,
  });
  const data = await order.save();

  return res.status(201).send({ success: true, data });
};

export const createOrder = (router) => {
  router.post('/', validate(orderValidationSchema), ctrlWrapper(controller));
};
