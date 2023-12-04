import { ctrlWrapper } from '#middlewares/index.js';
import { roles } from '#constants/index.js';
import { findUserAndCheck } from '#controllers/users/helpers.js';
import {
  findItemAndCheck,
  getTypeSingular,
  getFavoritesKeyByType,
} from '../helpers.js';

const controller = async (req, res) => {
  const { userId, type } = req.params;
  const { favoriteId } = req.body;
  const authUserId = req.roleIds[roles.USER];
  const typeSingular = getTypeSingular(type); // "dish" or "chef"

  const user = await findUserAndCheck(userId, authUserId); // find user in the database

  await findItemAndCheck(type, favoriteId); // find favoriteId in the database

  const favoritesArrayName = getFavoritesKeyByType(type); // "favoriteDishes" or "favoriteChefs"

  if (user[favoritesArrayName].includes(favoriteId))
    return res.status(200).json({
      success: true,
      message: `The ${typeSingular} with ID ${favoriteId} is already in favorites for user ${userId}`,
    });

  await user.updateOne({ $push: { [favoritesArrayName]: favoriteId } });

  return res.status(200).json({
    success: true,
    message: `The ${typeSingular} with ID ${favoriteId} added to favorites for user ${userId}`,
  });
};

export const addFavoriteItem = ctrlWrapper(controller);
