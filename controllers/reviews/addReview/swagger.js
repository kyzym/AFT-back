export const addReview = {
  paths: {
    '/api/reviews': {
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
  components: {
    schemas: {
      AddReview: {
        type: 'object',
        required: ['owner', 'dish', 'rating', 'review'],
        properties: {
          owner: {
            type: 'string',
            description: 'The id of the review owner',
            format: 'uuid',
          },
          dish: {
            type: 'string',
            description: 'The id of the reviewed dish',
            format: 'uuid',
          },
          rating: {
            type: 'integer',
            description: 'The rating given to the dish (integer value)',
            minimum: 1,
            maximum: 5,
          },
          review: {
            type: 'string',
            description: 'The review text',
            maxLength: 400,
          },
        },
      },
    },
  },
};
