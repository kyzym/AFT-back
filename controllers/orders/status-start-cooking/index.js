import { orderStatus } from '../../../constants/orderStatus.js';
import { ctrlWrapper } from '../../../middlewares/index.js';
import Order from '../../../models/order/index.js';
import { changeOrderStatus } from '../helpers.js';

const controller = async (req, res) => {
  const { orderId } = req.params;

  // mock
  const chefId = '6557219bccbbbbc3695bc8b2';

  const order = await Order.findOne({ _id: orderId }).exec();

  order.status = changeOrderStatus(order, {
    currentStatus: orderStatus.ACCEPTED,
    nextStatus: orderStatus.COOKING,
    accessKey: 'chefId',
    id: chefId,
  });
  await order.save();

  return res.send({ success: true, data: 'Order start cooking' });
};

export const changeOrderStatusToCooking = (router) => {
  // TODO: add auth validation (access: chef)
  router.patch('/:orderId/status/start-cooking', ctrlWrapper(controller));
};
