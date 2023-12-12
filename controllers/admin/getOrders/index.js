import Order from '#models/order/Order.model.js';

export const getAllOrders = async (req, res) => {
  const orders = await Order.find()
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
  return res.status(200).json(orders);
};
