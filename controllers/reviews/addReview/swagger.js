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
      AddReview: {
        type: 'object',
        required: ['id', 'owner', 'dish', 'rating', 'review'],
        properties: {
          //   id: {
          //     type: 'string',
          //     description: 'The auto-generated id of the review',
          //     format: 'uuid',
          //   },
          owner: {
            type: 'string',
            description: 'The id of the review owner',
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
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Bearer token for authentication',
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
