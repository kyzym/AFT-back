export { chefsSwagger } from './swagger.js';
export * from './swaggerChefsComponents.js';

import { getChefs } from './getChefs/index.js';
import { getChef } from './getChef/index.js';
import { updateChef } from './updateChef/index.js';
import { updateChefAvailableStatus } from './updateChefAvailableStatus/index.js';
import { deleteChef } from './deleteChef/index.js';
import { getChefOrders } from './getChefOrders/index.js';
import { getChefOrdersByStatus } from './getChefOrdersByStatus/index.js';
import { updateChefOrderStatus } from './updateChefOrderStatus/index.js';

export const chefControllers = {
  getChefs,
  getChef,
  updateChef,
  updateChefAvailableStatus,
  deleteChef,
  getChefOrders,
  getChefOrdersByStatus,
  updateChefOrderStatus,
};
