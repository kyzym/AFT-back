import { roles } from '#constants/index.js';
import {
  errorMessage,
  errorName,
  errorResponse,
  pageIdParameter,
} from '#controllers/swagger.common.js';

export const getOneUserSwagger = {
  paths: {
    '/users/{userId}': {
      get: {
        tags: ['Users'],
        summary: 'Get a user by id',
        description: 'Returns information about a single user',
        security: [{ bearerAuth: [roles.USER, roles.ADMIN] }],
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
          500: {
            ...errorResponse(errorName[500], errorMessage[500]),
          },
        },
      },
    },
  },
};
