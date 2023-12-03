import {
  errorMessage,
  errorName,
  errorResponse,
} from '#controllers/swagger.common.js';

export const loginUserSwagger = {
  paths: {
    '/users/login': {
      post: {
        tags: ['Users'],
        summary: 'User login',
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
            description: 'Successful login response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LoginUserResponse',
                },
              },
            },
          },
          401: {
            ...errorResponse(errorName[401], 'Invalid email or password'),
          },
          403: {
            ...errorResponse(errorName[403], 'User has a blocked account'),
          },
          404: {
            ...errorResponse(
              errorName[404],
              'User with ID 656658933c6bdf0d02f71488 not found'
            ),
          },
          500: {
            ...errorResponse(errorName[500], errorMessage[500]),
          },
        },
      },
    },
  },
};
