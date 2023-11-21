export const updateIngredient = {
  paths: {
    '/api/ingredients/{ingredientId}': {
      put: {
        summary: 'Update ingredient',
        description: 'Update ingredient',
        operationId: 'updateIngredient',
        tags: ['Ingredients'],
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'ingredientId',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'ID of the ingredient to delete',
          },
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
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Ingredient',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'The ingredient was successfully updated.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      description: 'Ingredient updated successfully',
                    },
                  },
                },
              },
            },
          },
          401: {
            description: 'Unauthorized - Missing or invalid token',
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
