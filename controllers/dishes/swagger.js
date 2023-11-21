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
  '/api/dishes': {
    ...createDishSwagger['/api/dishes'],
    ...getDishesSwagger['/api/dishes'],
  },
  '/api/dishes/{dishId}': {
    ...getDishSwagger['/api/dishes/{dishId}'],
    ...deleteDishSwagger['/api/dishes/{dishId}'],
    ...updateDishSwagger['/api/dishes/{dishId}'],
  },
  '/api/dishes/own': { ...getOwnDishesSwagger['/api/dishes/own'] },
  '/api/dishes/popular': { ...getPopularDishesSwagger['/api/dishes/popular'] },
  '/api/dishes/random': { ...getRandomDishSwagger['/api/dishes/random'] },
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
