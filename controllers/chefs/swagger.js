import { ChefSchema } from './swaggerChefsComponents.js';

import { getChefsSwagger } from './getChefs/swagger.js';
import { getChefSwagger } from './getChef/swagger.js';
import { updateChefSwagger } from './updateChef/swagger.js';
import { deleteChefSwagger } from './deleteChef/swagger.js';
import { getChefOrdersSwagger } from './getChefOrders/swagger.js';
import { getChefOrdersByStatusSwagger } from './getChefOrdersByStatus/swagger.js';

const combinedChefsPaths = {
  '/api/chefs': {
    ...getChefsSwagger['/api/chefs'],
  },
  '/api/chefs/{chefId}': {
    ...getChefSwagger['/api/chefs/{chefId}'],
    ...updateChefSwagger['/api/chefs/{chefId}'],
    ...deleteChefSwagger['/api/chefs/{chefId}'],
  },
  '/api/chefs/{chefId}/orders': {
    ...getChefOrdersSwagger['/api/chefs/{chefId}/orders'],
  },
  '/api/chefs/{chefId}/orders/{status}': {
    ...getChefOrdersByStatusSwagger['/api/chefs/{chefId}/orders/{status}'],
  },
  '/api/chefs/{chefId}/orders/{orderId}': {
    ...getChefOrdersByStatusSwagger['/api/chefs/{chefId}/orders/{status}'],
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
