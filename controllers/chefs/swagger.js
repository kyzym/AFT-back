import { ChefSchema } from './swaggerChefsComponents.js';

import { getChefsSwagger } from './getChefs/swagger.js';
import { getChefSwagger } from './getChef/swagger.js';
import { updateChefSwagger } from './updateChef/swagger.js';
import { deleteChefSwagger } from './deleteChef/swagger.js';
import { createChefSwagger } from './createChef/swagger.js';
import { getChefOrdersSwagger } from './getChefOrders/swagger.js';
import { getChefOrdersByStatusSwagger } from './getChefOrdersByStatus/swagger.js';
import { updateChefOrderStatusSwagger } from './updateChefOrderStatus/swagger.js';
import { getOwnChefOrdersSwagger } from './getOwnChefOrders/swagger.js';
import { updateChefOwnOrderStatusSwagger } from './updateChefOwnOrderStatus/swagger.js';
import { getChefsStatisticSwagger } from './getChefStatistic/swagger.js';

const combinedChefsPaths = {
  '/chefs': {
    ...getChefsSwagger['/chefs'],
    ...createChefSwagger['/chefs'],
  },
  '/chefs/{chefId}': {
    ...getChefSwagger['/chefs/{chefId}'],
    ...updateChefSwagger['/chefs/{chefId}'],
    ...deleteChefSwagger['/chefs/{chefId}'],
  },
  '/chefs/{chefId}/orders': {
    ...getChefOrdersSwagger['/chefs/{chefId}/orders'],
  },
  '/chefs/{chefId}/orders/{status}': {
    ...getChefOrdersByStatusSwagger['/chefs/{chefId}/orders/{status}'],
  },
  '/chefs/{chefId}/orders/{orderId}': {
    ...updateChefOrderStatusSwagger['/chefs/{chefId}/orders/{status}'],
  },
  '/chefs/orders': {
    ...getOwnChefOrdersSwagger['/chefs/orders'],
  },
  '/chefs/orders/{orderId}': {
    ...updateChefOwnOrderStatusSwagger['/chefs/orders/{orderId}'],
  },
  '/chefs/{chefId}/statistic': {
    ...getChefsStatisticSwagger['/chefs/{chefId}/statistic'],
  },
};

export const chefsSwagger = {
  paths: {
    ...combinedChefsPaths,
  },
  components: {
    schemas: {
      Chef: ChefSchema,
    },
  },
};
