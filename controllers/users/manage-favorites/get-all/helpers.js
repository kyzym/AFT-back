import { getRating } from '#helpers/getRating.js';
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
    const favoriteChefs = await Chef.aggregate([
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
    const promises = favoriteChefs.map((chef) => getRating(chef._id));
    const ratings = await Promise.all(promises);
    favoriteChefs.map((chef, index) => {
      chef.rating = ratings[index];
      return chef;
    });
    return favoriteChefs;
  }
};
