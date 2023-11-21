import { Dish } from '../../../models/index.js';
import { NotFoundError } from '../../../helpers/index.js';

export const getDish = async (req, res) => {
  const dish = await Dish.findById(req.params.dishId);

  if (!dish) {
    throw new NotFoundError('Dish not found');
  }

  res.status(200).json(dish);
};
