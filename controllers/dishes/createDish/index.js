import { Dish } from '#models/index.js';

export const createDish = async (req, res) => {
  const chefId = req.roleIds.chef;

  const newDish = new Dish({ ...req.body, owner: chefId });

  await newDish.save();

  res.status(201).json({ message: 'Dish created successfully' });
};
