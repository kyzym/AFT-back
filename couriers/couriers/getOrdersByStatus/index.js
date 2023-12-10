import { NotFoundError } from '../../../helpers/index.js';
import Order from '../../../models/order/Order.model.js';

export const getOrdersByStatus = async (req, res) => {
  const { status } = req.params;

  const ordersByStatus = await Order.find({ status });

  if (!ordersByStatus) {
    throw new NotFoundError(
      `Orders for couriers with status ${status} not found`
    );
  }

  res.status(200).json(ordersByStatus);
};
