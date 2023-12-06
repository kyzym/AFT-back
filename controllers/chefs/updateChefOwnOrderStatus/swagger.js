import { orderStatus } from '#constants/orderStatus.js';
import { roles } from '#constants/roles.js';
import {
  createErrorResponse,
  createSuccessResponse,
  idSchema,
  serverError,
} from '../swaggerChefsComponents.js';

export const updateChefOwnOrderStatusSwagger = {
  '/chefs/orders/{orderId}': {
    patch: {
      tags: ['Chefs'],
      summary: 'Update own order status',
      description: 'Allows a chef to update the status of their orders',
      parameters: [
        {
          name: 'orderId',
          in: 'path',
          required: true,
          description: 'ID of the order to update',
          schema: idSchema,
        },
      ],
      requestBody: {
        description: 'New status of the order',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                  enum: Object.values(orderStatus),
                  description: 'New status to set for the order',
                },
              },
            },
          },
        },
      },
      security: [{ bearerAuth: [roles.CHEF] }],
      responses: {
        200: createSuccessResponse('Order status updated successfully'),
        400: createErrorResponse('Invalid request format or data'),
        401: createErrorResponse('Unauthorized access'),
        403: createErrorResponse('Forbidden access'),
        404: createErrorResponse('Order not found'),
        500: serverError,
      },
    },
  },
};
