import { Ingredient } from '#models/ingredient/Ingredient.model.js';

export const addIngredient = async (req, res) => {
  await Ingredient.create(req.body);
  res.status(201).json({ message: 'Ingredient created successfully' });
};
