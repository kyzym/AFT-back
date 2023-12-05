import { Dish } from '../../../models/index.js';

export const getOwnDishes = async (req, res) => {
  const chefId = req.roleIds['chef'];

  const dishes = await Dish.find({ owner: chefId });

  res.status(200).json(dishes);
};
