import { roles } from '#constants/index.js';
import { DefaultErrorResponse } from '#controllers/users/swaggerCommon.js';
import { pageIdParameter } from '#controllers/swagger.common.js';

export const getOneUserSwagger = {
  paths: {
    '/users/{userId}': {
      get: {
        tags: ['Users'],
        summary: 'Get user by id',
        description: 'Returns information about a single user',
        security: [{ cookieAuth: [roles.USER, roles.ADMIN], refreshToken: [] }],
        // security: [{ bearerAuth: [roles.USER, roles.ADMIN] }],
        operationId: 'getOneUser',
        parameters: [pageIdParameter('userId', 'ID of the user')],
        responses: {
          200: {
            description: "Successful response with the user's information",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/GetOneUserResponse',
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
