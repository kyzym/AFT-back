import { ForbiddenError, NotFoundError } from '../../../helpers/errors.js';
import { Dish } from '../../../models/index.js';

export const updateDish = async (req, res) => {
  const { dishId } = req.params;
  const updateData = req.body;
  const chefId = req.roleIds.chef;

  if ('isBlocked' in updateData) {
    throw new ForbiddenError(
      "You are not allowed to change the 'isBlocked' field"
    );
  }

  const dish = await Dish.findById(dishId);
  if (!dish) {
    throw new NotFoundError('Dish not found');
  }

  if (dish.owner.toString() !== chefId) {
    throw new ForbiddenError('You are not allowed to update this dish');
  }

  const updatedDish = await Dish.findByIdAndUpdate(dishId, updateData, {
    new: true,
  });

  res.status(200).json(updatedDish);
};
