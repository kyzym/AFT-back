import config from '#config/config.js';
import { calcAmountWithTax } from '#helpers/calcAmountWithTax.js';
import { normalizeDecimal } from '#helpers/normalizeDecimal.js';
import { compareObjectIds } from '#helpers/compareObjectIds.js';
import { ValidationError } from '#helpers/errors.js';
import Dish from '#models/dish/dishModel.js';

export const findOrderItemsInDb = async (orderItems) => {
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
    const matchingDish = dbDishes.find((dbDish) => {
      return compareObjectIds(orderDish.dishId, dbDish.id);
    });

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
      errors.push({
        dish: item.dish,
        message: `"Dish with id ${item.name}" not found`,
      });
      continue;
    }

    // Checking for dish availability
    if (!item.isAvailable) {
      errors.push({
        dish: item.dish,
        message: `"${item.name}" is not available now`,
      });
      continue;
    }

    orderPrice = normalizeDecimal(orderPrice + item.price * item.count);
  }

  const tax = normalizeDecimal(orderPrice * (config.taxPercent / 100));
  const chef = normalizeDecimal(orderPrice * ((100 - config.taxPercent) / 100));
  const delivery = config.delivery;
  const totalWithoutBankCommission = normalizeDecimal(tax + chef + delivery);

  const bankCommission = normalizeDecimal(
    calcAmountWithTax(tax) +
      calcAmountWithTax(chef) +
      calcAmountWithTax(delivery) -
      totalWithoutBankCommission
  );

  return {
    summaryPrice: {
      tax,
      chef,
      delivery,
      bankCommission,
    },
    errors,
    chefId,
  };
};
