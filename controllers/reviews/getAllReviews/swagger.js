export const getAllReviews = {
  paths: {
    '/reviews': {
      get: {
        tags: ['Reviews'],
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
        summary: 'Returns the list of all reviews',
        description: 'Returns the list of all reviews',
        operationId: 'getAllReviews',
        responses: {
          200: {
            description: 'The list of reviews',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Review',
                  },
                },
              },
            },
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
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Bearer token for authentication',
      },
      Review: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          owner: {
            type: 'string',
            format: 'uuid',
          },
          dish: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              chef: {
                type: 'string',
                format: 'uuid',
              },
            },
            required: ['name', 'chef'],
          },
          rating: {
            type: 'integer',
          },
          review: {
            type: 'string',
          },
        },
      },
    },
  },
};
