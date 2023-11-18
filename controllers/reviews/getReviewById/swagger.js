export const getReviewById = {
  components: {
    schemas: {
      Review: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          owner: {
            type: 'string',
          },
          dish: {
            type: 'string',
          },
          rating: {
            type: 'number',
          },
          review: {
            type: 'string',
          },
        },
      },
    },
  },
  tags: [
    {
      name: 'Reviews',
      description: 'The reviews managing API',
    },
  ],
  paths: {
    '/reviews/{reviewId}': {
      get: {
        summary: 'Get a review by ID',
        tags: ['Reviews'],
        parameters: [
          {
            in: 'path',
            name: 'reviewId',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'ID of the review to retrieve',
          },
        ],
        responses: {
          200: {
            description: 'The review',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Review',
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
        security: [
          {
            BearerAuth: [],
          },
        ],
      },
    },
  },
};
