import { addIngredient } from './addIngredient/swagger.js';

export const ingredientsSwagger = {
  paths: {
    '/api/ingredients': {
      ...addIngredient.paths['/api/ingredients'],
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
