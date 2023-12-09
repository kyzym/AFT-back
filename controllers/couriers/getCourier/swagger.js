import {
  createErrorResponse,
  createSuccessResponse,
  idSchema,
  serverError,
} from '../swaggerCouriersComponents.js';

export const getCourierSwagger = {
  '/couriers/{courierId}': {
    get: {
      tags: ['Couriers'],
      summary: 'Get a courier',
      description: 'Get a courier with the specified ID.',
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
        200: createSuccessResponse('Courier retrieved successfully'),
        400: createErrorResponse('Format of this ID is not correct'),
        404: createErrorResponse('Courier not found'),
        500: serverError,
      },
    },
  },
};
