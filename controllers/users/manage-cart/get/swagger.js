import {
  errorResponse,
  errorMessage,
  errorName,
} from '#controllers/swagger.common.js';
import { roles } from '#constants/index.js';
import { DefaultErrorResponse } from '#controllers/users/swaggerCommon.js';

export const getUserCartSwagger = {
  paths: {
    '/users/{userId}/cart': {
      get: {
        tags: ['Users'],
        summary: 'Get user cart',
        description: 'Get the user cart',
        security: [{ cookieAuth: [roles.USER], refreshToken: [] }],
        operationId: 'getUserCart',
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
            description: 'Successful response with user cart',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/GetUserCartResponse',
                },
              },
            },
          },
          401: {
            ...errorResponse(errorName[401], errorMessage[401]),
          },
          403: DefaultErrorResponse[403],
          404: {
            ...errorResponse(
              errorName[404],
              'Invalid token: no user found from the token'
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
