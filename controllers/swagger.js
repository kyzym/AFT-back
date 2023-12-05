import { usersSwagger } from './users/swagger.js';
import { ordersSwagger } from './orders/swagger.js';
import { dishesSwagger } from './dishes/swagger.js';
import { chefsSwagger } from './chefs/swagger.js';
import { couriersSwagger } from './couriers/swagger.js';
import { filesSwagger } from './files/swagger.js';
import { reviewsSwagger } from './reviews/swagger.js';
import { ingredientsSwagger } from './ingredients/swagger.js';

const { PORT, SERVER_URL } = process.env;

const serverUrl =
  process.env.MODE === 'development'
    ? {
        url: `http://localhost:${PORT}/api`,
        description: 'Development server',
      }
    : {
        url: `${SERVER_URL}/api`,
        description: 'Production server',
      };

export const swaggerControllers = {
  openapi: '3.1.0',
  info: {
    title: 'API for IDLO backend',
    version: '1.0.0',
    description: 'Documentation for IDLO controllers',
  },
  servers: [serverUrl],
  paths: {
    ...usersSwagger.paths,
    ...ordersSwagger.paths,
    ...dishesSwagger.paths,
    ...chefsSwagger.paths,
    ...reviewsSwagger.paths,
    ...ingredientsSwagger.paths,
    ...couriersSwagger.paths,
    ...filesSwagger.paths,
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
      ...chefsSwagger.components.schemas,
      ...reviewsSwagger.components.schemas,
      ...ingredientsSwagger.components.schemas,
      ...couriersSwagger.components.schemas,
    },
  },
};
