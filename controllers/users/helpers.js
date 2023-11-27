import { NotFoundError, ForbiddenError } from '#helpers/index.js';
import User from '#models/user/index.js';

export const findUserAndCheck = async (userId, authUserId) => {
  const user = await User.findById(userId).exec();
  if (!user) {
    throw new NotFoundError(`User with ID ${userId} not found`);
  }

  if (authUserId !== userId) {
    throw new ForbiddenError(
      `You don't have permission to access the account of user with ID ${userId}`
    );
  }

  return user;
};

export const getFavoritesKeyByType = (type) => {
  return type === 'dishes' ? 'favoriteDishes' : 'favoriteChefs';
};
