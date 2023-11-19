import { Dish } from '../../../models/index.js';

export const createDish = async (req, res) => {
  const ownerPlaceholder = '65520e1b49c89850ff8556ea';

  // const newDish = new Dish({ ...req.body, owner: req.user.id });
  const newDishData = {
    ...req.body,
    owner: ownerPlaceholder,
  };

  const newDish = new Dish(newDishData);
  await newDish.save();

  res.status(201).json(newDish);
};
