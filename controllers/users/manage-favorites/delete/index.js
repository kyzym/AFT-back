import { NotFoundError } from '#helpers/index.js';
import { ctrlWrapper } from '#middlewares/index.js';
import { roles } from '#constants/index.js';
import { findUserAndCheck } from '#controllers/users/helpers.js';
import {
  findItemAndCheck,
  getTypeSingular,
  getFavoritesArrayByType,
} from '../helpers.js';

const controller = async (req, res) => {
  const { userId, type, favoriteId } = req.params;
  const authUserId = req.roleIds[roles.USER];
  const typeSingular = getTypeSingular(type);

  const user = await findUserAndCheck(userId, authUserId);

  await findItemAndCheck(type, favoriteId);

  const userFavoritesArray = getFavoritesArrayByType(type, user);

  const indexToRemove = userFavoritesArray.indexOf(favoriteId);
  if (indexToRemove === -1)
    throw new NotFoundError(
      `The ${typeSingular} with ID ${favoriteId} is not found in favorites`
    );

  userFavoritesArray.splice(indexToRemove, 1);
  await user.save();

  return res.status(200).json({
    success: true,
    message: `The ${typeSingular} with ID ${favoriteId} removed from favorites for user ${userId}`,
  });
};

export const deleteFavoriteItem = ctrlWrapper(controller);
