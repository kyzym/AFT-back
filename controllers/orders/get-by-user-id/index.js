import { ctrlWrapper, isValidParameterId } from '../../../middlewares/index.js';
import { getOrderByRole } from '../helpers.js';

const controller = async (req, res) => {
  const { userId } = req.params;

  const data = await getOrderByRole({ userId }, req.query);

  return res.send({ success: true, data });
};

export const getAllOrdersByUserId = (router) => {
  // TODO: add auth validation (access: user, admin)
  router.get('/by-user/:userId', isValidParameterId, ctrlWrapper(controller));
};
