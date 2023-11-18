import { Dish } from '../../../models/index.js';

export const getOwnDishes = async (_req, res) => {
  const ownerPlaceholder = '65520e1b49c89850ff8556ea';
  // const dishes = await Dish.find({ owner: req.user._id });
  const dishes = await Dish.find({ owner: ownerPlaceholder });

  res.status(200).json(dishes);
};
