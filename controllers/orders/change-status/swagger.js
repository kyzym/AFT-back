import { approveOrderSwagger } from './approve-order/swagger.js';
import { cancelOrderByChefSwagger } from './cancel-by-chef/swagger.js';
import { cancelOrderByCourierSwagger } from './cancel-by-courier/swagger.js';
import { completeOrderSwagger } from './complete/swagger.js';
import { deliveringOrderSwagger } from './delivering/swagger.js';
import { readyToDeliveryOrderSwagger } from './ready-to-deliver/swagger.js';
import { startCookingOrderSwagger } from './start-cooking/swagger.js';

cancelOrderByCourierSwagger;
export default {
  paths: {
    ...approveOrderSwagger.paths,
    ...startCookingOrderSwagger.paths,
    ...readyToDeliveryOrderSwagger.paths,
    ...deliveringOrderSwagger.paths,
    ...completeOrderSwagger.paths,
    ...cancelOrderByChefSwagger.paths,
    ...cancelOrderByCourierSwagger.paths,
  },
};
