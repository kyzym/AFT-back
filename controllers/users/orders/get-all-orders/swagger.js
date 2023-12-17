import { roles } from '#constants/roles.js';
import {
  errorMessage,
  errorResponse,
  pageIdParameter,
  pagePaginationParameters,
} from '#controllers/swagger.common.js';

export const getUserOrdersSwagger = {
  paths: {
    '/users/{userId}/orders': {
      get: {
        tags: ['Users'],
        summary: 'Get list of user orders',
        security: [{ cookieAuth: [roles.USER], refreshToken: [] }],
        description: 'Returns a list of user orders',
        parameters: [
          pageIdParameter('userId', 'User id parameter'),
          ...pagePaginationParameters,
        ],
        responses: {
          200: {
            description: 'A list of user orders',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/GetAllOrdersResponse' },
              },
            },
          },
          401: {
            ...errorResponse(errorMessage[401]),
          },
          403: {
            ...errorResponse(errorMessage[403]),
          },
          500: {
            ...errorResponse(errorMessage[500]),
          },
        },
      },
    },
  },
};
