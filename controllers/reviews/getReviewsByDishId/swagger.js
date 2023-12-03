import { roles } from '#constants/roles.js';
import { pagePaginationParameters } from '#controllers/swagger.common.js';

export const getReviewsByDishId = {
  tags: [{ name: 'Reviews', description: 'The reviews managing API' }],
  paths: {
    '/reviews/by-dish/{dishId}': {
      get: {
        summary: 'Get reviews by dish ID',
        tags: ['Reviews'],
        security: [{ bearerAuth: [roles.USER] }],
        parameters: [
          {
            in: 'path',
            name: 'dishId',
            required: true,
            schema: { type: 'string' },
            description: 'Dish ID to get reviews for',
          },
          ...pagePaginationParameters,
        ],
        responses: {
          200: {
            description: 'A list of reviews for the specified dish',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ReviewByChefIdOrDishId',
                },
              },
            },
          },

          401: {
            description: 'Unauthorized - Missing or invalid token',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
  },
};
