import _ from 'lodash';
import {
  errorResponse,
  errorMessage,
  errorName,
} from '#controllers/swagger.common.js';
import { roles } from '#constants/roles.js';
import { UserSchema } from '../swaggerCommon.js';

export const updateUserSwagger = {
  paths: {
    '/users/{userId}': {
      patch: {
        tags: ['Users'],
        summary: 'Update a user by id',
        description: 'Updates information about a single user',
        security: [{ bearerAuth: [roles.USER] }],
        operationId: 'updateUser',
        parameters: [
          {
            name: 'userId',
            in: 'path',
            description: 'ID of the user',
            required: true,
            schema: {
              type: 'string',
              format: 'objectId',
            },
          },
        ],
        requestBody: {
          description: 'Updated user information',
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  ..._.pick(UserSchema.properties, [
                    'firstName',
                    'lastName',
                    'email',
                    'avatar',
                    'address',
                    'phoneNumber',
                  ]),
                  password: {
                    type: 'string',
                    description: 'The password of the user',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Successful response with updated user information',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/GetOneUserResponse',
                },
              },
            },
          },
          400: {
            ...errorResponse(
              errorMessage[400],
              'Format of this ID: 655fb29f17fd123 is not correct'
            ),
          },
          401: {
            ...errorResponse(errorName[401], errorMessage[401]),
          },
          403: {
            ...errorResponse(errorName[403], errorMessage[403]),
          },
          404: {
            ...errorResponse(errorName[404], 'User not found'),
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
