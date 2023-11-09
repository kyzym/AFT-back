import { getAllOrders } from './get-all/index.js';

export const ordersSwagger = {
  paths: {
    '/orders': {
      ...getAllOrders.paths['/orders'],
    },
  },
  components: {
    schemas: {
      ...getAllOrders.components.schemas,
    },
  },
};
