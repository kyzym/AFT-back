import { NotFoundError } from '../../../helpers/errors.js';
import { Dish } from '../../../models/index.js';

export const deleteDish = async (req, res) => {
  const dish = await Dish.findByIdAndDelete(req.params.dishId);

  if (!dish) {
    throw new NotFoundError('Dish not found');
  }
  res.status(200).json({ message: 'Dish deleted successfully' });
};
