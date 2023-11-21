import { NotFoundError } from '../../../helpers/errors.js';
import { ctrlWrapper } from '../../../middlewares/ctrlWrapper.js';
import { Ingredient } from '../../../models/ingredient/Ingredient.model.js';

export const deleteIngredientByIdController = async (req, res) => {
  const { ingredientId } = req.params;

  const result = await Ingredient.findByIdAndDelete(ingredientId).exec();

  if (!result) {
    throw new NotFoundError('NotFound');
  }
  res.status(204).send();
};

export const deleteIngredientById = (router) => {
  router.delete(
    '/:ingredientId',
    // add authenticate middleware
    // authenticate,
    // isValidId('ingredientId'),
    ctrlWrapper(deleteIngredientByIdController)
  );
};
