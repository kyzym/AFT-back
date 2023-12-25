import { roles } from '#constants/roles.js';
import { orderStatus } from '#constants/orderStatus.js';
import {
  createErrorResponse,
  createSuccessResponse,
  idSchema,
  serverError,
} from '../swaggerChefsComponents.js';

export const updateChefOrderStatusSwagger = {
  '/chefs/{chefId}/orders/{status}': {
    patch: {
      tags: ['Chefs'],
      summary: 'Update order status',
      description: 'Update order status for order with specified ID',
      parameters: [
        {
          name: 'chefId',
          in: 'path',
          required: true,
          description: 'ID of the chef to get',
          schema: idSchema,
        },
        {
          name: 'status',
          in: 'path',
          required: true,
          description: 'Status of order',
          schema: {
            type: 'string',
            enum: Object.values(orderStatus),
          },
        },
      ],
      security: [{ bearerAuth: [roles.CHEF] }],
      responses: {
        200: createSuccessResponse('Orders by status retrieved successfully'),
        400: createErrorResponse('Format of this ID is not correct'),
        404: createErrorResponse('Orders not found'),
        500: serverError,
      },
    },
  },
};
