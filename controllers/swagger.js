import { usersSwagger } from './users/index.js';
import { ordersSwagger } from './orders/swagger.js';

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
  },
  components: {
    schemas: {
      ...usersSwagger.components.schemas,
      ...ordersSwagger.components.schemas,
    },
  },
};
