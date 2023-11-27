import {
  createErrorResponse,
  createSuccessResponse,
  serverError,
} from '../swaggerDishesComponents.js';

export const getRandomDishSwagger = {
  '/dishes/random': {
    get: {
      tags: ['Dishes'],
      summary: 'Get a random dish',
      description: 'Retrieves a single random dish from the database.',
      responses: {
        200: createSuccessResponse('A random dish retrieved successfully'),
        404: createErrorResponse('No dishes found'),
        500: serverError,
      },
    },
  },
};
