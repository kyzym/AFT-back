import { roles } from '#constants/roles.js';
import { orderStatus } from '../../../constants/orderStatus.js';
import {
  createErrorResponse,
  createSuccessResponse,
  serverError,
} from '../swaggerCouriersComponents.js';

export const getOrdersByStatusSwagger = {
  '/couriers/allorders/{status}': {
    get: {
      tags: ['Couriers'],
      summary: 'Get all orders available for courier by status',
      description:
        'Gets orders for a couriers with the specified ID and status',
      parameters: [
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
      security: [{ bearerAuth: [roles.ADMIN, roles.COURIER] }],
      responses: {
        200: createSuccessResponse('Orders by status retrieved successfully'),
        404: createErrorResponse('Orders not found'),
        500: serverError,
      },
    },
  },
};
