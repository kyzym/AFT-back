import { createDish } from './createDish/index.js';
import { deleteDish } from './deleteDish/index.js';
import { getDish } from './getDish/index.js';
import { getDishes } from './getDishes/index.js';
import { getOwnDishes } from './getOwnDishes/index.js';
import { getPopularDishes } from './getPopularDishes/index.js';
import { getRandomDish } from './getRandomDish/index.js';
import { updateDish } from './updateDish/index.js';
import { updateDishBlockedStatus } from './updateDishBlockedStatus/index.js';

export const dishControllers = {
  createDish,
  deleteDish,
  getDish,
  getDishes,

  getOwnDishes,
  getPopularDishes,
  getRandomDish,
  updateDish,
  updateDishBlockedStatus,
};
