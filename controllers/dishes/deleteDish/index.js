import { Dish } from '../../../models/index.js';

export const deleteDish = async (req, res) => {
  await Dish.findByIdAndDelete(req.params.dishId);

  res.status(200).json({ message: 'Dish processed for deletion' });
};
