import { usersSwagger } from './users/index.js';
import { ordersSwagger } from './orders/index.js';
import {
  dishesSwagger,
  DishSchema,
  ErrorResponseSchema,
} from './dishes/index.js';

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
  },
  components: {
    schemas: {
      ...usersSwagger.components.schemas,
      ...ordersSwagger.components.schemas,
      ErrorResponse: ErrorResponseSchema,
      Dish: DishSchema,
    },
  },
};
