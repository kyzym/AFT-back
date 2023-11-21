import { NotFoundError } from '../../../helpers/errors.js';
import { Ingredient } from '../../../models/ingredient/Ingredient.model.js';
// import { validate } from '../../../middlewares/validation.middleware.js';
// import { addIngredientSchema } from '../../../models/ingredient/ingredient.validation.js';

export const updateIngredient = async (req, res) => {
  const { ingredientId } = req.params;
  const result = await Ingredient.findByIdAndUpdate(ingredientId, req.body, {
    new: true,
  });

  if (!result) {
    throw new NotFoundError('Not found');
  }
  res.status(200).json({ message: 'The ingredient was successfully updated.' });
};
