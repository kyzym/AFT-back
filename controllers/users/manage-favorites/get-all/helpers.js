import Chef from '#models/chef/Chef.model.js';
import Dish from '#models/dish/dishModel.js';

export const getFavoritesFromDB = async (type, userFavoritesArray) => {
  if (type === 'dishes') {
    return await Dish.find({ _id: { $in: userFavoritesArray } })
      .select(
        'id name owner image description price category cuisine isAvailable'
      )
      .exec();
  } else if (type === 'chefs') {
    return await Chef.aggregate([
      { $match: { _id: { $in: userFavoritesArray } } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          _id: 1,
          avatar: 1,
          isAvailable: 1,
          firstName: '$user.firstName',
          lastName: '$user.lastName',
        },
      },
    ]);
  }
};

export const getFavoritesKeyByType = (type) => {
  return type === 'dishes' ? 'favoriteDishes' : 'favoriteChefs';
};
