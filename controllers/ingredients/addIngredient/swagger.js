export const addIngredient = {
  paths: {
    '/ingredients': {
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
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'Review created successfully',
              },
            },
          },
          401: {
            description: 'Unauthorized - Missing or invalid token',
          },
          403: {
            description:
              "Forbidden - User doesn't have permission to delete this review",
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
  tags: [
    {
      name: 'Ingredients',
      description: 'The ingredients managing API',
    },
  ],
};
