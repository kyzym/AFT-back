import { Dish } from '../../../models/index.js';

export const createDish = async (req, res) => {
  const ownerPlaceholder = '6557219bccbbbbc3695bc8b2';

  // const newDish = new Dish({ ...req.body, owner: req.user.id });
  const newDishData = {
    ...req.body,
    owner: ownerPlaceholder,
  };

  const newDish = new Dish(newDishData);
  await newDish.save();

  res.status(201).json({ message: 'Dish created successfully' });
};
