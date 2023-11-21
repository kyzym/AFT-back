import { Ingredient } from '../../../models/ingredient/Ingredient.model.js';
import { NotFoundError } from '../../../helpers/errors.js';

export const addIngredient = async (req, res) => {
  const ingredient = await Ingredient.create(req.body);
  if (!ingredient) {
    throw new NotFoundError('Not found');
  }
  res.status(201).json({ message: 'Ingredient created successfully' });
};
