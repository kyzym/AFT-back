import { usersSwagger } from './users/index.js';
import { ordersSwagger } from './orders/swagger.js';

const { SERVER_URL } = process.env;

export const swaggerControllers = {
  openapi: '3.1.0',
  info: {
    title: 'API for IDLO backend',
    version: '1.0.0',
    description: 'Documentation for IDLO controllers',
  },
  servers: [
    {
      url: SERVER_URL,
      description: 'Development server',
    },
  ],
  paths: {
    ...usersSwagger.paths,
    ...ordersSwagger.paths,
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
      Coordinate: {
        type: ['object', 'null'],
        properties: {
          lat: { type: 'number', minimum: -90, maximum: 90 },
          lng: { type: 'number', minimum: -180, maximum: 180 },
        },
      },
      Address: {
        type: 'object',
        properties: {
          city: { type: 'string' },
          country: { type: 'string' },
          street: { type: 'string' },
          coordinates: {
            $ref: '#/components/schemas/Coordinate',
            default: null,
          },
        },
      },
      OrderItem: {
        type: 'object',
        properties: {
          dishId: {
            type: 'string',
            format: 'objectId',
          },
          count: {
            type: 'integer',
            minimum: 1,
            default: 1,
          },
          price: {
            type: 'number',
            minimum: 0.01,
          },
        },
        minItems: 1,
      },
      ...usersSwagger.components.schemas,
      ...ordersSwagger.components.schemas,
    },
  },
};
