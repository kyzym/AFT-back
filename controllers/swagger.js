import { usersSwagger } from './users/index.js';
import { ordersSwagger } from './orders/index.js';

export const swaggerControllers = {
  openapi: '3.0.0',
  info: {
    title: 'API for IDLO backend',
    version: '1.0.0',
    description: 'Documentation for IDLO controllers',
  },
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
