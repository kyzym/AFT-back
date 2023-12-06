import { ForbiddenError } from '#helpers/errors.js';
import { Dish } from '../../../models/index.js';

export const deleteDish = async (req, res) => {
  const { dishId } = req.params;
  const userRoles = req.roleIds;
  const userId = req.roleIds.chef;

  const dish = await Dish.findById(dishId);

  if (!userRoles.admin && dish.owner.toString() !== userId) {
    throw new ForbiddenError('You are not allowed to delete this dish');
  }

  await Dish.findByIdAndDelete(dishId);

  res.status(200).json({ message: 'Dish processed for deletion' });
};
