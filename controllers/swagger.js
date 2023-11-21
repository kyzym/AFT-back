import { usersSwagger } from './users/index.js';
import { ordersSwagger } from './orders/index.js';
import { ingredientsSwagger } from './ingredients/swagger.js';
import { dishesSwagger } from './dishes/index.js';

export const swaggerControllers = {
  openapi: '3.1.0',
  info: {
    title: 'API for IDLO backend',
    version: '1.0.0',
    description: 'Documentation for IDLO controllers',
  },
  servers: [
    {
      url: 'http://localhost:PORT',
      description: 'Development server',
    },
  ],
  paths: {
    ...usersSwagger.paths,
    ...ordersSwagger.paths,
    ...ingredientsSwagger.paths,
    ...dishesSwagger.paths,
  },
  components: {
    schemas: {
      ...usersSwagger.components.schemas,
      ...ordersSwagger.components.schemas,
      ...ingredientsSwagger.components.schemas,
      ...dishesSwagger.components.schemas,
    },
  },
};
