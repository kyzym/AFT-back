export const getAllIngredients = {
  paths: {
    '/api/ingredients': {
      get: {
        summary: 'Returns the list of all ingredients',
        description: 'Returns the list of all ingredients',
        operationId: 'getAllIngredients',
        tags: ['Ingredients'],
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            in: 'header',
            name: 'Authorization',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'Bearer token for authentication',
          },
        ],
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
            description: 'Review not found',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
  },
};
