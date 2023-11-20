import { orderStatus } from '../../../constants/orderStatus.js';
import { ctrlWrapper } from '../../../middlewares/index.js';
import Order from '../../../models/order/index.js';
import { changeOrderStatus } from '../helpers.js';

const controller = async (req, res) => {
  const { orderId } = req.params;

  // mock
  const chefId = '6557219bccbbbbc3695bc8b2';

  const order = await Order.findOne({ _id: orderId }).exec();

  // Change order status
  order.status = changeOrderStatus(order, {
    currentStatus: orderStatus.PENDING,
    nextStatus: orderStatus.ACCEPTED,
    accessKey: 'chefId',
    id: chefId,
  });
  await order.save();

  return res.send({ success: true, data: 'Order approved' });
};

export const changeOrderStatusToApproved = (router) => {
  // TODO: add auth validation (access: chef)
  router.patch('/:orderId/status/approve-order', ctrlWrapper(controller));
};
