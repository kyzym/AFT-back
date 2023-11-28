export const getReviewsByChefId = {
  tags: [{ name: 'Reviews', description: 'The reviews managing API' }],
  paths: {
    '/reviews/by-chef/{chefId}': {
      get: {
        summary: 'Get reviews by chef ID',
        tags: ['Reviews'],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'chefId',
            required: true,
            schema: { type: 'string' },
            description: 'Chef ID to get reviews for',
          },
          {
            in: 'header',
            name: 'Authorization',
            required: true,
            schema: { type: 'string' },
            description: 'Bearer token for authentication',
          },
        ],
        responses: {
          200: {
            description: 'A list of reviews for the specified chef',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ReviewByChefIdOrDishId',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized - Missing or invalid token',
          },
          403: {
            description:
              "Forbidden - User doesn't have permission to access this review",
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
      ReviewByChefId: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The auto-generated id of the review',
            format: 'uuid',
          },
          owner: {
            type: 'string',
            description: 'The id of the review owner',
          },
          dish: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'The id of the reviewed dish',
                format: 'uuid',
              },
              owner: {
                type: 'string',
                description: 'The id of the chef of the reviewed dish',
                format: 'uuid',
              },
            },
            description: 'The reviewed dish details',
          },
          rating: {
            type: 'integer',
            description: 'The rating given to the dish (integer value)',
          },
          review: {
            type: 'string',
            description: 'The review text',
          },
        },
      },
    },
  },
};
