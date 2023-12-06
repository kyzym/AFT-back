import { NotFoundError } from '../../../helpers/index.js';
import Order from '../../../models/order/Order.model.js';

export const getOwnChefOrders = async (req, res) => {
  const chefId = req.roleIds.chef;
  console.log(chefId);
  const chefOrders = await Order.find({ chefId, status: { $ne: 'new' } });

  if (!chefOrders) {
    throw new NotFoundError('Orders for chef not found');
  }
  res.status(200).json(chefOrders);
};
