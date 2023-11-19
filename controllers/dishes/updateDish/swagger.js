import {
  DishResponseSchema,
  createErrorResponse,
  createSuccessResponse,
  idSchema,
  serverError,
} from '../swaggerDishesComponents.js';

export const updateDishSwagger = {
  '/api/dishes/{dishId}': {
    patch: {
      tags: ['Dishes'],
      summary: 'Update a dish',
      description: 'Updates the details of an existing dish by its ID.',
      parameters: [
        {
          name: 'dishId',
          in: 'path',
          required: true,
          description: 'The unique identifier of the dish to be updated',
          schema: idSchema,
        },
      ],
      requestBody: {
        description: 'Updated details of the dish',
        required: true,
        content: {
          'application/json': {
            schema: DishResponseSchema,
          },
        },
      },
      responses: {
        200: createSuccessResponse('Dish updated successfully'),
        400: createErrorResponse('Format of this ID is not correct'),
        404: createErrorResponse('Dish not found'),
        500: serverError,
      },
    },
  },
};
