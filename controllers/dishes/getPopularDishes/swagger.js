import {
  createErrorResponse,
  createSuccessResponseArray,
} from '../swaggerDishesComponents.js';

export const getPopularDishesSwagger = {
  '/dishes/popular': {
    get: {
      tags: ['Dishes'],
      summary: 'Get popular dishes',
      description:
        'Retrieves a list of popular dishes. Currently, it returns a random selection of dishes.',
      responses: {
        200: createSuccessResponseArray(
          'A list of popular dishes retrieved successfully'
        ),
        500: createErrorResponse('Internal Server Error'),
      },
    },
  },
};
