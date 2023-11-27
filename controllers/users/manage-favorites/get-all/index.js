import { ctrlWrapper } from '#middlewares/index.js';
import { roles } from '#constants/index.js';
import { getFavoritesArrayByType } from '../helpers.js';
import { getFavoritesFromDB, getFavoritesKeyByType } from './helpers.js';
import { findUserAndCheck } from '#controllers/users/helpers.js';

const controller = async (req, res) => {
  const { userId, type } = req.params;
  const authUserId = req.roleIds[roles.USER];

  const user = await findUserAndCheck(userId, authUserId);

  const userFavoritesArray = getFavoritesArrayByType(type, user);

  const favoriteArrayName = getFavoritesKeyByType(type);

  if (userFavoritesArray.length === 0) {
    return res.status(200).json({
      success: true,
      messages: `A list of favorite ${type} is empty`,
      [favoriteArrayName]: [],
    });
  }

  const foundFavorites = await getFavoritesFromDB(type, userFavoritesArray);

  if (userFavoritesArray.length !== foundFavorites.length) {
    const updatedUserFavoritesArray = foundFavorites.map(
      (favoriteItem) => favoriteItem._id
    );
    user[favoriteArrayName] = updatedUserFavoritesArray;
    await user.save();
  }

  return res.status(200).json({
    success: true,
    messages: `Favorite ${type} successfully found`,
    [favoriteArrayName]: foundFavorites,
  });
};

export const getFavoritesByType = ctrlWrapper(controller);
