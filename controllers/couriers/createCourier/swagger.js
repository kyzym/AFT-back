import { roles } from '#constants/roles.js';
import {
  CourierRequestSchema,
  serverError,
} from '../swaggerCouriersComponents.js';

export const createCourierSwagger = {
  '/couriers': {
    post: {
      tags: ['Couriers'],
      summary: 'Create a new courier',
      description: 'Create a new courier',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: CourierRequestSchema,
          },
        },
      },
      security: [{ bearerAuth: [roles.COURIER] }],
      responses: {
        201: {
          description: 'Courier created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Courier created successfully',
                  },
                },
              },
            },
          },
        },
        500: serverError,
      },
    },
  },
};
