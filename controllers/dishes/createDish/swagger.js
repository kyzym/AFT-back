import {
  DishRequestSchema,
  createSuccessResponse,
  serverError,
} from '../swaggerDishesComponents.js';

export const createDishSwagger = {
  '/dishes': {
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
        201: createSuccessResponse('Dish created successfully'),
        500: serverError,
      },
    },
  },
};
