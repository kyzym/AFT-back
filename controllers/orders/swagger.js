import { AddressSchema } from '#controllers/swagger.common.js';
import { createOrderSwagger } from './create/swagger.js';
import { getAllOrdersSwagger } from './get-all/swagger.js';
import { getOrderPaymentStatusSwagger } from './payment/get-payment-status/swagger.js';
// import { getOrdersByChefIdSwagger } from './get-by-chef-id/swagger.js';
// import { getOrdersByCourierIdSwagger } from './get-by-courier-id/swagger.js';
// import { getOrderByIdSwagger } from './get-by-id/swagger.js';
// import { getOrdersByUserIdSwagger } from './get-by-user-id/swagger.js';
// import changeOrderStatus from './change-status/swagger.js';
import {
  CreateOrderResponse,
  GetAllOrdersResponse,
  GetOrderByIdResponse,
  GetOrderPaymentStatusResponse,
  OrderItemSchema,
  OrderSchema,
  PaymentDataSchema,
  ShortDishSchema,
} from './swagger.common.js';

export const ordersSwagger = {
  paths: {
    '/orders': {
      ...getAllOrdersSwagger.paths['/orders'],
      ...createOrderSwagger.paths['/orders'],
    },
    ...getOrderPaymentStatusSwagger.paths,
    /*...getOrdersByChefIdSwagger.paths,
    ...getOrdersByCourierIdSwagger.paths,
    ...getOrdersByUserIdSwagger.paths,
    ...getOrderByIdSwagger.paths,
    ...changeOrderStatus.paths,*/
  },
  components: {
    schemas: {
      AddressSchema,
      ShortDishSchema,
      OrderItemSchema,
      OrderSchema,
      GetAllOrdersResponse,
      GetOrderByIdResponse,
      CreateOrderResponse,
      PaymentDataSchema,
      GetOrderPaymentStatusResponse,
    },
  },
};
