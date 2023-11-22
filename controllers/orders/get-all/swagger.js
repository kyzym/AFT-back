import {
  errorMessage,
  errorResponse,
  pagePaginationParameters,
} from '#controllers/swagger.common.js';

export const getAllOrdersSwagger = {
  paths: {
    '/orders': {
      get: {
        tags: ['Orders'],
        summary: 'Get list of all orders',
        security: [{ bearerAuth: [] }],
        description: 'Returns a list of all orders',
        parameters: [...pagePaginationParameters],
        responses: {
          200: {
            description: 'A list of orders',
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
