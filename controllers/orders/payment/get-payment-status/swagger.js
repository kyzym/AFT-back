import { paymentStatus } from '#constants/paymentStatus.js';
import { roles } from '#constants/roles.js';
import {
  errorMessage,
  errorResponse,
  pageIdParameter,
} from '#controllers/swagger.common.js';

export const getOrderPaymentStatusSwagger = {
  paths: {
    '/orders/payment/{orderId}': {
      get: {
        tags: ['Orders'],
        summary: 'Get payment status by order id',
        security: [{ bearerAuth: [roles.USER] }],
        description: 'Get payment status by order id',
        parameters: [pageIdParameter('orderId', 'Order id')],
        responses: {
          200: {
            description: `Return payment status. If status is "${paymentStatus.PENDING}" return payment data`,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/GetOrderPaymentStatusResponse',
                },
              },
            },
          },
          400: {
            ...errorResponse(errorMessage[400]),
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
