import { withPagination } from '../../../helpers/withPagination.js';
import { isValidParameterId, ctrlWrapper } from '../../../middlewares/index.js';
import Order from '../../../models/order/index.js';

const controller = async (req, res) => {
  const { chefId } = req.params;

  const [orders, pagination] = await withPagination(
    Order.find(
      { chefId },
      { createdAt: false, updatedAt: false, __v: false }
    ).populate('items.dishId', 'name image'),
    req.query
  );

  const data = { orders, ...pagination };

  return res.send({ success: true, data });
};

export const getAllOrdersByChefId = (router) => {
  // TODO: add auth validation (access: chef, admin)
  router.get('/by-chef/:chefId', isValidParameterId, ctrlWrapper(controller));
};
