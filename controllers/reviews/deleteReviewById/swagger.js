export const deleteReview = {
  paths: {
    '/reviews/{reviewId}': {
      delete: {
        summary: 'Delete a review by ID',
        description: 'Delete a review by ID',
        operationId: 'deleteReview',
        tags: ['Reviews'],
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'reviewId',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'ID of the review to delete',
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
        responses: {
          204: {
            description: 'Review deleted successfully',
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

  tags: [
    {
      name: 'Reviews',
      description: 'The reviews managing API',
    },
  ],
};
