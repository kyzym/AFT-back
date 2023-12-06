import { roles } from '#constants/roles.js';
import {
  createSuccessResponseArray,
  serverError,
} from '../swaggerChefsComponents.js';

export const getChefsSwagger = {
  '/chefs': {
    get: {
      tags: ['Chefs'],
      summary: 'Get chefs',
      description:
        'Get a list of chefs with optional filters of available state.',
      parameters: [
        {
          name: 'isAvailable',
          in: 'query',
          required: false,
          description: 'Filter chefs by availability',
          schema: {
            type: 'boolean',
          },
        },
      ],
      security: [{ bearerAuth: [roles.ADMIN, roles.CHEF, roles.USER] }],
      responses: {
        200: createSuccessResponseArray(
          'A list of chefs retrieved successfully'
        ),
        500: serverError,
      },
    },
  },
};
