export { couriersSwagger } from './swagger.js';
export * from './swaggerCouriersComponents.js';

import { getCouriers } from './getCouriers/index.js';
import { getCourier } from './getCourier/index.js';
import { updateCourier } from './updateCourier/index.js';
import { updateCourierAvailableStatus } from './updateCourierAvailableStatus/index.js';
import { deleteCourier } from './deleteCourier/index.js';
import { createCourier } from './createCourier/index.js';
import { getCourierOrders } from './getCourierOrders/index.js';
import { getCourierOrdersByStatus } from './getCourierOrdersByStatus/index.js';
import { updateCourierOrderStatus } from './updateCourierOrderStatus/index.js';
import { getCourierByAccountStatus } from './getCourierByAccountStatus/index.js';
import { getOrdersByStatus } from './getOrdersByStatus/index.js';

export const courierControllers = {
  getCouriers,
  getCourier,
  updateCourier,
  updateCourierAvailableStatus,
  deleteCourier,
  createCourier,
  getCourierOrders,
  updateCourierOrderStatus,
  getCourierOrdersByStatus,
  getCourierByAccountStatus,
  getOrdersByStatus,
};
