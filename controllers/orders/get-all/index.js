import { withPagination } from '../../../helpers/withPagination.js';
import { ctrlWrapper } from '../../../middlewares/ctrlWrapper.js';
import Order from '../../../models/order/index.js';

const controller = async (req, res) => {
  // const { id as userId } = req.user;

  // mock id
  const userId = '65520e1b49c89850ff8556ea';

  const [orders, pagination] = await withPagination(
    Order.find(
      { userId },
      { createdAt: false, updatedAt: false, __v: false }
    ).populate('items.dishId', 'name image'),
    req.query
  );

  const data = { orders, ...pagination };

  return res.send({ success: true, data });
};

export const getAllOrders = (router) => {
  router.get('/', ctrlWrapper(controller));
};
