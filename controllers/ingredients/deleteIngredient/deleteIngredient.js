import { NotFoundError } from '../../../helpers/errors.js';
import { ctrlWrapper } from '../../../middlewares/ctrlWrapper.js';
import { Ingredient } from '../../../models/ingredient/Ingredient.model.js';

export const deleteIngredientById = async (req, res) => {
  const { ingredientId } = req.params;
  const result = await Ingredient.findByIdAndRemove(ingredientId).exec();

  if (!result) {
    throw NotFoundError(404, 'NotFound');
  }
  res.status(204);
};

export const deleteIngredient = (router) => {
  router.delete(
    '/:ingredientId',
    // add authenticate middleware
    // authenticate,
    // isValidId('ingredientId'),
    ctrlWrapper(deleteIngredientById)
  );
};
