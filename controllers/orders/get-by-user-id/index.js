import { ctrlWrapper } from '#middlewares/index.js';
import { getOrderByRole } from '../helpers.js';

const controller = async (req, res) => {
  const { userId } = req.params;

  const data = await getOrderByRole({ userId }, req.query);

  return res.json({ success: true, data });
};

export const getAllOrdersByUserId = ctrlWrapper(controller);
