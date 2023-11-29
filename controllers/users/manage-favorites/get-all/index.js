import { ctrlWrapper } from '#middlewares/index.js';
import { roles } from '#constants/index.js';
import { getFavoritesFromDB } from './helpers.js';
import { getFavoritesKeyByType } from '../helpers.js';
import { findUserAndCheck } from '#controllers/users/helpers.js';

const controller = async (req, res) => {
  const { userId, type } = req.params;
  const authUserId = req.roleIds[roles.USER];

  const user = await findUserAndCheck(userId, authUserId); // find user in the database

  const favoritesArrayName = getFavoritesKeyByType(type); // "favoriteDishes" or "favoriteChefs"

  if (user[favoritesArrayName].length === 0) {
    return res.status(200).json({
      success: true,
      messages: `A list of favorite ${type} is empty`,
      [favoritesArrayName]: [],
    });
  }

  // Check if all favorite items exist in the database
  const foundFavorites = await getFavoritesFromDB(
    type,
    user[favoritesArrayName]
  );

  // Check if favorites array contains items that don't exist in the database
  if (user[favoritesArrayName].length !== foundFavorites.length) {
    const updatedUserFavoritesArray = foundFavorites.map(
      (favoriteItem) => favoriteItem._id
    );

    await user.updateOne({
      $set: { [favoritesArrayName]: updatedUserFavoritesArray },
    });
  }

  return res.status(200).json({
    success: true,
    messages: `Favorite ${type} successfully found`,
    [favoritesArrayName]: foundFavorites,
  });
};

export const getFavoritesByType = ctrlWrapper(controller);
