import { orderStatus } from '../../../constants/orderStatus.js';
import {
  createErrorResponse,
  createSuccessResponse,
  idSchema,
  serverError,
} from '../swaggerChefsComponents.js';

export const getChefOrdersByStatusSwagger = {
  '/chefs/{chefId}/orders/{status}': {
    get: {
      tags: ['Chefs'],
      summary: "Get chef's orders by status",
      description: 'Gets orders for a chef with the specified ID and status',
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
      responses: {
        200: createSuccessResponse('Orders by status retrieved successfully'),
        400: createErrorResponse('Format of this ID is not correct'),
        404: createErrorResponse('Orders not found'),
        500: serverError,
      },
    },
  },
};
