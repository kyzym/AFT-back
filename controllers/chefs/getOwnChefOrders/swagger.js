import { roles } from '#constants/roles.js';
import {
  createErrorResponse,
  createSuccessResponse,
  serverError,
} from '../swaggerChefsComponents.js';

export const getOwnChefOrdersSwagger = {
  '/orders': {
    get: {
      tags: ['Orders'],
      summary: 'Get own chef orders',
      description: 'Gets orders for the currently authenticated chef',
      parameters: [],
      security: [{ bearerAuth: [roles.CHEF] }],
      responses: {
        200: createSuccessResponse('Orders retrieved successfully'),
        401: createErrorResponse('Unauthorized access'),
        404: createErrorResponse('Orders not found'),
        500: serverError,
      },
    },
  },
};
