import { Dish } from '../../../models/index.js';

export const getDishes = async (_req, res) => {
  const dishes = await Dish.find({});

  res.status(200).json(dishes);
};
