import { Dish } from '../../../models/index.js';

export const getDishesByChef = async (req, res) => {
  const query = {};

  if (req.query.chef) {
    query.owner = req.query.chef;
  }

  const dishes = await Dish.find(query);

  res.status(200).json(dishes);
};
