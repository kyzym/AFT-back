import { NotFoundError, ValidationError } from '#helpers/index.js';
import Chef from '#models/chef/Chef.model.js';
import Dish from '#models/dish/dishModel.js';

export const getTypeSingular = (type) => {
  return type === 'dishes' ? 'dish' : 'chef';
};

export const findItemAndCheck = async (type, favoriteId) => {
  let favoriteItem;
  const typeSingular = getTypeSingular(type);
  switch (type) {
    case 'dishes':
      favoriteItem = await Dish.findById(favoriteId).exec();
      break;
    case 'chefs':
      favoriteItem = await Chef.findById(favoriteId).exec();
      break;
    default:
      throw new ValidationError(`Invalid favorite type: ${type}`);
  }

  if (!favoriteItem) {
    throw new NotFoundError(
      `The ${typeSingular} with ID ${favoriteId} not found`
    );
  }
};

export const getFavoritesArrayByType = (type, user) => {
  switch (type) {
    case 'dishes':
      return user.favoriteDishes;
    case 'chefs':
      return user.favoriteChefs;
    default:
      throw new ValidationError(`Invalid favorite type: ${type}`);
  }
};
