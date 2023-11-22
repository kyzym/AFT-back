import { roles } from '#constants/roles.js';
import {
  errorMessage,
  errorResponse,
  pageIdParameter,
} from '#controllers/swagger.common.js';

export const getOrderByIdSwagger = {
  paths: {
    '/orders/{orderId}': {
      get: {
        tags: ['Orders'],
        summary: 'Get order info by id',
        security: [{ bearerAuth: [roles.USER, roles.ADMIN] }],
        description: 'Returns a order information',
        parameters: [pageIdParameter('orderId', 'Order id')],
        responses: {
          200: {
            description: 'Order information',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/GetOrderByIdResponse' },
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
