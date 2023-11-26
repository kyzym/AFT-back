import {
  createErrorResponse,
  idSchema,
  serverError,
} from '../swaggerDishesComponents.js';

export const deleteDishSwagger = {
  '/dishes/{dishId}': {
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
          description: 'Dish processed for deletion',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Dish processed for deletion',
                  },
                },
              },
            },
          },
        },
        400: createErrorResponse('Format of this ID is not correct'),
        500: serverError,
      },
    },
  },
};
