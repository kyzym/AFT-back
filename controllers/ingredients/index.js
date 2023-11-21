import { Router } from 'express';

import { deleteIngredientById } from './deleteIngredientById/deleteIngredientById.js';
import { getAllIngredients } from './getAllIngredients/getAllIngredients.js';
import { updateIngredient } from './updateIngredient/updateIngredient.js';
import { addIngredient } from './addIngredient/addIngredient.js';

const ingredientsRouter = Router();
console.log('ingredientsRouter:', ingredientsRouter);

addIngredient(ingredientsRouter);
deleteIngredientById(ingredientsRouter);
getAllIngredients(ingredientsRouter);
updateIngredient(ingredientsRouter);

export default ingredientsRouter;
