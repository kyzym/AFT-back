import { ErrorResponseSchema } from '../swaggerDishesComponents.js';

export const deleteDishSwagger = {
  '/dishes/{dishId}': {
    delete: {
      summary: 'Delete a dish',
      description: 'Deletes a dish with the specified ID.',
      parameters: [
        {
          name: 'dishId',
          in: 'path',
          required: true,
          description: 'ID of the dish to delete',
          schema: {
            type: 'string',
            format: 'objectId',
          },
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
        400: {
          description: 'ID error',
          content: {
            'application/json': {
              schema: ErrorResponseSchema(
                'Format of this ID:  is not correct"'
              ),
            },
          },
        },
        404: {
          description: 'Dish not found',
          content: {
            'application/json': {
              schema: ErrorResponseSchema('Dish not found'),
            },
          },
        },
        500: {
          description: 'Internal Server Error',
          content: {
            'application/json': {
              schema: ErrorResponseSchema('Internal Server Error'),
            },
          },
        },
      },
    },
  },
};
