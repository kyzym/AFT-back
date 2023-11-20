import { ctrlWrapper } from '../../../middlewares/index.js';
import validate from '../../../middlewares/index.js';

import { addIngredientSchema } from '../../../models/ingredient/ingredient.validation.js';

import { Ingredient } from '../../../models/ingredient/Ingredient.model';
import { NotFoundError } from '../../../helpers/errors.js';

export const addIngredientController = async (req, res) => {
  const ingredient = await Ingredient.create(req.body);
  if (!ingredient) {
    throw new NotFoundError(404, 'Not found');
  }
  res.status(201).json({ message: 'Ingredient created successfully' });
};

export const addIngredient = (router) => {
  // TODO: add auth validation (access: user)
  router.post(
    '/',
    // add authenticate middleware
    // authenticate,
    validate(addIngredientSchema),
    ctrlWrapper(addIngredientController)
  );
};
