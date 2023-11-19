import { validate, ctrlWrapper } from '../../../middlewares/index.js';
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
  const userId = '655a051fb7cc813b6007220b';

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
  // TODO: add auth validation (access: user)
  router.post('/', validate(orderValidationSchema), ctrlWrapper(controller));
};
