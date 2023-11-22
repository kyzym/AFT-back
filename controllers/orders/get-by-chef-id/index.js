import { isValidParameterId, ctrlWrapper } from '../../../middlewares/index.js';
import { getOrderByRole } from '../helpers.js';

const controller = async (req, res) => {
  const { chefId } = req.params;

  const data = await getOrderByRole({ chefId }, req.query);

  return res.send({ success: true, data });
};

export const getAllOrdersByChefId = (router) => {
  // TODO: add auth validation (access: chef, admin)
  router.get('/by-chef/:chefId', isValidParameterId, ctrlWrapper(controller));
};
