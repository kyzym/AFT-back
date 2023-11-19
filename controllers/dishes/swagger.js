import { createDishSwagger } from './createDish/swagger.js';
import { deleteDishSwagger } from './deleteDish/swagger.js';
import { DishSchema, ErrorResponseSchema } from './swaggerDishesComponents.js';

export const dishesSwagger = {
  paths: {
    ...createDishSwagger,
    ...deleteDishSwagger,
  },
  components: {
    schemas: {
      ErrorResponse: ErrorResponseSchema,
      Dish: DishSchema,
    },
  },
};
