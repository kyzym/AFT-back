import { NotFoundError, getOrderCodeByValue } from '#helpers/index.js';
import Order from '#models/order/Order.model.js';

export const getOrdersByStatus = async (req, res) => {
  const { status, country, city } = req.params;

  const searchCriteria = {
    statusCode: getOrderCodeByValue(status),
  };

  if (country) {
    searchCriteria['deliveryInfo.address.country'] = country;
  }

  if (city) {
    searchCriteria['deliveryInfo.address.city'] = city;
  }

  const ordersByStatus = await Order.find(searchCriteria).populate({
    path: 'chefId',
    select: 'userId address phoneNumber',
    populate: {
      path: 'userId',
      select: 'firstName lastName',
    },
  });

  if (!ordersByStatus) {
    throw new NotFoundError(
      `Orders for couriers with status ${status} not found`
    );
  }

  res.status(200).json(ordersByStatus);
};
