import { HttpError } from '../../../helpers/HttpError.js';
import { ctrlWrapper } from '../../../middlewares/ctrlWrapper.js';
import { validate } from '../../../middlewares/validation.middleware.js';
import { Ingredient } from '../../../models/ingredient/Ingredient.model.js';
import { addIngredientSchema } from '../../../models/ingredient/ingredient.validation.js';

export const deleteIngredientById = async (req, res) => {
  const { ingredientId } = req.params;
  const result = await Ingredient.findByIdAndRemove(ingredientId).exec();

  if (!result) {
    throw HttpError(404, 'NotFound');
  }
  res.status(204);
};

export const deleteIngredient = (router) => {
  // TODO: add auth validation (access: user)
  router.delete(
    '/:ingredientId',
    // add authenticate middleware
    // authenticate,
    // isValidId('ingredientId'),
    validate(addIngredientSchema),
    ctrlWrapper(deleteIngredientById)
  );
};
