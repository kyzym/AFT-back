import { errorResponse, errorMessage } from '#controllers/swagger.common.js';

export const registerUserSwagger = {
  paths: {
    '/users/register': {
      post: {
        tags: ['Users'],
        summary: 'User Registration',
        description: 'Register a new user and generate access token',
        operationId: 'registerUser',
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
                  firstName: {
                    type: 'string',
                    example: 'Nikolay',
                    description: 'User first name',
                  },
                  lastName: {
                    type: 'string',
                    example: 'Verstak',
                    description: 'User last name',
                  },
                },
                required: ['email', 'password', 'firstName', 'lastName'],
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User registration successful',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RegisterUserResponse',
                },
              },
            },
          },
          400: {
            description: 'Validation error',
            content: {
              'application/json': {
                example: {
                  success: false,
                  message: 'Validation error',
                  errors: {
                    email: '"email" must be a valid email',
                  },
                },
              },
            },
          },
          409: {
            ...errorResponse('User with this email already exists'),
          },
          500: {
            ...errorResponse(errorMessage[500]),
          },
        },
      },
    },
  },
};
