import { withPagination } from '../../../helpers/withPagination.js';
import { ctrlWrapper, isValidParameterId } from '../../../middlewares/index.js';
import Order from '../../../models/order/index.js';

const controller = async (req, res) => {
  const { userId } = req.params;

  const [orders, pagination] = await withPagination(
    Order.find(
      { userId },
      { createdAt: false, updatedAt: false, __v: false }
    ).populate('items.dish', 'image'),
    req.query
  );

  const data = { orders, ...pagination };

  return res.send({ success: true, data });
};

export const getAllOrdersByUserId = (router) => {
  // TODO: add auth validation (access: user, admin)
  router.get('/by-user/:userId', isValidParameterId, ctrlWrapper(controller));
};
