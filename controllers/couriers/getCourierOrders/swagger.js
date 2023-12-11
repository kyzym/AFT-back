import {
  createErrorResponse,
  createSuccessResponse,
  serverError,
} from '../swaggerCouriersComponents.js';

export const getCourierOrdersSwagger = {
  '/couriers/orders': {
    get: {
      tags: ['Couriers'],
      summary: 'Get courier`s orders',
      description: 'Gets orders for a courier with the specified ID',
      responses: {
        200: createSuccessResponse('Orders retrieved successfully'),
        400: createErrorResponse('Format of this ID is not correct'),
        404: createErrorResponse('Orders not found'),
        500: serverError,
      },
    },
  },
};
