import { usersSwagger } from './users/index.js';
import { ordersSwagger } from './orders/swagger.js';
import { dishesSwagger } from './dishes/index.js';

const { SWAGGER_URL } = process.env;

export const swaggerControllers = {
  openapi: '3.1.0',
  info: {
    title: 'API for IDLO backend',
    version: '1.0.0',
    description: 'Documentation for IDLO controllers',
  },
  servers: [
    {
      url: `${SWAGGER_URL}`,
      description: 'Development server',
    },
  ],
  paths: {
    ...usersSwagger.paths,
    ...ordersSwagger.paths,
    ...dishesSwagger.paths,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        name: 'Authorization',
        description:
          'Use the "Bearer" keyword followed by a space and then your JWT token.',
        bearerFormat: 'JWT',
      },
    },

    schemas: {
      ...usersSwagger.components.schemas,
      ...ordersSwagger.components.schemas,
      ...dishesSwagger.components.schemas,
    },
  },
};
