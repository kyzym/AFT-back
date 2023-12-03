import { roles } from '#constants/roles.js';

export const addIngredient = {
  paths: {
    '/ingredients': {
      post: {
        summary: 'Create a new ingredient',
        description: 'Create a new ingredient',
        operationId: 'addIngredient',
        tags: ['Ingredients'],
        security: [{ bearerAuth: [roles.ADMIN] }],

        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Ingredient',
              },
              examples: {
                example1: {
                  value: {
                    name: 'Example Ingredient',
                  },
                  summary: 'Example of adding an ingredient',
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Successfully created a new ingredient',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      description: 'Ingredient created successfully',
                    },
                  },
                },
              },
            },
          },
          401: {
            description: 'Unauthorized - Missing or invalid token',
          },
          403: {
            description:
              "Forbidden - User doesn't have permission to add ingredients",
          },
          404: {
            description: 'Not found',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
  },
};
