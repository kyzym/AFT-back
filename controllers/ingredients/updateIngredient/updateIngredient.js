import { NotFoundError } from '../../../helpers/errors.js';
import { ctrlWrapper } from '../../../middlewares/ctrlWrapper.js';
// import { validate } from '../../../middlewares/validation.middleware.js';
import { Ingredient } from '../../../models/ingredient/Ingredient.model.js';
// import { addIngredientSchema } from '../../../models/ingredient/ingredient.validation.js';

export const updateIngredientController = async (req, res) => {
  const { ingredientId } = req.params;
  const result = await Ingredient.findByIdAndUpdate(ingredientId, req.body, {
    new: true,
  });

  if (!result) {
    throw new NotFoundError('Not found');
  }
  res.status(200).json({ message: 'The ingredient was successfully updated.' });
};

export const updateIngredient = (router) => {
  router.put(
    '/:ingredientId',
    // add authenticate middleware
    // authenticate,
    // isValidId('ingredientId'),
    // validate(addIngredientSchema),
    ctrlWrapper(updateIngredientController)
  );
};

// We need to check!!!!
//   authenticate,
//   isValidId,
//   validateBody(schemas.addSchema),
