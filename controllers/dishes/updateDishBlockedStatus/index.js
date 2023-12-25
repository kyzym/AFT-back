import { Dish } from '#models/index.js';
import { NotFoundError } from '#helpers/errors.js';

export const updateDishBlockedStatus = async (req, res) => {
  const { dishId } = req.params;
  const { isBlocked } = req.body;

  const updatedDish = await Dish.findByIdAndUpdate(
    dishId,
    { isBlocked },
    { new: true }
  );

  if (!updatedDish) {
    throw new NotFoundError('Dish not found');
  }

  res
    .status(200)
    .json({ message: `Dish blocked status updated to ${isBlocked}` });
};
