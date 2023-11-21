export const addIngredient = {
  paths: {
    '/api/ingredients': {
      post: {
        summary: 'Create a new ingredient',
        description: 'Create a new ingredient',
        operationId: 'addIngredient',
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
