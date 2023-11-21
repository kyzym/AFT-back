import { orderStatus } from '../../../constants/orderStatus.js';
import { compareObjectIds } from '../../../helpers/compareObjectIds.js';
import { ForbiddenError, NotFoundError } from '../../../helpers/errors.js';
import { ctrlWrapper, isValidParameterId } from '../../../middlewares/index.js';
import Order from '../../../models/order/index.js';

const controller = async (req, res) => {
  const { orderId } = req.params;

  // mock
  const userId = '655a051fb7cc813b6007220b';
  const chefId = null; //'6557219bccbbbbc3695bc8b2';
  const courierId = null; //'655a4d7fb7cc813b6007222a';
  const adminId = null;
  // =========

  const order = await Order.findById(orderId, {
    createdAt: false,
    updatedAt: false,
    __v: false,
  })
    .populate('items.dish', 'image')
    .exec();

  if (!order) throw new NotFoundError('Order not found');

  // Check for order access. If userId, chefId, or courierId is found in an order or an order in delivery status, and the user has a courier role.
  if (
    compareObjectIds(order.userId, userId) ||
    compareObjectIds(order.chefId, chefId) ||
    (!order.courierId &&
      courierId &&
      order.status === orderStatus.READY_TO_DELIVERY) ||
    (order.courierId && compareObjectIds(order.courierId, courierId)) ||
    adminId
  ) {
    return res.send({ success: true, data: order });
  }

  throw new ForbiddenError("You don't have access to this order");
};

export const getOrderById = (router) => {
  // TODO: add auth validation (access: all)
  router.get('/:orderId', isValidParameterId, ctrlWrapper(controller));
};
