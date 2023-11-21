import { ctrlWrapper } from '../../../middlewares/ctrlWrapper.js';
import { Ingredient } from '../../../models/ingredient/Ingredient.model.js';

const getAllIngredientsController = async (req, res) => {
  const ingredients = await Ingredient.find({}, '-createdAt -updatedAt').exec();
  res.status(200).json(ingredients);
};

export const getAllIngredients = (router) => {
  router.get(
    '/',
    // add authenticate middleware
    // authenticate,);
    ctrlWrapper(getAllIngredientsController)
  );
};
