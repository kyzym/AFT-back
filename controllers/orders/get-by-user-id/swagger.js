import { roles } from '#constants/roles.js';
import {
  errorMessage,
  errorResponse,
  idParameter,
  pagePaginationParameters,
} from '#controllers/swagger.common.js';

export const getOrderByUserIdSwagger = {
  paths: {
    '/orders/by-courier/{userId}': {
      get: {
        tags: ['Orders'],
        summary: 'Get orders by user id',
        security: [{ bearerAuth: [roles.USER] }],
        description: 'Returns a list of all user orders',
        parameters: [
          ...pagePaginationParameters,
          idParameter('userId', 'User id'),
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
