import { NotFoundError } from '#helpers/index.js';
import { ctrlWrapper } from '#middlewares/index.js';
import { roles } from '#constants/index.js';

import { findUserAndCheck } from '#controllers/users/helpers.js';
import {
  findItemAndCheck,
  getTypeSingular,
  getFavoritesKeyByType,
} from '../helpers.js';

const controller = async (req, res) => {
  const { userId, type, favoriteId } = req.params;
  const authUserId = req.roleIds[roles.USER];
  const typeSingular = getTypeSingular(type); // "dish" or "chef"

  const user = await findUserAndCheck(userId, authUserId); // find user in the database

  await findItemAndCheck(type, favoriteId); // find favoriteId in the database

  const favoritesArrayName = getFavoritesKeyByType(type); // "favoriteDishes" or "favoriteChefs"

  // Throw an error if the item was not found in the favorites array during the update
  const indexToRemove = user[favoritesArrayName].indexOf(favoriteId);
  if (indexToRemove === -1)
    throw new NotFoundError(
      `The ${typeSingular} with ID ${favoriteId} is not found in favorites`
    );

  await user.updateOne({
    $pull: { [favoritesArrayName]: favoriteId },
  });

  return res.status(200).json({
    success: true,
    message: `The ${typeSingular} with ID ${favoriteId} removed from favorites for user ${userId}`,
  });
};

export const deleteFavoriteItem = ctrlWrapper(controller);
