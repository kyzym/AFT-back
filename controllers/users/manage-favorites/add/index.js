import { ctrlWrapper } from '#middlewares/index.js';
import { roles } from '#constants/index.js';
import { findUserAndCheck } from '#controllers/users/helpers.js';
import {
  findItemAndCheck,
  getFavoritesArrayByType,
  getTypeSingular,
} from '../helpers.js';
import { ValidationError } from '#helpers/errors.js';

const controller = async (req, res) => {
  const { userId, type } = req.params;
  const { favoriteId } = req.body;
  const authUserId = req.roleIds[roles.USER];
  const typeSingular = getTypeSingular(type);

  const user = await findUserAndCheck(userId, authUserId);

  await findItemAndCheck(type, favoriteId);

  const userFavoritesArray = getFavoritesArrayByType(type, user);

  if (userFavoritesArray.includes(favoriteId))
    throw new ValidationError(
      `The ${typeSingular} with ID ${favoriteId} is already in favorites for user ${userId}`
    );

  userFavoritesArray.push(favoriteId);
  await user.save();

  return res.status(200).json({
    success: true,
    message: `The ${typeSingular} with ID ${favoriteId} added to favorites for user ${userId}`,
  });
};

export const addFavoriteItem = ctrlWrapper(controller);
