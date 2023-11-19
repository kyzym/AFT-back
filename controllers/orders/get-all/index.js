import { withPagination } from '../../../helpers/withPagination.js';
import { ctrlWrapper } from '../../../middlewares/index.js';
import Order from '../../../models/order/index.js';

const controller = async (req, res) => {
  const [orders, pagination] = await withPagination(
    Order.find({}, { createdAt: false, updatedAt: false, __v: false }).populate(
      'items.dishId',
      'name image'
    ),
    req.query
  );

  const data = { orders, ...pagination };

  return res.send({ success: true, data });
};

export const getAllOrders = (router) => {
  // TODO: add auth validation (only admin)
  router.get('/', ctrlWrapper(controller));
};
