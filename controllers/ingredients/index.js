import { Router } from 'express';
import { addIngredient } from './addIngredient/addIngredient';

const ingredientsRouter = Router();

addIngredient(ingredientsRouter);

export default ingredientsRouter;
