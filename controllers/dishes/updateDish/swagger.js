import {
  BaseDishSchema,
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
      description:
        'Updates the details of an existing dish by its ID. Chefs can update most fields of the dish. Admins can update the blocked status of the dish.',
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
        description:
          'Data for updating the dish. Depending on the user role, different fields can be updated.',
        required: true,
        content: {
          'application/json': {
            schema: BaseDishSchema,
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
