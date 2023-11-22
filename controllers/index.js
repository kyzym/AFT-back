import ordersRouter from './orders/index.js';
export { swaggerControllers } from './swagger.js';
import { createDish } from './dishes/createDish/index.js';
import { deleteDish } from './dishes/deleteDish/index.js';
import { getDish } from './dishes/getDish/index.js';
import { getDishes } from './dishes/getDishes/index.js';
import { getDishesByChef } from './dishes/getDishesByChef/index.js';
import { getOwnDishes } from './dishes/getOwnDishes/index.js';
import { getPopularDishes } from './dishes/getPopularDishes/index.js';
import { getRandomDish } from './dishes/getRandomDish/index.js';
import { updateDish } from './dishes/updateDish/index.js';
import { updateDishBlockedStatus } from './dishes/updateDishBlockedStatus/index.js';
import {
  addIngredient,
  updateIngredient,
  deleteIngredientById,
  getAllIngredients,
} from './ingredients/index.js';

import {
  addReview,
  deleteReviewById,
  getAllReviews,
  getReviewsByDishId,
  getReviewsByChefId,
  updateReviewById,
} from './reviews/index.js';

export const dishControllers = {
  createDish,
  deleteDish,
  getDish,
  getDishes,
  getDishesByChef,
  getOwnDishes,
  getPopularDishes,
  getRandomDish,
  updateDish,
  updateDishBlockedStatus,
};
export const reviewControllers = {
  addReview,
  deleteReviewById,
  getAllReviews,
  getReviewsByDishId,
  getReviewsByChefId,
  updateReviewById,
};

export const ingredientControllers = {
  addIngredient,
  deleteIngredientById,
  getAllIngredients,
  updateIngredient,
};

export const routes = (app) => {
  app.use('/api/orders', ordersRouter);
};

export { chefControllers } from './chefs/index.js';
