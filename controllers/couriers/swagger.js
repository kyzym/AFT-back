import { CourierSchema } from './swaggerCouriersComponents.js';

import { getChefsSwagger } from './getCouriers/swagger.js';
import { getCourierSwagger } from './getCourier/swagger.js';
import { deleteCourierSwagger } from './deleteCourier/swagger.js';
import { createCourierSwagger } from './createCourier/swagger.js';
import { getCourierOrdersSwagger } from './getCourierOrders/swagger.js';
import { getCourierOrdersByStatusSwagger } from './getCourierOrdersByStatus/swagger.js';
import { updateCourierSwagger } from './updateCourier/swagger.js';
import { updateCourierOrderSwagger } from './updateCourierOrderStatus/swagger.js';
import { getCourierByAccountStatusSwagger } from './getCourierByAccountStatus/swagger.js';

const combinedCourierPaths = {
  '/couriers': {
    ...getChefsSwagger['/api/chefs'],
    ...createCourierSwagger['/couriers'],
  },
  '/couriers/{courierId}': {
    ...getCourierSwagger['/couriers/{courierId}'],
    ...updateCourierSwagger['/couriers/{courierId}'],
    ...deleteCourierSwagger['/couriers/{courierId}'],
  },
  '/couriers/{courierId}/orders': {
    ...getCourierOrdersSwagger['/couriers/{courierId}/orders'],
  },
  '/couriers/{courierId}/orders/{status}': {
    ...getCourierOrdersByStatusSwagger['/couriers/{courierId}/orders/{status}'],
  },
  '/couriers/{courierId}}/orders/{orderId}': {
    ...updateCourierOrderSwagger['/courier/{courierId}/orders/{status}'],
  },
  '/couriers/accountStatus/{accountStatus}': {
    ...getCourierByAccountStatusSwagger[
      '/couriers/accountStatus/{accountStatus}'
    ],
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
