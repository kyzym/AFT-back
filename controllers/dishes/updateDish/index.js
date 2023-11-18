import { NotFoundError } from '../../../helpers/errors.js';
import { Dish } from '../../../models/index.js';

export const updateDish = async (req, res) => {
  const dish = await Dish.findByIdAndUpdate(req.params.dishId, req.body, {
    new: true,
  });

  if (!dish) {
    throw new NotFoundError('Dish not found');
  }

  res.status(200).json(dish);
};
