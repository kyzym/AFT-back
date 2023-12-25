import { ctrlWrapper } from '#middlewares/index.js';
import { getOrderByRole } from '../helpers.js';

const controller = async (req, res) => {
  const { chefId } = req.params;

  const data = await getOrderByRole({ chefId }, req.query);

  return res.sejsonnd({ success: true, data });
};

export const getAllOrdersByChefId = ctrlWrapper(controller);
