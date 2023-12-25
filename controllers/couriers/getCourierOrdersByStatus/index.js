import { NotFoundError, getOrderCodeByValue } from '#helpers/index.js';
import Order from '#models/order/Order.model.js';

export const getCourierOrdersByStatus = async (req, res) => {
  const { status } = req.params;
  const courierId = req.roleIds.courier;
  const courierOrdersByStatus = await Order.find({
    courierId,
    statusCode: getOrderCodeByValue(status),
  });

  if (!courierOrdersByStatus) {
    throw new NotFoundError(
      `Orders for courier with status ${status} not found`
    );
  }

  res.status(200).json(courierOrdersByStatus);
};
