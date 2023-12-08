import { ctrlWrapper } from '../../../middlewares/index.js';
import { getOrderByRole } from '../helpers.js';

const controller = async (req, res) => {
  const data = await getOrderByRole({}, req.query);

  return res.json({ success: true, data });
};

export const getAllOrders = ctrlWrapper(controller);
