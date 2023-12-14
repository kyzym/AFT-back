import { withPagination } from '#helpers/withPagination.js';
import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';
import Order from '#models/order/Order.model.js';
import { selectOrderData } from '../helpers.js';

const controller = async (req, res) => {
  const { userId } = req.params;

  const [orders, pagination] = await withPagination(
    Order.find({ userId })
      .populate({
        path: 'chef',
        select: { id: true, user: true, userId: true },
        populate: {
          path: 'user',
          select: { firstName: true, lastName: true },
        },
      })
      .populate('items.dish', 'name image price')
      .select({
        __v: false,
        items: {
          createdAt: false,
          updatedAt: false,
        },
      })
      .sort('statusCode -createdAt'),
    req.query
  );

  return res.json({
    success: true,
    data: { orders: selectOrderData(orders), ...pagination },
  });
};

export const getAllUserOrders = ctrlWrapper(controller);
