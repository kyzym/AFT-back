import {
  createErrorResponse,
  createSuccessResponseArray,
  serverError,
} from '../swaggerDishesComponents.js';

export const getOwnDishesSwagger = {
  '/api/dishes/own': {
    get: {
      tags: ['Dishes'],
      summary: 'Get own dishes',
      description:
        'Retrieves a list of dishes created by the currently authenticated chef.',
      responses: {
        200: createSuccessResponseArray(
          'A list of own dishes retrieved successfully'
        ),
        401: createErrorResponse('Unauthorized'),
        500: serverError,
      },
    },
  },
};
