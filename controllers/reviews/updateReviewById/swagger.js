import { roles } from '#constants/roles.js';

export const updateReviewById = {
  tags: [{ name: 'Reviews', description: 'The reviews managing API' }],
  paths: {
    '/reviews/{reviewId}': {
      put: {
        summary: 'Update a review by review ID',
        description: 'Update a review by review ID',
        operationId: 'updateReviewById',
        tags: ['Reviews'],
        security: [{ bearerAuth: [roles.USER] }],

        parameters: [
          {
            in: 'path',
            name: 'reviewId',
            required: true,
            schema: { type: 'string' },
            description: 'Review ID to update the review for',
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
            description: 'Review updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      description: 'Review updated successfully',
                    },
                  },
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
