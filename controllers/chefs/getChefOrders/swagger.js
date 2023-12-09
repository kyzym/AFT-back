import { roles } from '#constants/roles.js';
import {
  createErrorResponse,
  createSuccessResponse,
  idSchema,
  serverError,
} from '../swaggerChefsComponents.js';

export const getChefOrdersSwagger = {
  '/chefs/{chefId}/orders': {
    get: {
      tags: ['Chefs'],
      summary: 'Get chef`s orders',
      description: 'Gets orders for a chef with the specified ID',
      parameters: [
        {
          name: 'chefId',
          in: 'path',
          required: true,
          description: 'ID of the chef to get',
          schema: idSchema,
        },
      ],
      security: [{ bearerAuth: [roles.ADMIN, roles.CHEF] }],
      responses: {
        200: createSuccessResponse('Orders retrieved successfully'),
        400: createErrorResponse('Format of this ID is not correct'),
        404: createErrorResponse('Orders not found'),
        500: serverError,
      },
    },
  },
};
