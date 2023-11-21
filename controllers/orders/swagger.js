import { getAllOrdersSwagger } from './get-all/swagger.js';
import { getOrderByChefIdSwagger } from './get-by-chef-id/swagger.js';
import { getOrderByCourierIdSwagger } from './get-by-courier-id/swagger.js';
import { getOrderByUserIdSwagger } from './get-by-user-id/swagger.js';

export const ordersSwagger = {
  paths: {
    ...getAllOrdersSwagger.paths,
    ...getOrderByChefIdSwagger.paths,
    ...getOrderByCourierIdSwagger.paths,
    ...getOrderByUserIdSwagger.paths,
  },
  components: {
    schemas: {
      ...getAllOrdersSwagger.components.schemas,
    },
  },
};
