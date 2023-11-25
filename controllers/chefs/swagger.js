import { ChefSchema } from './swaggerChefsComponents.js';

import { getChefsSwagger } from './getChefs/swagger.js';
import { getChefSwagger } from './getChef/swagger.js';
import { updateChefSwagger } from './updateChef/swagger.js';
import { deleteChefSwagger } from './deleteChef/swagger.js';
import { createChefSwagger } from './createChef/swagger.js';

const combinedChefsPaths = {
  '/api/chefs': {
    ...getChefsSwagger['/api/chefs'],
    ...createChefSwagger['/api/chefs'],
  },
  '/api/chefs/{chefId}': {
    ...getChefSwagger['/api/chefs/{chefId}'],
    ...updateChefSwagger['/api/chefs/{chefId}'],
    ...deleteChefSwagger['/api/chefs/{chefId}'],
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
