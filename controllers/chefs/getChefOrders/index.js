import { NotFoundError } from '../../../helpers/index.js';
import Order from '../../../models/order/Order.model.js';

export const getChefOrders = async (req, res) => {
  const chefId = req.roleIds.chef;

  const chefOrders = await Order.find({ chefId });

  if (!chefOrders) {
    throw new NotFoundError('Orders for the chef not found');
  }
  res.status(200).json(chefOrders);
};
