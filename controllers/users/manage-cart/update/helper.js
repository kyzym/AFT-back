import { ValidationError } from '#helpers/errors.js';
import { Dish } from '#models/index.js';

export const findDishesInDB = async (items) => {
  return await Dish.find(
    {
      _id: { $in: items.map((item) => item.dishId) },
    },
    'owner id'
  ).exec();
};

export const getExistingItems = (reqItems, dbItems) => {
  return reqItems.filter((reqItem) =>
    dbItems.some((dbItem) => dbItem._id.toString() === reqItem.dishId)
  );
};

export const getChefId = (dbItems) => {
  const chefIdSet = new Set(dbItems.map((item) => item.owner.toString()));
  if (chefIdSet.size !== 1) {
    throw new ValidationError('Items in the cart must have the same chef');
  }
  const chefId = [...chefIdSet][0].toString();
  return chefId;
};
