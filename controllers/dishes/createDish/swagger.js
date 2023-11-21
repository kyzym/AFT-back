import { DishRequestSchema, serverError } from '../swaggerDishesComponents.js';

export const createDishSwagger = {
  '/api/dishes': {
    post: {
      tags: ['Dishes'],
      summary: 'Create a new dish',
      description: 'Create a new dish for the IDLO platform.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: DishRequestSchema,
          },
        },
      },
      responses: {
        201: {
          description: 'Dish created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Dish created successfully',
                  },
                },
              },
            },
          },
        },
        500: serverError,
      },
    },
  },
};
