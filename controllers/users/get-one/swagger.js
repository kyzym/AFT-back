import { roles } from '#constants/index.js';
import {
  errorMessage,
  errorResponse,
  pageIdParameter,
} from '#controllers/swagger.common.js';

export const getOneUserSwagger = {
  paths: {
    '/users/{userId}': {
      get: {
        tags: ['Users'],
        summary: 'Get information about a single user',
        description: 'Returns information about a single user',
        security: [{ bearerAuth: [roles.USER, roles.ADMIN] }],
        operationId: 'getOneUser',
        parameters: [pageIdParameter('userId', 'ID of the user')],
        responses: {
          200: {
            description: 'User information',
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
              'Format of this ID: 655fb29f17fd123 is not correct'
            ),
          },
          401: {
            ...errorResponse(errorMessage[401]),
          },
          403: {
            ...errorResponse(errorMessage[403]),
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
