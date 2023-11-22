import { roles } from '#constants/roles.js';
import {
  errorMessage,
  errorResponse,
  pageIdParameter,
  pageFilterParameter,
  pagePaginationParameters,
  pageSortParameter,
} from '#controllers/swagger.common.js';

export const getOrdersByUserIdSwagger = {
  paths: {
    '/orders/by-user/{userId}': {
      get: {
        tags: ['Orders'],
        summary: 'Get orders by user id',
        security: [{ bearerAuth: [roles.USER, roles.ADMIN] }],
        description: 'Returns a list of all user orders',
        parameters: [
          pageIdParameter('userId', 'User id'),
          ...pagePaginationParameters,
          ...pageFilterParameter,
          ...pageSortParameter,
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
