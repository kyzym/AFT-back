import { orderStatus } from '../../../constants/orderStatus.js';
import { compareObjectIds } from '../../../helpers/compareObjectIds.js';
import { ForbiddenError, NotFoundError } from '../../../helpers/errors.js';
import { ctrlWrapper } from '../../../middlewares/index.js';
import Order from '../../../models/order/index.js';

const controller = async (req, res) => {
  const { orderId } = req.params;

  // mock
  const chefId = '6557219bccbbbbc3695bc8b2';

  const order = await Order.findOne({ _id: orderId }).exec();

  // Check order
  if (!order) throw new NotFoundError();

  if (!compareObjectIds(order.chefId, chefId))
    throw new ForbiddenError("You don't have access to this order");

  if (order.status !== orderStatus.ACCEPTED)
    throw new ForbiddenError("Can't change status on this order");

  // Change order status
  order.status = orderStatus.COOKING;
  await order.save();

  return res.send({ success: true, data: 'Order start cooking' });
};

export const changeOrderStatusToCooking = (router) => {
  // TODO: add auth validation (access: chef)
  router.patch('/:orderId/start-cooking', ctrlWrapper(controller));
};
