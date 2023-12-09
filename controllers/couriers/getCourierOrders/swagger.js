import {
  createErrorResponse,
  createSuccessResponse,
  idSchema,
  serverError,
} from '../swaggerCouriersComponents.js';

export const getCourierOrdersSwagger = {
  '/couriers/{courierId}/orders': {
    get: {
      tags: ['Couriers'],
      summary: 'Get courier`s orders',
      description: 'Gets orders for a courier with the specified ID',
      parameters: [
        {
          name: 'courierId',
          in: 'path',
          required: true,
          description: 'ID of the courier to get',
          schema: idSchema,
        },
      ],
      responses: {
        200: createSuccessResponse('Orders retrieved successfully'),
        400: createErrorResponse('Format of this ID is not correct'),
        404: createErrorResponse('Orders not found'),
        500: serverError,
      },
    },
  },
};
