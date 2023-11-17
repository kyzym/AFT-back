import { getAllOrdersSwagger } from './get-all/swagger.js';

export const ordersSwagger = {
  paths: {
    '/orders': {
      ...getAllOrdersSwagger.paths['/orders'],
    },
  },
  components: {
    schemas: {
      ...getAllOrdersSwagger.components.schemas,
    },
  },
};
