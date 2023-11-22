import { orderStatus } from '#constants/orderStatus.js';
import { changeOrderStatus } from '#controllers/orders/helpers.js';
import { isValidParameterId, ctrlWrapper } from '#middlewares/index.js';
import Order from '#models/order/index.js';

const controller = async (req, res) => {
  const { orderId } = req.params;

  // mock
  const chefId = '6557219bccbbbbc3695bc8b2';

  const order = await Order.findOne({ _id: orderId }).exec();

  order.status = changeOrderStatus(order, {
    allowedStatuses: [orderStatus.ACCEPTED, orderStatus.PENDING],
    nextStatus: orderStatus.COOKING,
    accessKey: 'chefId',
    id: chefId,
  });
  await order.save();

  return res.send({ success: true, data: 'Order start cooking' });
};

export const changeOrderStatusToCooking = (router) => {
  // TODO: add auth validation (access: chef)
  router.patch(
    '/:orderId/status/start-cooking',
    isValidParameterId,
    ctrlWrapper(controller)
  );
};
