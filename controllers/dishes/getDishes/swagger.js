import {
  createSuccessResponseArray,
  idSchema,
  serverError,
} from '../swaggerDishesComponents.js';

export const getDishesSwagger = {
  '/api/dishes': {
    get: {
      tags: ['Dishes'],
      summary: 'Get dishes',
      description:
        'Get a list of dishes. Optionally, filter the dishes by a chef ID.',
      parameters: [
        {
          name: 'chef',
          in: 'query',
          required: false,
          description: 'The unique identifier of the chef to filter dishes',
          schema: idSchema,
        },
      ],
      responses: {
        200: createSuccessResponseArray(
          'A list of dishes retrieved successfully'
        ),
        500: serverError,
      },
    },
  },
};
