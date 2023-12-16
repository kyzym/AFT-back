import { CourierSchema } from './swaggerCouriersComponents.js';

import { getCouriersSwagger } from './getCouriers/swagger.js';
import { getCourierSwagger } from './getCourier/swagger.js';
import { deleteCourierSwagger } from './deleteCourier/swagger.js';
import { createCourierSwagger } from './createCourier/swagger.js';
import { getCourierOrdersSwagger } from './getCourierOrders/swagger.js';
import { getCourierOrdersByStatusSwagger } from './getCourierOrdersByStatus/swagger.js';
import { updateCourierSwagger } from './updateCourier/swagger.js';
import { updateCourierOrderSwagger } from './updateCourierOrderStatus/swagger.js';
import { getCourierByAccountStatusSwagger } from './getCourierByAccountStatus/swagger.js';
import { getOrdersByStatusSwagger } from './getOrdersByStatus/swagger.js';
import { getCouriersStatisticSwagger } from './getCourierStatistic/swagger.js';

const combinedCourierPaths = {
  '/couriers': {
    ...getCouriersSwagger['/couriers'],
    ...createCourierSwagger['/couriers'],
  },
  '/couriers/{courierId}': {
    ...getCourierSwagger['/couriers/{courierId}'],
    ...updateCourierSwagger['/couriers/{courierId}'],
    ...deleteCourierSwagger['/couriers/{courierId}'],
  },
  '/couriers/orders': {
    ...getCourierOrdersSwagger['/couriers/orders'],
  },
  '/couriers/orders/{status}': {
    ...getCourierOrdersByStatusSwagger['/couriers/orders/{status}'],
  },
  '/couriers/orders/{orderId}': {
    ...updateCourierOrderSwagger['/couriers/orders/{status}'],
  },
  '/couriers/accountStatus/{accountStatus}': {
    ...getCourierByAccountStatusSwagger[
      '/couriers/accountStatus/{accountStatus}'
    ],
  },
  '/couriers/allorders/{status}': {
    ...getOrdersByStatusSwagger['/couriers/allorders/{status}'],
  },
  '/couriers/{courierId}/statistic': {
    ...getCouriersStatisticSwagger['/couriers/{courierId}/statistic'],
  },
};

export const couriersSwagger = {
  paths: {
    ...combinedCourierPaths,
  },
  components: {
    schemas: {
      Courier: CourierSchema,
    },
  },
};
