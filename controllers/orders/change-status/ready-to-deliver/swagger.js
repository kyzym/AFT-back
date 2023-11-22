import { roles } from '#constants/roles.js';

import { createChangeStatusSwagger } from '../swagger.common.js';

export const readyToDeliveryOrderSwagger = {
  paths: {
    '/orders/{orderId}/status/ready-to-delivery': {
      ...createChangeStatusSwagger({
        summary: 'Change order status to ready to delivery',
        roles: [roles.CHEF],
        responseMessage: 'Order ready to delivery',
      }),
    },
  },
};
