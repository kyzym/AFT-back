import { Router } from 'express';
import { addIngredient } from './addIngredient/addIngredient';
import { deleteIngredientById } from './deleteIngredientById/deleteIngredientById';

const ingredientsRouter = Router();

addIngredient(ingredientsRouter);
deleteIngredientById(ingredientsRouter);

export default ingredientsRouter;
