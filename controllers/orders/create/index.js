import { ctrlWrapper } from '../../../middlewares/index.js';

import { ValidationError } from '../../../helpers/errors.js';
import {
  concatArraysById,
  findOrderItemsInDb,
  getItemsInfo,
} from './helpers.js';
import Order from '#models/order/Order.model.js';

const controller = async (req, res) => {
  const {
    name,
    email,
    phoneNumber,
    additionalInfo = null,
    address,
    items: dishes,
  } = req.body;
  const { user: userId } = req.roleIds;

  // Check order items
  const dbDishes = await findOrderItemsInDb(dishes);
  // Concat items list from client and db dishes list
  const concatItems = concatArraysById(dishes, dbDishes);
  // Calculate order price and find invalid dishes (not found or not available)
  const { summaryPrice, errors, chefId } = getItemsInfo(concatItems);

  // Check for invalid dishes
  if (errors.length > 0) {
    throw new ValidationError('Validation error', errors);
  }

  const order = new Order({
    orderNumber: Date.now(),
    userId,
    chefId,
    deliveryInfo: {
      name,
      email,
      phoneNumber,
      address,
    },
    summaryPrice,
    additionalInfo,
    items: dishes,
  });

  const data = await order.save();

  return res.status(201).json({
    success: true,
    data: {
      order: data,
    },
  });
};

export const createOrder = ctrlWrapper(controller);
