import { roles } from '#constants/roles.js';

import { createChangeStatusSwagger } from '../swagger.common.js';

export const startCookingOrderSwagger = {
  paths: {
    '/orders/{orderId}/status/start-cooking': {
      ...createChangeStatusSwagger({
        summary: 'Change order status to start cooking',
        roles: [roles.CHEF],
        responseMessage: 'Order start cooking',
      }),
    },
  },
};
