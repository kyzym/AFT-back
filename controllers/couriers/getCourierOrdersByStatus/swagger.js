import { orderStatus } from '../../../constants/orderStatus.js';
import {
  createErrorResponse,
  createSuccessResponse,
  serverError,
} from '../swaggerCouriersComponents.js';

export const getCourierOrdersByStatusSwagger = {
  '/couriers/orders/{status}': {
    get: {
      tags: ['Couriers'],
      summary: "Get courier's orders by status",
      description: 'Gets orders for a courier with the specified ID and status',
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
      responses: {
        200: createSuccessResponse('Orders by status retrieved successfully'),
        400: createErrorResponse('Format of this ID is not correct'),
        404: createErrorResponse('Orders not found'),
        500: serverError,
      },
    },
  },
};
