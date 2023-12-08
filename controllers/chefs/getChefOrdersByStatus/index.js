import { NotFoundError, getOrderCodeByValue } from '../../../helpers/index.js';
import Order from '../../../models/order/Order.model.js';

export const getChefOrdersByStatus = async (req, res) => {
  const { chefId, status } = req.params;

  // TODO: Change status code
  // const chefOrdersByStatus = await Order.find({ chefId, status });
  const chefOrdersByStatus = await Order.find({
    chefId,
    statusCode: getOrderCodeByValue(status),
  });

  if (!chefOrdersByStatus) {
    throw new NotFoundError(`Orders for chef with status ${status} not found`);
  }

  res.status(200).json(chefOrdersByStatus);
};
