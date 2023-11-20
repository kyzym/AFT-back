import Order from '#models/order/index.js';
import { orderStatus } from '#constants/orderStatus.js';
import { changeOrderStatus } from '#controllers/orders/helpers.js';
import { isValidParameterId, ctrlWrapper } from '#middlewares/index.js';

const controller = async (req, res) => {
  const { orderId } = req.params;

  // mock
  const chefId = '6557219bccbbbbc3695bc8b2';

  const order = await Order.findOne({ _id: orderId }).exec();

  // Change order status
  order.status = changeOrderStatus(order, {
    currentStatuses: [orderStatus.PENDING],
    nextStatus: orderStatus.CANCELED,
    accessKey: 'chefId',
    id: chefId,
  });
  await order.save();

  return res.send({ success: true, data: 'Order canceled' });
};

export const cancelOrderByChef = (router) => {
  // TODO: add auth validation (access: chef)
  router.patch(
    '/:orderId/status/cancel-by-chef',
    isValidParameterId,
    ctrlWrapper(controller)
  );
};
