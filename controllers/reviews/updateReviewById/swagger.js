export const updateReviewById = {
  tags: [{ name: 'Reviews', description: 'The reviews managing API' }],
  paths: {
    '/reviews/{reviewId}': {
      put: {
        summary: 'Update a review by review ID',
        tags: ['Reviews'],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'reviewId',
            required: true,
            schema: { type: 'string' },
            description: 'Review ID to update the review for',
          },
          {
            in: 'header',
            name: 'Authorization',
            required: true,
            schema: { type: 'string' },
            description: 'Bearer token for authentication',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AddReview',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'The updated review',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Review',
                },
              },
            },
          },
          400: {
            description: 'Bad Request - Invalid input data',
          },
          401: {
            description: 'Unauthorized - Missing or invalid token',
          },
          404: {
            description: 'Not Found - Review or dish not found',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
  },
};
