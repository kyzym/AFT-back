// import { validate } from '../../../middlewares/index.js';

// import { addIngredientSchema } from '../../../models/ingredient/ingredient.validation.js';

import { Ingredient } from '../../../models/ingredient/Ingredient.model.js';
import { NotFoundError } from '../../../helpers/errors.js';
import { ctrlWrapper } from '../../../middlewares/ctrlWrapper.js';

const addIngredientController = async (req, res) => {
  console.log('req:', req.body);
  const ingredient = await Ingredient.create(req.body);
  if (!ingredient) {
    throw new NotFoundError('Not found');
  }
  res.status(201).json({ message: 'Ingredient created successfully' });
};

export const addIngredient = (router) => {
  router.post(
    '/',
    // add authenticate middleware
    // authenticate,
    // validate(addIngredientSchema),
    ctrlWrapper(addIngredientController)
  );
};
