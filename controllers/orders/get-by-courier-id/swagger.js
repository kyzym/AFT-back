import { roles } from '#constants/roles.js';
import {
  errorMessage,
  errorResponse,
  pageFilterParameter,
  pageIdParameter,
  pagePaginationParameters,
  pageSortParameter,
} from '#controllers/swagger.common.js';

export const getOrdersByCourierIdSwagger = {
  paths: {
    '/orders/by-courier/{courierId}': {
      get: {
        tags: ['Orders'],
        summary: 'Get orders by courier id',
        security: [{ bearerAuth: [roles.COURIER] }],
        description: 'Returns a list of all courier orders',
        parameters: [
          pageIdParameter('courierId', 'Courier id'),
          ...pagePaginationParameters,
          ...pageFilterParameter,
          ...pageSortParameter,
        ],
        responses: {
          200: {
            description: 'A list of courier orders',
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
