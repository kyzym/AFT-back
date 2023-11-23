import { orderStatus } from '#constants/orderStatus.js';
import { changeOrderStatus } from '#controllers/orders/helpers.js';
import { ctrlWrapper } from '#middlewares/index.js';
import Order from '#models/order/index.js';

const controller = async (req, res) => {
  const { orderId } = req.params;

  // mock
  const courierId = '6557219bccbbbbc3695bc8b2';

  const order = await Order.findOne({ _id: orderId }).exec();

  order.status = changeOrderStatus(order, {
    allowedStatuses: [orderStatus.DELIVERING],
    nextStatus: orderStatus.READY_TO_DELIVERY,
    accessKey: 'courierId',
    id: courierId,
  });
  // remove courier info from order
  order.courierId = null;
  await order.save();

  return res.send({ success: true, data: 'Order delivery canceled' });
};

export const cancelByCourier = ctrlWrapper(controller);
