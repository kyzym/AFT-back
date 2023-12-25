import { NotFoundError } from '#helpers/errors.js';
import { Ingredient } from '#models/ingredient/Ingredient.model.js';

export const deleteIngredientById = async (req, res) => {
  const { ingredientId } = req.params;

  const result = await Ingredient.findByIdAndDelete(ingredientId).exec();

  if (!result) {
    throw new NotFoundError('NotFound');
  }
  res.status(204).send();
};
