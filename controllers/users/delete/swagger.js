import { DefaultErrorResponse } from '#controllers/users/swaggerCommon.js';
import { roles } from '#constants/index.js';

export const deleteUserSwagger = {
  paths: {
    '/users/{userId}': {
      delete: {
        tags: ['Users'],
        summary: 'Delete user by id',
        description: 'Deletes a user account and its associated roles',
        security: [{ cookieAuth: [roles.USER], refreshToken: [] }],
        operationId: 'deleteUser',
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
        responses: {
          200: {
            description: 'Successful response indicating user deletion',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', default: true },
                    message: {
                      type: 'string',
                      example:
                        'User account with ID 656243bb4ad81407d33dd425 and associated roles deleted successfully',
                    },
                  },
                },
              },
            },
          },
          400: DefaultErrorResponse[400],
          401: DefaultErrorResponse[401],
          403: DefaultErrorResponse[403],
          404: DefaultErrorResponse[404],
          500: DefaultErrorResponse[500],
        },
      },
    },
  },
};
