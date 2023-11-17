export const deleteReview = {
  tags: [
    {
      name: 'Reviews',
      description: 'The reviews managing API',
    },
  ],
  paths: {
    '/reviews/:reviewId': {
      delete: {
        summary: 'Delete a review by ID',
        tags: ['Reviews'],
        security: [
          {
            BearerAuth: [], // Use the BearerAuth security scheme for authentication
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
  components: {
    schemas: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        description: 'Bearer token for authentication',
      },
    },
  },
  securityDefinitions: {
    BearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description:
        'Use Bearer authentication. Provide your JWT token in the format "Bearer {token}"',
    },
  },
};
