import { roles } from '#constants/roles.js';

import { createChangeStatusSwagger } from '../swagger.common.js';

export const completeOrderSwagger = {
  paths: {
    '/orders/{orderId}/status/complete': {
      ...createChangeStatusSwagger({
        summary: 'Change order status to complete',
        roles: [roles.COURIER],
        responseMessage: 'Order delivered and close',
      }),
    },
  },
};
