import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';
import Order from '#models/order/Order.model.js';
import { selectOrderData } from '../helpers.js';

const controller = async (req, res) => {
  const { userId } = req.params;

  const data = await Order.find({ userId })
    .populate({
      path: 'chef',
      select: { id: true, user: true, userId: true },
      populate: {
        path: 'user',
        select: { firstName: true, lastName: true },
      },
    })
    .populate('items.dish', 'name image')
    .select({
      __v: false,
      deliveryInfo: false,
      additionalInfo: false,
      paymentTransaction: false,
      items: {
        createdAt: false,
        updatedAt: false,
      },
    })
    .sort('statusCode -createdAt')
    .exec();

  return res.json({ success: true, data: selectOrderData(data) });
};

export const getAllUserOrders = ctrlWrapper(controller);
