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

export * as reviewControllers from './reviews/index.js';
export * as ingredientControllers from './ingredients/index.js';
export * as orderControllers from './orders/index.js';
