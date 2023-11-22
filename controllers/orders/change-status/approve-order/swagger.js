import { roles } from '#constants/roles.js';

import { createChangeStatusSwagger } from '../swagger.common.js';

export const approveOrderSwagger = {
  paths: {
    '/orders/{orderId}/status/approve-order': {
      ...createChangeStatusSwagger({
        summary: 'Change order status to approved',
        roles: [roles.CHEF],
        responseMessage: 'Order approved',
      }),
    },
  },
};
