import { NotFoundError } from '../../../helpers/index.js';
import Order from '../../../models/order/Order.model.js';

export const getCourierOrdersByStatus = async (req, res) => {
  const { courierId, status } = req.params;

  const courierOrdersByStatus = await Order.find({ courierId, status });

  if (!courierOrdersByStatus) {
    throw new NotFoundError(
      `Orders for courier with status ${status} not found`
    );
  }

  res.status(200).json(courierOrdersByStatus);
};
