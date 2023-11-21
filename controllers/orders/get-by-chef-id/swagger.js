import { roles } from '#constants/roles.js';
import {
  errorMessage,
  errorResponse,
  idParameter,
  pagePaginationParameters,
} from '#controllers/swagger.common.js';

export const getOrderByChefIdSwagger = {
  paths: {
    '/orders/by-chef/{chefId}': {
      get: {
        tags: ['Orders'],
        summary: 'Get orders by chef id',
        security: [{ bearerAuth: [roles.CHEF] }],
        description: 'Returns a list of all chef orders',
        parameters: [
          ...pagePaginationParameters,
          idParameter('chefId', 'Chef id'),
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
