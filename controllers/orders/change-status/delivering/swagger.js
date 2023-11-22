import { roles } from '#constants/roles.js';

import { createChangeStatusSwagger } from '../swagger.common.js';

export const deliveringOrderSwagger = {
  paths: {
    '/orders/{orderId}/status/delivering': {
      ...createChangeStatusSwagger({
        summary: 'Change order status to delivering',
        roles: [roles.COURIER],
        responseMessage: 'Order start delivering',
      }),
    },
  },
};
