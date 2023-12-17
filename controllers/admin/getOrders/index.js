import Order from '#models/order/Order.model.js';

export const getAllOrders = async (req, res) => {
  let orders = await Order.find()
    .populate({
      path: 'chefId',
      select: 'userId address phoneNumber',
      populate: {
        path: 'userId',
        select: 'firstName lastName',
      },
    })
    .populate({
      path: 'courierId',
      select: 'userId address phoneNumber',
      populate: {
        path: 'userId',
        select: 'firstName lastName',
      },
    });
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = orders.length;
  orders = orders.slice(startIndex, endIndex);

  res.status(200).json({
    orders,
    pageInfo: {
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    },
  });
};
