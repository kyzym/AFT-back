import { ctrlWrapper } from '../../../middlewares/index.js';
import { getOrderByRole } from '../helpers.js';

const controller = async (req, res) => {
  const { courierId } = req.params;

  const data = await getOrderByRole({ courierId }, req.query);

  return res.send({ success: true, data });
};

export const getAllOrdersByCourierId = ctrlWrapper(controller);
