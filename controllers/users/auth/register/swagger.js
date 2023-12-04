import {
  errorResponse,
  errorMessage,
  errorName,
} from '#controllers/swagger.common.js';
import { SwaggerSchemas } from '#controllers/users/swaggerCommon.js';
import _ from 'lodash';

export const registerUserSwagger = {
  paths: {
    '/users/register': {
      post: {
        tags: ['Users'],
        summary: 'Register user',
        description: 'Register a new user and generate access token',
        operationId: 'registerUser',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  ..._.pick(SwaggerSchemas.UserSchema.properties, [
                    'firstName',
                    'lastName',
                    'email',
                  ]),
                  password: {
                    type: 'string',
                    description: 'The password of the user',
                  },
                },
                required: ['email', 'password', 'firstName', 'lastName'],
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Successful registration response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RegisterUserResponse',
                },
              },
            },
          },
          400: {
            description: errorMessage[400],
            content: {
              'application/json': {
                example: {
                  success: false,
                  message: errorMessage[400],
                  errors: {
                    email: '"email" must be a valid email',
                    password:
                      'Password should have at least one lowercase letter, one uppercase letter, one digit, and one special character',
                  },
                },
              },
            },
          },
          409: {
            ...errorResponse(
              errorName[409],
              'User with this email already exists'
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
