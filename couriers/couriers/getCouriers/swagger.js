import { roles } from '#constants/roles.js';
import {
  createSuccessResponseArray,
  serverError,
} from '../swaggerCouriersComponents.js';

export const getCouriersSwagger = {
  '/couriers': {
    get: {
      tags: ['Couriers'],
      summary: 'Get couriers',
      description:
        'Get a list of couriers with optional filters of available state.',
      parameters: [
        {
          name: 'isAvailable',
          in: 'query',
          required: false,
          description: 'Filter couriers by availability',
          schema: {
            type: 'boolean',
          },
        },
      ],
      security: [{ bearerAuth: [roles.ADMIN] }],
      responses: {
        200: createSuccessResponseArray(
          'A list of chefs retrieved successfully'
        ),
        500: serverError,
      },
    },
  },
};
