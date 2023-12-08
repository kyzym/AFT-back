import { NotFoundError } from '../../../helpers/index.js';
import Order from '../../../models/order/Order.model.js';

export const getChefOrdersByStatus = async (req, res) => {
  const { status } = req.params;
  const chefId = req.roleIds.chef;

  const chefOrdersByStatus = await Order.find({ chefId, status });

  if (!chefOrdersByStatus) {
    throw new NotFoundError(`Orders for chef with status ${status} not found`);
  }

  res.status(200).json(chefOrdersByStatus);
};
