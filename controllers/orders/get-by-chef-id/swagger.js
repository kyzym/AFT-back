import { roles } from '#constants/roles.js';
import {
  errorMessage,
  errorResponse,
  pageFilterParameter,
  pageIdParameter,
  pagePaginationParameters,
  pageSortParameter,
} from '#controllers/swagger.common.js';

export const getOrdersByChefIdSwagger = {
  paths: {
    '/orders/by-chef/{chefId}': {
      get: {
        tags: ['Orders'],
        summary: 'Get orders by chef id',
        security: [{ bearerAuth: [roles.CHEF, roles.ADMIN] }],
        description: 'Returns a list of all chef orders',
        parameters: [
          pageIdParameter('chefId', 'Chef id'),
          ...pagePaginationParameters,
          ...pageFilterParameter,
          ...pageSortParameter,
        ],
        responses: {
          200: {
            description: 'A list of chef orders',
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
