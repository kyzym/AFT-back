import { NotFoundError } from '../../../helpers/index.js';
import Order from '../../../models/order/Order.model.js';

export const updateChefOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const updateStatus = req.body;

  const updatedChefOrdertatus = await Order.findByIdAndUpdate(
    orderId,
    updateStatus,
    {
      new: true,
    }
  );

  if (!updatedChefOrdertatus) {
    throw new NotFoundError('Chef not found');
  }

  res.status(200).json(updateChefOrderStatus);
};
