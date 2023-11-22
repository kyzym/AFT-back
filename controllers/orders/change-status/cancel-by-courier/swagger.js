import { roles } from '#constants/roles.js';

import { createChangeStatusSwagger } from '../swagger.common.js';

export const cancelOrderByCourierSwagger = {
  paths: {
    '/orders/{orderId}/status/cancel-by-courier': {
      ...createChangeStatusSwagger({
        summary: 'Change order status to canceled by courier',
        roles: [roles.COURIER],
        responseMessage: 'Order delivery canceled',
      }),
    },
  },
};
