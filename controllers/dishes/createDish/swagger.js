import {
  DishRequestSchema,
  DishResponseSchema,
  ErrorResponseSchema,
} from '../swaggerDishesComponents.js';

export const createDishSwagger = {
  '/dishes': {
    post: {
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
              schema: DishResponseSchema,
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
