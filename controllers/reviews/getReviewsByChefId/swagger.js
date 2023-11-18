export const getReviewsByChefId = {
  components: {
    schemas: {
      Review: {
        type: 'object',
        required: ['_id', 'owner', 'dish', 'rating', 'review'],
        properties: {
          _id: {
            type: 'string',
            description: 'The auto-generated id of the review',
          },
          owner: { type: 'string', description: 'The id of the review owner' },
          dish: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'The name of the reviewed dish',
              },
              chef: {
                type: 'string',
                description: 'The id of the chef of the reviewed dish',
              },
            },
            description: 'The reviewed dish details',
          },
          rating: {
            type: 'integer',
            format: 'int32',
            description: 'The rating given to the dish (integer value)',
          },
          review: { type: 'string', description: 'The review text' },
        },
      },
    },
  },
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
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Review',
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
};
