export const createUser = {
  paths: {
    '/users': {
      post: {
        tags: ['Users'],
        summary: 'Create a new user',
        description: 'Create a new user with given role',
        operationId: 'createUser',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/NewUser',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User created successfully',
          },
          400: {
            description: 'Bad Request',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      NewUser: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
            format: 'email',
          },
          role: {
            type: 'string',
            enum: ['admin', 'chef', 'user', 'delivery'],
          },
        },
        required: ['name', 'email', 'role'],
      },
    },
  },
};
