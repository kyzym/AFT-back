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
    nextStatus: orderStatus.COMPLETED,
    accessKey: 'courierId',
    id: courierId,
  });
  await order.save();

  return res.json({ success: true, data: 'Order delivered and close' });
};

export const completed = ctrlWrapper(controller);
