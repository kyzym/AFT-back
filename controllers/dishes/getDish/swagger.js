import {
  createErrorResponse,
  createSuccessResponse,
  idSchema,
  serverError,
} from '../swaggerDishesComponents.js';

export const getDishSwagger = {
  '/api/dishes/{dishId}': {
    get: {
      tags: ['Dishes'],
      summary: 'Get a dish',
      description: 'Gets a dish with the specified ID.',
      parameters: [
        {
          name: 'dishId',
          in: 'path',
          required: true,
          description: 'ID of the dish to get',
          schema: idSchema,
        },
      ],
      responses: {
        200: createSuccessResponse('Dish retrieved successfully'),
        400: createErrorResponse('Format of this ID is not correct'),
        404: createErrorResponse('Dish not found'),
        500: serverError,
      },
    },
  },
};
