import {
  AddressSchema,
  CoordinateSchema,
} from '#controllers/swagger.common.js';
import { createOrderSwagger } from './create/swagger.js';
import { getAllOrdersSwagger } from './get-all/swagger.js';
import { getOrdersByChefIdSwagger } from './get-by-chef-id/swagger.js';
import { getOrdersByCourierIdSwagger } from './get-by-courier-id/swagger.js';
import { getOrderByIdSwagger } from './get-by-id/swagger.js';
import { getOrdersByUserIdSwagger } from './get-by-user-id/swagger.js';
import {
  CreateOrderResponse,
  GetAllOrdersResponse,
  GetOrderByIdResponse,
  OrderItemSchema,
  OrderSchema,
  ShortDishSchema,
} from './swagger.common.js';

export const ordersSwagger = {
  paths: {
    '/orders': {
      ...getAllOrdersSwagger.paths['/orders'],
      ...createOrderSwagger.paths['/orders'],
    },
    ...getOrdersByChefIdSwagger.paths,
    ...getOrdersByCourierIdSwagger.paths,
    ...getOrdersByUserIdSwagger.paths,
    ...getOrderByIdSwagger.paths,
  },
  components: {
    schemas: {
      ShortDishSchema,
      OrderItemSchema,
      OrderSchema,
      CoordinateSchema,
      AddressSchema,
      GetAllOrdersResponse,
      GetOrderByIdResponse,
      CreateOrderResponse,
    },
  },
};
