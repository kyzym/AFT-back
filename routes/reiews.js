import express from 'express';

import { ctrlWrapper, isValidId, joiValidation } from '../middlewares/index.js';
import { addIngredientSchema } from '../models/ingredient/ingredient.validation.js';
import { ingredientControllers } from '../controllers/index.js';

const router = express.Router();

router.post(
  '/',
  // add authenticate middleware
  // authenticate,
  // admin
  joiValidation(addIngredientSchema),
  ctrlWrapper(ingredientControllers.addIngredient)
);

router.get(
  '/',
  // isAuthenticated,
  ctrlWrapper(ingredientControllers.getAllIngredients)
);

router.put(
  '/:ingredientId',
  // add authenticate middleware
  // authenticate,
  // admin
  isValidId('ingredientId'),
  joiValidation(addIngredientSchema),
  ctrlWrapper(ingredientControllers.updateIngredient)
);

router.delete(
  '/:ingredientId',
  isValidId('dishId'),
  // isAuthenticated,
  // admin,
  ctrlWrapper(ingredientControllers.deleteIngredientById)
);

export default router;
