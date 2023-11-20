import { compareObjectIds } from '../../../helpers/compareObjectIds.js';
import { ValidationError } from '../../../helpers/errors.js';
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
    'price isAvailable owner'
  ).exec();

  return dbDishes;
};

export const concatArraysById = (orderDishes, dbDishes) => {
  return orderDishes.map((orderDish) => {
    const matchingDish = dbDishes.find(
      // TODO: Change _id to id without underline
      (dbDish) => {
        return compareObjectIds(orderDish.dishId, dbDish._id);
      }
    );

    if (!matchingDish) return orderDish;

    const { price, isAvailable, owner } = matchingDish;

    return { ...orderDish, price, isAvailable, owner };
  });
};

export const getItemsInfo = (items) => {
  let orderPrice = 0;
  let errors = [];
  let chefId = null;

  for (const item of items) {
    // Checking whether items belong to the same chef
    if (!chefId) {
      chefId = item.owner;
    } else if (item.owner && !compareObjectIds(chefId, item.owner)) {
      throw new ValidationError('You can`t add dishes from different chefs');
    }

    // Checking for dish exist in db
    if (!item.owner) {
      errors.push({ dishId: item.dishId, message: `"${item.name}" not found` });
      continue;
    }

    // Checking for dish availability
    if (!item.isAvailable) {
      errors.push({
        dishId: item.dishId,
        message: `"${item.name}" is not available now`,
      });
      continue;
    }

    orderPrice = ceilToDecimalPlaces(orderPrice + item.price * item.count);
  }

  return { orderPrice, errors, chefId };
};
