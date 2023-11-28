export const addReview = {
  paths: {
    '/reviews': {
      post: {
        summary: 'Create a new review',
        description: 'Create a new review',
        operationId: 'addReview',
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
