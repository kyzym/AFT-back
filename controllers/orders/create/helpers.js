import Dish from '../../../models/dish/dishModel.js';

function ceilToDecimalPlaces(number, decimalPlaces = 2) {
  var multiplier = Math.pow(10, decimalPlaces);
  var roundedNumber = Math.ceil(number * multiplier) / multiplier;

  return roundedNumber;
}

export const findOrderItemsInDb = async (orderItems) => {
  // TODO: Change _id to id without underline
  const dbDishes = await Dish.find(
    {
      _id: { $in: orderItems.map(({ dishId }) => dishId) },
    },
    'price isAvailable'
  ).exec();

  return dbDishes;
};

export const concatArraysById = (orderDishes, dbDishes) => {
  return orderDishes.map((orderDish) => {
    const matchingDish = dbDishes.find(
      // TODO: Change _id to id without underline
      (dbDish) => {
        return orderDish.dishId === dbDish._id.toString();
      }
    );

    if (!matchingDish) return orderDish;

    const { price, isAvailable } = matchingDish;

    return { ...orderDish, price, isAvailable };
  });
};

export const getOrderPrice = (items) => {
  const { orderPrice, errors } = items.reduce(
    (acc, item) => {
      console.log('Acc', acc);
      if (!item.price) {
        return {
          ...acc,
          errors: [
            ...acc.errors,
            { dishId: item.dishId, message: `"${item.name}" not found` },
          ],
        };
      }

      if (!item.isAvailable) {
        return {
          ...acc,
          errors: [
            ...acc.errors,
            {
              dishId: item.dishId,
              message: `"${item.name}" is not available now`,
            },
          ],
        };
      }

      return {
        ...acc,
        orderPrice: ceilToDecimalPlaces(
          acc.orderPrice + item.price * item.count
        ),
      };
    },
    {
      orderPrice: 0,
      errors: [],
    }
  );

  return { orderPrice, errors };
};
