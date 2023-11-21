import { addIngredient } from './addIngredient/swagger.js';
import { deleteIngredientById } from './deleteIngredientById/swagger.js';
import { updateIngredient } from './updateIngredient/swagger.js';

export const ingredientsSwagger = {
  paths: {
    '/api/ingredients': {
      ...addIngredient.paths['/api/ingredients'],
    },
    '/api/ingredients/{ingredientId}': {
      ...deleteIngredientById.paths['/api/ingredients/{ingredientId}'],
      ...updateIngredient.paths['/api/ingredients/{ingredientId}'],
    },
  },

  components: {
    schemas: {
      Ingredient: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            description: 'The name of ingredient',
          },
        },
      },
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Bearer token for authentication',
      },
    },
  },
};
