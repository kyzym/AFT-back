export const updateReviewById = {
  components: {
    schemas: {
      ReviewUpdate: {
        type: 'object',
        properties: {
          rating: {
            type: 'integer',
            format: 'int32',
            description: 'The updated rating for the dish',
          },
          review: { type: 'string', description: 'The updated review text' },
        },
        required: ['rating', 'review'],
      },
      ReviewResponse: {
        type: 'object',
        properties: {
          status: { type: 'string', description: 'The status of the response' },
          code: { type: 'integer', description: 'The HTTP status code' },
          data: { $ref: '#/components/schemas/Review' },
        },
      },
    },
  },
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
                $ref: '#/components/schemas/ReviewUpdate',
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
                  $ref: '#/components/schemas/ReviewResponse',
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
