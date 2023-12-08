import { NotFoundError } from '../../../helpers/index.js';
import { Dish } from '../../../models/index.js';

export const getDish = async (req, res) => {
  const dish = await Dish.findById(req.params.dishId)
    .populate({
      path: 'owner',
      select: 'id avatar',
      populate: {
        path: 'userId',
        select: 'firstName lastName avatar -_id',
      },
    })
    .populate({
      path: 'ingredients',
      select: 'name',
    });

  if (!dish) {
    throw new NotFoundError('Dish not found');
  }

  res.status(200).json(dish);
};
