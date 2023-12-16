import { DefaultErrorResponse } from '#controllers/users/swaggerCommon.js';
import { roles, accountStatus } from '#constants/index.js';

export const changeUserStatusSwagger = {
  paths: {
    '/users/{userId}/change-status': {
      patch: {
        tags: ['Users'],
        summary: 'Change user status',
        description: 'Updates the account status of a single user',
        security: [{ cookieAuth: [roles.ADMIN], refreshToken: [] }],
        operationId: 'changeUserStatus',
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
          description: 'Updated account status information',
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  accountStatus: {
                    type: 'string',
                    enum: [accountStatus.ACTIVE, accountStatus.BLOCKED],
                    description: 'The updated account status of the user',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Successful response with updated user account status',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', default: true },
                    message: {
                      type: 'string',
                      example: "User account status updated successfully'",
                    },
                    user: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          format: 'objectId',
                          example: '656243224ad81407d33dd415',
                        },
                        accountStatus: {
                          type: 'string',
                          enum: [accountStatus.ACTIVE, accountStatus.BLOCKED],
                          example: 'blocked',
                        },
                      },
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
