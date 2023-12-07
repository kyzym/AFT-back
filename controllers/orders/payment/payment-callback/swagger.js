import { errorMessage, errorResponse } from '#controllers/swagger.common.js';

export const paymentCallbackSwagger = {
  paths: {
    '/orders/payment/callback': {
      post: {
        tags: ['Orders'],
        summary: 'Callback for LiqPay response',
        description: 'Callback for LiqPay response',
        responses: {
          200: {
            description: 'Return success payment message',
          },
          500: {
            ...errorResponse(errorMessage[500]),
          },
        },
      },
    },
  },
};
