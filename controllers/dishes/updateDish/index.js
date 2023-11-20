import { ForbiddenError, NotFoundError } from '../../../helpers/errors.js';
import { Dish } from '../../../models/index.js';

export const updateDish = async (req, res) => {
  const { dishId } = req.params;
  const updateData = req.body;

  if ('isBlocked' in updateData) {
    throw new ForbiddenError(
      "You are not allowed to change the 'isBlocked' field"
    );
  }

  const updatedDish = await Dish.findByIdAndUpdate(dishId, updateData, {
    new: true,
  });

  if (!updatedDish) {
    throw new NotFoundError('Dish not found');
  }

  res.status(200).json(updatedDish);
};
