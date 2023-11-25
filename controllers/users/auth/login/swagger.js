import { errorMessage, errorResponse } from '#controllers/swagger.common.js';

export const loginUserSwagger = {
  paths: {
    '/users/login': {
      post: {
        tags: ['Users'],
        summary: 'User Login',
        description: 'Authenticate user and generate access token',
        operationId: 'loginUser',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                    description: 'User email',
                  },
                  password: {
                    type: 'string',
                    example: 'SecurePass_123',
                    description: 'User password',
                  },
                },
                required: ['email', 'password'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'A list of users',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LoginUserResponse',
                },
              },
            },
          },
          401: {
            ...errorResponse('Invalid email or password'),
          },
          403: {
            ...errorResponse('User has a blocked account'),
          },
          404: {
            ...errorResponse('User not found'),
          },
          500: {
            ...errorResponse(errorMessage[500]),
          },
        },
      },
    },
  },
};
