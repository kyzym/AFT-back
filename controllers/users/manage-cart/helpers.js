import { NotFoundError, ValidationError } from '#helpers/index.js';
import Chef from '#models/chef/Chef.model.js';
import Dish from '#models/dish/dishModel.js';

export const matchChefs = async (cartChefId, itemChefId) => {
  const chefDetails = await Chef.findById(itemChefId).exec();
  if (!chefDetails)
    throw new NotFoundError(`The chef with ID ${itemChefId} doesn't exist`);

  if (cartChefId.toString() !== itemChefId.toString())
    throw new ValidationError('Items in the cart must have the same chef');
};

export const findDishAndCheck = async (dishId) => {
  const dish = await Dish.findById(dishId).exec();

  if (!dish) throw new NotFoundError(`The dish with ID ${dishId} not found`);

  return dish;
};
