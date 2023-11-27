import { usersSwagger } from './users/swagger.js';
import { ordersSwagger } from './orders/swagger.js';
import { dishesSwagger } from './dishes/swagger.js';
import { chefsSwagger } from './chefs/swagger.js';
import { reviewsSwagger } from './reviews/swagger.js';

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
    ...dishesSwagger.paths,
    ...chefsSwagger.paths,
    ...reviewsSwagger.paths,
  },
  components: {
    schemas: {
      ...usersSwagger.components.schemas,
      ...ordersSwagger.components.schemas,
      ...dishesSwagger.components.schemas,
      ...chefsSwagger.components.schemas,
      ...reviewsSwagger.components.schemas,
    },
  },
};
