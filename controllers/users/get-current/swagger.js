import { roles } from '#constants/index.js';
import { DefaultErrorResponse } from '#controllers/users/swaggerCommon.js';

export const getCurrentUserSwagger = {
  paths: {
    '/users/current-user': {
      get: {
        tags: ['Users'],
        summary: 'Get user by token',
        description: 'Returns information about the current user',
        security: [{ cookieAuth: [roles.USER], refreshToken: [] }],
        operationId: 'getCurrentUser',
        responses: {
          200: {
            description:
              "Successful response with the current user's information",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/GetOneUserResponse',
                },
              },
            },
          },
          401: DefaultErrorResponse[401],
          404: DefaultErrorResponse[404],
          500: DefaultErrorResponse[500],
        },
      },
    },
  },
};
