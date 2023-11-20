import { orderStatus } from '../../../constants/orderStatus.js';
import { ctrlWrapper } from '../../../middlewares/index.js';
import Order from '../../../models/order/index.js';
import { changeOrderStatus } from '../helpers.js';

const controller = async (req, res) => {
  const { orderId } = req.params;

  // mock
  const courierId = '6557219bccbbbbc3695bc8b2';

  const order = await Order.findOne({ _id: orderId }).exec();

  // Add courier id to
  order.courierId = courierId;
  order.status = changeOrderStatus(order, {
    currentStatus: orderStatus.READY_TO_DELIVERY,
    nextStatus: orderStatus.DELIVERING,
    accessKey: 'courierId',
    id: courierId,
  });
  await order.save();

  return res.send({ success: true, data: 'Order start delivering' });
};

export const changeOrderStatusToDelivering = (router) => {
  // TODO: add auth validation (access: courier)
  router.patch('/:orderId/status/delivering', ctrlWrapper(controller));
};
