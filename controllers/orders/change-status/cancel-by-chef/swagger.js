import { roles } from '#constants/roles.js';

import { createChangeStatusSwagger } from '../swagger.common.js';

export const cancelOrderByChefSwagger = {
  paths: {
    '/orders/{orderId}/status/cancel-by-chef': {
      ...createChangeStatusSwagger({
        summary: 'Change order status to canceled by chef',
        roles: [roles.CHEF],
        responseMessage: 'Order canceled by chef',
      }),
    },
  },
};
