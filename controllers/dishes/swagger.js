import { createDishSwagger } from './createDish/swagger.js';
import { deleteDishSwagger } from './deleteDish/swagger.js';
import { getDishSwagger } from './getDish/swagger.js';
import { getDishesSwagger } from './getDishes/swagger.js';
import { getOwnDishesSwagger } from './getOwnDishes/swagger.js';
import { getPopularDishesSwagger } from './getPopularDishes/swagger.js';
import { getRandomDishSwagger } from './getRandomDish/swagger.js';
import { DishSchema } from './swaggerDishesComponents.js';
import { updateDishSwagger } from './updateDish/swagger.js';

const combinedDishesPaths = {
  '/dishes': {
    ...createDishSwagger['/dishes'],
    ...getDishesSwagger['/dishes'],
  },
  '/dishes/{dishId}': {
    ...getDishSwagger['/dishes/{dishId}'],
    ...deleteDishSwagger['/dishes/{dishId}'],
    ...updateDishSwagger['/dishes/{dishId}'],
  },
  '/dishes/own/{chefId}': { ...getOwnDishesSwagger['/dishes/own'] },
  '/dishes/popular': { ...getPopularDishesSwagger['/dishes/popular'] },
  '/dishes/random': { ...getRandomDishSwagger['/dishes/random'] },
};

export const dishesSwagger = {
  paths: {
    ...combinedDishesPaths,
  },
  components: {
    schemas: {
      Dish: DishSchema,
    },
  },
};
