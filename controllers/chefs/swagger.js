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
  '/chefs/orders': {
    ...getChefOrdersSwagger['/chefs/orders'],
    ...getOwnChefOrdersSwagger['/chefs/orders'],
  },
  '/chefs/orders/{status}': {
    ...getChefOrdersByStatusSwagger['/chefs/orders/{status}'],
    ...updateChefOrderStatusSwagger['/chefs/orders/{status}'],
  },

  '/chefs/orders/{orderId}': {
    ...updateChefOwnOrderStatusSwagger['/chefs/orders/{orderId}'],
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
