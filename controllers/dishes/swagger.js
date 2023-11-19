import { createDishSwagger } from './createDish/swagger.js';
import { deleteDishSwagger } from './deleteDish/swagger.js';

export const dishesSwagger = {
  paths: {
    ...createDishSwagger,
    ...deleteDishSwagger,
  },
  components: {
    schemas: {
      //
    },
  },
};
