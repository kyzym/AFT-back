import {
  createErrorResponse,
  idSchema,
  serverError,
} from '../swaggerDishesComponents.js';

export const deleteDishSwagger = {
  '/api/dishes/{dishId}': {
    delete: {
      tags: ['Dishes'],
      summary: 'Delete a dish',
      description: 'Deletes a dish with the specified ID.',
      parameters: [
        {
          name: 'dishId',
          in: 'path',
          required: true,
          description: 'ID of the dish to delete',
          schema: idSchema,
        },
      ],
      responses: {
        200: {
          description: 'Dish deleted successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Dish deleted successfully',
                  },
                },
              },
            },
          },
        },
        400: createErrorResponse('Format of this ID is not correct'),
        404: createErrorResponse('Dish not found'),
        500: serverError,
      },
    },
  },
};
