import { roles } from '#constants/roles.js';

export const getAllIngredients = {
  paths: {
    '/ingredients': {
      get: {
        summary: 'Returns the list of all ingredients',
        description: 'Returns the list of all ingredients',
        operationId: 'getAllIngredients',
        tags: ['Ingredients'],

        security: [{ bearerAuth: [roles.USER] }],

        responses: {
          200: {
            description: 'The list of ingredients',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Ingredient',
                  },
                },
              },
            },
          },
          401: {
            description: 'Unauthorized - Missing or invalid token',
          },
          404: {
            description: 'Ingredient not found',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
  },
};
